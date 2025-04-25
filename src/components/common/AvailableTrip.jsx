"use client";

import { BakongKHQR, khqrData, IndividualInfo, MerchantInfo, SourceInfo } from "bakong-khqr";
import dayjs from 'dayjs';

import {
    Bus,
    Armchair,
    CreditCard,
    Clock,
    Coffee,
    MapPin,
    Wifi,
    Monitor,
    Wind,
    TableIcon,
    RockingChair,
    MapPinCheckInside,
    Tag,
    Building2,
    User,
    BusFront,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookProgress } from "./BookProgress";
import { decrypt, encrypt, fetchFromApi } from "../../utils/api";
import { ACLEDA_BANK_API, API_KEY, API_URL, CLIENT_URL, loginId, merchantID, password, signature } from "@/constant/constant";
import axios from "axios";
import LoadingComponent from "../layout/Loading";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { cn } from "@/lib/utils";
import { addHoursToTime, calculateArrival, getCityName } from "@/utils/time-util";
import { SeatLayout } from "../features/seat/SeatLayout";
import TripListComponent from "../features/trip/ListTrip";
import Frees from "../features/seat/Frees";
import AllSeatStatus from "../features/seat/AllSeatStatus";
import TripListReturnComponent from "../features/trip/ListTripReturn";
import AvailableTripSectionTitle from "../ui/AvalableTripSection";
import RouteInfor from "../ui/RouteInfor";


export const AvailableTripItems = ({
    trips,
    cities = [],
    departureDate,
    returnDate,
    tripType,
    isLoadingFetching,
    currentTime,
    roundTrips,
    origin,
    destination
}) => {

    const [activeStep, setActiveStep] = useState('select');
    const [routeSelected, setRouteSelected] = useState();
    const [routeReturnSelected, setRouteReturnSelected] = useState();

    const [selectedSeat, setSelectedSeat] = useState([]);
    const [selectedSeatReturn, setSelectedSeatReturn] = useState([]);

    const [paymentMethod, setPaymentMethod] = useState("khqr");

    const [fullname, setFullname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [pickupOrigin, setPickupOrigin] = useState("");
    const [qorCode, setQorCode] = useState("");
    const [loading, setLoading] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sessionId, setSessionId] = useState();
    const [paymentTokenid, setPaymentTokenid] = useState();
    const [transactionID, setTransactionID] = useState();
    const [payDate, setPayDate] = useState();
    const [isFormValid, setIsFormValid] = useState(false);
    const [showSecondTrip, setShowSecondTrip] = useState(false);

    const [item, setItem] = useState();
    const [successsUrl, setSuccesssUrl] = useState();


    // state add booking
    const [oneTripBooking, setOneTripBooking] = useState();
    const [roundTripBooking, setRoundTripBooking] = useState();


    const [errors, setErrors] = useState({
        fullname: "",
        phoneNumber: "",
        email: "",
        pickupOrigin: ""
    });

    const handleTripSelect = (trip) => {
        setRouteSelected(trip);
        if (tripType == 'round-trip') {
            setShowSecondTrip(true);
            setTimeout(() => {
                const element = document.getElementById('return_trip_list');
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 50);
        } else {
            setActiveStep("seat")

            setTimeout(() => {
                const element = document.getElementById('select_seat');
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 50);
        }
    };

    const handleSelectNextReturnTip = (trip) => {
        setRouteReturnSelected(trip);
        setActiveStep("seat")
    };

    const handleSeatSelect = (seatSelected) => {
        console.log('seat selected: ', seatSelected);

        setRouteSelected((prevRouteSelected) => {
            const updatedSeats = prevRouteSelected?.seat_status?.seats?.map((seat) => {

                if (seat.seat === seatSelected?.seat) {
                    return {
                        ...seat,
                        status: seat?.status === 'Available' ? 'selected' : 'Available'
                    };
                }
                return seat;
            });



            return {
                ...prevRouteSelected,
                seat_status: {
                    row: prevRouteSelected?.seat_status?.row,
                    col: prevRouteSelected?.seat_status?.col,
                    seats: updatedSeats
                }
            };
        });

        setSelectedSeat((prevSelectedSeats) => {
            // Check if the seat_id already exists in the selectedSeats array
            const seatExists = prevSelectedSeats.some(existingSeat => existingSeat.seat === seatSelected.seat);

            if (seatExists) {
                // If it exists, remove the seat by filtering out the matching seat_id
                return prevSelectedSeats.filter(existingSeat => existingSeat.seat !== seatSelected.seat);
            }

            // If it doesn't exist, add the new seat object to the array
            return [...prevSelectedSeats, seatSelected];
        });

    };

    const handleSeatReturnSelect = (seatSelected) => {
        console.log(routeReturnSelected);

        setRouteReturnSelected((prevRouteSelected) => {
            const updatedSeats = prevRouteSelected?.seat_status?.seats?.map((seat) => {

                if (seat.seat === seatSelected?.seat) {
                    return {
                        ...seat,
                        status: seat?.status === 'Available' ? 'selected' : 'Available'
                    };
                }
                return seat;
            });



            return {
                ...prevRouteSelected,
                seat_status: {
                    row: prevRouteSelected?.seat_status?.row,
                    col: prevRouteSelected?.seat_status?.col,
                    seats: updatedSeats
                }
            };
        });

        setSelectedSeatReturn((prevSelectedSeats) => {
            // Check if the seat_id already exists in the selectedSeats array
            const seatExists = prevSelectedSeats.some(existingSeat => existingSeat.seat === seatSelected.seat);

            if (seatExists) {
                // If it exists, remove the seat by filtering out the matching seat_id
                return prevSelectedSeats.filter(existingSeat => existingSeat.seat !== seatSelected.seat);
            }

            // If it doesn't exist, add the new seat object to the array
            return [...prevSelectedSeats, seatSelected];
        });

    };

    const handleSeatConfirm = async () => {

        /**
         * call API to check seat status
         */

        if (selectedSeat.length < 1) {
            toast.warning('Please select at least one seat!');
            return;
        }

        if (tripType == 'round-trip') {
            if (selectedSeatReturn.length < 1) {
                toast.warning('Please  select at least one return seat!');
                return;
            }
        }

        /**
         * we have to seperate it 
         */

        if (tripType == 'round-trip') {

            // 1. Process the one-trip first
            const statusOneTrip = await getBusStatusByTrip({
                bus_id: routeSelected?.busTypeDetail.id,
                route_id: routeSelected?.id,
                travel_date: dayjs(departureDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
                travel_time: routeSelected?.timing?.time,
                routeSelect: routeSelected,
                selectedSeatData: selectedSeat,
                tripType: 'one-trip'
            })


            const statusRoundTrip = await getBusStatusByTrip({
                bus_id: routeReturnSelected?.busTypeDetail.id,
                route_id: routeReturnSelected?.id,
                travel_date: dayjs(returnDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
                travel_time: routeReturnSelected?.timing?.time,
                routeSelect: routeReturnSelected,
                selectedSeatData: selectedSeatReturn,
                tripType: 'round-trip'
            });


            if (!statusOneTrip || !statusRoundTrip) {
                return;
            }

            const travelDateDeparture = dayjs(departureDate, "DD-MM-YYYY").format('DD-MM-YYYY');
            const seatNoDeparture = selectedSeat?.map(item => item.seat).join(',')

            const bookedOnWay = await addBooking({
                travel_date: travelDateDeparture,
                travel_time: routeSelected?.timing?.time,
                bus_type: routeSelected?.busTypeDetail?.bus_type,
                route_id: routeSelected?.id,
                bus_id: routeSelected?.busTypeDetail?.id,
                seat_no: seatNoDeparture,
                price: selectedSeat.length * routeSelected?.price,
            });

            setOneTripBooking(bookedOnWay);

            // 2. Process the round-trip

            const travelDate = dayjs(returnDate, "DD-MM-YYYY").format('DD-MM-YYYY');
            const seat_no = selectedSeatReturn?.map(item => item.seat).join(',')



            const booked = await addBooking({
                travel_date: travelDate,
                travel_time: routeReturnSelected?.timing?.time,
                bus_type: routeReturnSelected?.busTypeDetail?.bus_type,
                route_id: routeReturnSelected?.id,
                bus_id: routeReturnSelected?.busTypeDetail?.id,
                seat_no: seat_no,
                price: selectedSeatReturn.length * routeReturnSelected?.price,
            });

            setRoundTripBooking(booked);

            if (booked?.status && bookedOnWay.status) {
                setActiveStep('pay');
            } else {
                toast.warning('Other User select user seat please try again');
            }

        } else {
            const statusOneTrip = await getBusStatusByTrip({
                bus_id: routeSelected?.busTypeDetail.id,
                route_id: routeSelected?.id,
                travel_date: dayjs(departureDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
                travel_time: routeSelected?.timing?.time,
                routeSelect: routeSelected,
                selectedSeatData: selectedSeat,
                tripType: 'one-trip'
            });


            if (!statusOneTrip) return;

            const travelDateDeparture = dayjs(departureDate, "DD-MM-YYYY").format('DD-MM-YYYY');
            const seatNoDeparture = selectedSeat?.map(item => item.seat).join(',')

            const bookedOnWay = await addBooking({
                travel_date: travelDateDeparture,
                travel_time: routeSelected?.timing?.time,
                bus_type: routeSelected?.busTypeDetail?.bus_type,
                route_id: routeSelected?.id,
                bus_id: routeSelected?.busTypeDetail?.id,
                seat_no: seatNoDeparture,
                price: selectedSeat.length * routeSelected?.price,
            });

            setOneTripBooking(bookedOnWay);

            if (bookedOnWay.status) {
                setActiveStep('pay');
            } else {
                toast.warning('Other User select user seat please try again');
            }
        }


    };


    /**
     * if the seat bus already reserved or bookek, it will return from here the function is stop
     */
    const getBusStatusByTrip = async ({
        route_id,
        bus_id,
        travel_date,
        travel_time,
        routeSelect,
        tripType,
        selectedSeatData = []
    }) => {

        const bus_status = await fetchFromApi('get_bus_status', {
            route_id: route_id,
            bus_id: bus_id,
            travel_date: travel_date,
            travel_time: travel_time,
        });

        const seatStatusData = bus_status?.data && bus_status.data !== 'NULL'
            ? Array.isArray(bus_status.data)
                ? bus_status.data
                : []
            : [];


        const invalidSeats = selectedSeatData.map(selected => {
            const seatInfo = seatStatusData.find(item => item.seat_id === selected.seat);
            return seatInfo?.seat_status === "Reserved" || seatInfo?.seat_status === "Booked"
                ? seatInfo
                : null;
        })
            .filter(Boolean);

        if (invalidSeats.length > 0) {

            if (tripType == 'one-trip') {
                const updatedSeatStatus = routeSelect.seat_status?.seats.map(seat => {
                    const invalidMatch = invalidSeats.find(invalid =>
                        String(invalid.seat_id).trim() === String(seat.seat).trim()
                    );

                    return invalidMatch
                        ? { ...seat, status: invalidMatch?.seat_status }
                        : seat;
                });

                setRouteSelected(prevRouteSelected => ({
                    ...prevRouteSelected,
                    seat_status: {
                        col: prevRouteSelected?.seat_status?.col,
                        row: prevRouteSelected?.seat_status.row,
                        seats: updatedSeatStatus
                    }
                }));


                setSelectedSeat(prevSelectedSeats => {
                    if (!Array.isArray(prevSelectedSeats)) return [];

                    if (!Array.isArray(invalidSeats)) return prevSelectedSeats;

                    const reservedSeatIds = new Set(
                        invalidSeats.map(reserved => reserved.seat_id)
                    );

                    return prevSelectedSeats.filter(
                        selected => !reservedSeatIds.has(selected.seat)
                    );
                });


                const unavailableSeats = invalidSeats.map(item => item.seat_id).join(', ');
                toast.error(`These seats are unavailable: ${unavailableSeats}. Please remove them.`);
                return false;
            } else {
                const updatedSeatStatus = routeSelect.seat_status?.seats.map(seat => {
                    const invalidMatch = invalidSeats.find(invalid =>
                        String(invalid.seat_id).trim() === String(seat.seat).trim()
                    );

                    return invalidMatch
                        ? { ...seat, status: invalidMatch?.seat_status }
                        : seat;
                });

                setRouteReturnSelected(prevRouteSelected => ({
                    ...prevRouteSelected,
                    seat_status: {
                        col: prevRouteSelected?.seat_status?.col,
                        row: prevRouteSelected?.seat_status?.row,
                        seats: updatedSeatStatus
                    }
                }));

                setSelectedSeatReturn(prevSelectedSeats => {
                    if (!Array.isArray(prevSelectedSeats)) return [];

                    if (!Array.isArray(invalidSeats)) return prevSelectedSeats;

                    const reservedSeatIds = new Set(
                        invalidSeats.map(reserved => reserved.seat_id)
                    );

                    return prevSelectedSeats.filter(
                        selected => !reservedSeatIds.has(selected.seat)
                    );
                });

                const unavailableSeats = invalidSeats.map(item => item.seat_id).join(', ');
                toast.error(`These seats are unavailable: ${unavailableSeats}. Please remove them.`);
                return false;
            }
        }

        return true;
    }


    const addBooking = async ({
        travel_date,
        travel_time,
        route_id,
        price,
        bus_id,
        bus_type,
        seat_no
    }) => {

        const books = {
            route_id: route_id,
            email: "nareachkr@gmail.com",
            password: 123456,
            mobile: '092655182',
            travel_date: travel_date,
            travel_time: travel_time,
            price: price,
            bus_id: bus_id,
            bus_type: bus_type,
            seat_no: seat_no,
            pass_email: "nareachkr@gmail.com",
            firstname: 'guest_name1',
            surname: 'guest_name1',
            remarks: 'guest_remarks'
        };
        const book = await fetchFromApi('add_booking', books);
        return book;
    }


    // When set this data to form success it will trigger to call useEffect submit the form
    useEffect(() => {
        const submitTheForm = async () => {
            if (transactionID && payDate && successsUrl && sessionId) {

                document.getElementById('_xpayTestForm').submit();
            }
        };
        submitTheForm();
    }, [transactionID, payDate, successsUrl, sessionId])


    const handlePay = async () => {
        try {
            setLoading(true);

            const isValid = validateForm();
            if (!isValid) {
                toast.error('Please fill in traveller details. Please check in message detail');
                return;
            }

            /**
             * If the form input correctly we update the passenger information
             */

            const updatePassenger = await updatePassengerInformation({
                firstname: fullname,
                surname: fullname,
                mobile: phoneNumber,
                pass_email: email,
                Passenge_id: oneTripBooking?.Passenge_id
            });

            if (tripType == 'round-trip') {
                const roundTripInfor = await updatePassengerInformation({
                    firstname: fullname,
                    surname: fullname,
                    mobile: phoneNumber,
                    pass_email: email,
                    Passenge_id: roundTripBooking?.Passenge_id
                });
            }


            let url;
            let amount = 0;

            if (tripType == 'round-trip') {
                url = `${CLIENT_URL}/success/${oneTripBooking?.Booking_id}/${roundTripBooking?.Booking_id}`
                amount = (selectedSeat?.length * (Number(routeSelected?.price))) + (selectedSeatReturn.length * (Number(routeReturnSelected?.price)));
            } else {
                url = `${CLIENT_URL}/success/${oneTripBooking?.Booking_id}`
                amount = (selectedSeat?.length * (Number(routeSelected?.price)));
            }


            const uuid = uuidv4();
            const payDate1 = moment(new Date()).format('DD-MM-YYYY');
            setIsLoading(true);
            setTransactionID(uuid);
            setPayDate(payDate1);
            setSuccesssUrl(url);

            let data = JSON.stringify({
                "loginId": loginId,
                "password": password,
                "merchantID": merchantID,
                "signature": signature,
                "xpayTransaction": {
                    "txid": uuid,
                    "purchaseAmount": amount,
                    "purchaseCurrency": "USD",
                    "purchaseDate": payDate1,
                    "purchaseDesc": 'booking',
                    "invoiceid": uuid,
                    "item": 'booking',
                    "quantity": "1",
                    "expiryTime": "5",
                    "paymentCard": paymentMethod == 'khqr' ? '0' : '1',
                }
            });

            const response = await axios.post(
                ACLEDA_BANK_API,
                data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setIsLoading(true);
            setError(null);
            setTransactionID(uuid);
            setPayDate(payDate1);
            setSuccesssUrl(url);
            setPaymentTokenid(response.data?.result?.xTran?.paymentTokenid)
            setSessionId(response.data?.result?.sessionid);

            /**
             * After set thhis data to form success it will trigger to call useEffect submit the form
             */
        } catch (error) {
            setLoading(false);
        } finally {
            setIsLoading(false);
        }

    }


    const updatePassengerInformation = async ({
        firstname, surname, mobile, pass_email, Passenge_id
    }) => {
        const passengerDetail = {
            firstname: firstname,
            surname: surname,
            mobile: mobile,
            pass_email: pass_email,
            Passenge_id: Passenge_id,
        };

        const updatePassengerDetail = await fetchFromApi('update_passenger_details', passengerDetail);
        return updatePassengerDetail;
    }


    const validateForm = () => {
        let valid = true;
        const newErrors = { fullname: '', phoneNumber: '', email: '' };

        // Validate fullname
        if (!fullname || fullname.trim().length < 2) {
            newErrors.fullname = 'Please enter a valid name';
            valid = false;
        }

        // Validate phone
        const phoneRegex = /^(\+?855|0)[1-9][0-9]{7,8}$/;
        if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid Cambodian phone number';
            valid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) {
            setTimeout(() => {
                const element = document.getElementById('travellerDetail');
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 50);
        }

        return valid;
    };


    if (activeStep === "select") {
        return (
            <div>
                <BookProgress activeStep={activeStep} />
                {
                    !showSecondTrip ? <>
                        <AvailableTripSectionTitle
                            cities={cities}
                            date={departureDate}
                            destination={destination}
                            origin={origin}
                            id="departure_trip_list"
                            title={'Departure Trips Available'}
                            totalTrip={trips?.length}
                        />
                        <div className="space-y-4">
                            {
                                isLoadingFetching ? (<>Loading ...</>) : (<div className="flex flex-col gap-6">
                                    {trips?.map((trip, index) => trip.timing?.time && (
                                        (
                                            <TripListComponent
                                                departure_date={departureDate}
                                                key={index}
                                                handleTripSelect={handleTripSelect}
                                                trip={trip}
                                                index={index}
                                            />
                                        )
                                    ))}
                                </div>)
                            }
                        </div>
                    </> : <></>
                }
                {
                    showSecondTrip ? <>
                        <AvailableTripSectionTitle
                            cities={cities}
                            date={returnDate}
                            destination={origin}
                            origin={destination}
                            title={'Return Trips Available'}
                            totalTrip={roundTrips?.length}
                        />
                        <div className="space-y-4">
                            {
                                isLoadingFetching ? (<>Loading ...</>) : (<div className="flex flex-col gap-6">
                                    {roundTrips?.map((trip, index) => trip.timing?.time && (
                                        (
                                            <TripListComponent
                                                departure_date={returnDate}
                                                key={index}
                                                handleTripSelect={handleSelectNextReturnTip}
                                                trip={trip}
                                                index={index}
                                            />
                                        )
                                    ))}
                                </div>)
                            }
                        </div>
                    </> : <></>
                }
            </div>
        );
    } else if (activeStep === "seat") {
        return (
            <div>
                <BookProgress activeStep={activeStep} />
                <div className="grid md:grid-cols-3 gap-8" id="select_seat">
                    <div className="flex flex-col ">
                        <div className="p-6 shadow-custom rounded-lg md:col-span-1">
                            <SeatLayout
                                busType={routeSelected?.bus_type}
                                allSeatStatus={routeSelected?.seat_status}
                                onSelectSeat={(seat) => handleSeatSelect(seat)}
                            />
                            <AllSeatStatus />
                        </div>

                        {
                            tripType === 'round-trip' ? (<div className="p-6 shadow-custom rounded-lg md:col-span-1 mt-5">
                                <SeatLayout
                                    busType={routeReturnSelected?.bus_type}
                                    allSeatStatus={routeReturnSelected?.seat_status}
                                    onSelectSeat={(seat) => handleSeatReturnSelect(seat)}
                                />
                                <AllSeatStatus />
                            </div>) : (<></>)
                        }
                    </div>

                    {/* go trip */}
                    <div className="mt-8 md:mt-0 space-y-6 md:col-span-2">
                        <div className="p-6 shadow-custom rounded-lg">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold">Departure Trip Details</h2>
                                    <div className="flex justify-between items-start mt-2">
                                        <span className="font-bold">{routeSelected?.bus_type}</span>
                                        <span className="text-pink-600 font-bold">
                                            Seat Number: [ {selectedSeat?.map((item, index) => (<span key={index}>{item?.seat} , </span>)) || "-"} ]
                                        </span>
                                    </div>
                                    <Frees />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <RouteInfor
                                            city={routeSelected?.origin_details?.city_name}
                                            departure_date={dayjs(departureDate, "DD-MM-YYYY").format('MMMM-DD')}
                                            isStart={true}
                                            time={routeSelected?.timing?.time}
                                        />
                                        <Bus className="w-5 h-5 mt-8 text-secondary ml-6 mr-6 " />
                                        <div className="flex-1 px-4 relative">
                                            <div className="text-center mt-6 text-sm text-gray-500">
                                                {routeSelected?.duration}
                                            </div>
                                            <div className="absolute inset-x-0 top-11 border-t border-gray-300"></div>
                                            <div className="text-center text-sm text-gray-500">
                                                {routeSelected?.kilo_meters} KM
                                            </div>
                                        </div>
                                        <MapPinCheckInside className="w-5 mt-8 h-5 text-secondary ml-6 mr-6" />
                                        <RouteInfor
                                            city={routeSelected?.destination_details?.city_name}
                                            departure_date={calculateArrival({
                                                departureTime: dayjs(departureDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
                                                durationHours: routeSelected?.duration,
                                                metaTime: routeSelected.timing?.time
                                            })}
                                            isStart={false}
                                            time={routeSelected.timing?.time ? addHoursToTime(routeSelected.timing?.time, routeSelected?.duration) : '' || 'no'}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* return trip */}
                        {
                            tripType == 'round-trip' ?
                                <div className="mt-8 md:mt-0 space-y-6 md:col-span-2">
                                    <div className="p-6 shadow-custom rounded-lg">
                                        <div className="space-y-6">
                                            <div>
                                                <h2 className="text-xl font-semibold">Return Trip Details</h2>

                                                <div className="flex justify-between items-start">
                                                    <span className="font-bold">{routeReturnSelected?.bus_type}</span>
                                                    <span className="text-pink-600 font-bold">
                                                        Seat Number: [ {selectedSeatReturn?.map((item, index) => (<span key={index}>{item?.seat} , </span>)) || "-"} ]
                                                    </span>
                                                </div>
                                                <Frees />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <RouteInfor
                                                        city={routeReturnSelected?.origin_details?.city_name}
                                                        departure_date={dayjs(returnDate, "DD-MM-YYYY").format('MMMM-DD')}
                                                        isStart={true}
                                                        time={routeReturnSelected?.timing?.time}
                                                    />

                                                    <Bus className="w-5 h-5 mt-8 text-secondary ml-6 mr-6 " />
                                                    <div className="flex-1 px-4 relative">
                                                        <div className="text-center mt-6 text-sm text-gray-500">
                                                            {routeReturnSelected?.duration}
                                                        </div>
                                                        <div className="absolute inset-x-0 top-11 border-t border-gray-300"></div>
                                                        <div className="text-center text-sm text-gray-500">
                                                            {routeReturnSelected?.kilo_meters} KM
                                                        </div>
                                                    </div>
                                                    <MapPinCheckInside className="w-5 mt-8 h-5 text-secondary ml-6 mr-6" />

                                                    <RouteInfor
                                                        city={routeReturnSelected?.destination_details?.city_name}
                                                        departure_date={calculateArrival({
                                                            departureTime: dayjs(departureDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
                                                            durationHours: routeReturnSelected?.duration,
                                                            metaTime: routeReturnSelected.timing?.time
                                                        })}
                                                        isStart={false}
                                                        time={routeReturnSelected.timing?.time ? addHoursToTime(routeReturnSelected.timing?.time, routeReturnSelected?.duration) : '' || 'no'}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> : <></>
                        }

                        {
                            tripType == 'round-trip' ? <div className="bg-white rounded-md p-6 shadow-custom2">
                                <h2 className="text-xl font-semibold mb-4">Bill details</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Departure Base Ticket Fare</span>
                                        <span>${routeSelected?.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Return Base Ticket Fare</span>
                                        <span>${routeReturnSelected?.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Travellers</span>
                                        <span>{selectedSeat?.length + selectedSeatReturn.length}</span>
                                    </div>
                                    <div className="flex justify-between font-medium pt-3 border-t">
                                        <span>Total Charge</span>
                                        <span>${
                                            (selectedSeat?.length * (Number(routeSelected?.price))) + (selectedSeatReturn.length * (Number(routeReturnSelected?.price)))
                                        }
                                        </span>
                                    </div>
                                </div>
                            </div> : <div className="bg-white rounded-md p-6 shadow-custom2">
                                <h2 className="text-xl font-semibold mb-4">Bill details</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600"> Base Ticket Fare </span>
                                        <span>${routeSelected?.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Travellers</span>
                                        <span>{selectedSeat?.length}</span>
                                    </div>
                                    <div className="flex justify-between font-medium pt-3 border-t">
                                        <span>Total Charge</span>
                                        <span>${selectedSeat?.length * (Number(routeSelected?.price))}</span>
                                    </div>
                                </div>
                            </div>
                        }

                        <Button
                            onClick={handleSeatConfirm}
                            className={cn(
                                'w-full bg-primary hover:bg-primary text-lg py-6',
                            )}
                        >
                            Confirm Seat
                        </Button>
                    </div>

                    <Button
                        variant="outline"
                        className="mb-6"
                        onClick={() => {
                            setActiveStep("select")
                            setSelectedSeat([]);
                            setShowSecondTrip(false);
                        }}
                    >
                        Back
                    </Button>
                </div>
            </div>
        );
    } else if (activeStep === "pay") {
        return (
            <div>
                <BookProgress activeStep={activeStep} />
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-6 md:col-span-1">
                        <div className="space-y-4 shadow-custom2 p-6 rounded-md">
                            <h2 className="text-xl font-semibold mb-4" id="travellerDetail">Traveller Details</h2>
                            <div>
                                <label className="block text-sm mb-1">
                                    Fullname <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    onChange={(e) => setFullname(e.target.value)}
                                    className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                                />
                                {errors.fullname && <p className="text-red-500 text-xs">{errors.fullname}</p>}
                            </div>
                            <div>
                                <label className="block text-sm mb-1">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="012 345 678"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
                            </div>
                            <div>
                                <label className="block text-sm mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="example@gmail.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                                />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                            </div>
                        </div>



                        <div className="border-2 border-dashed shadow-custom2 p-6 rounded-md border-pay">
                            <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
                            <div className="space-y-3">
                                <div
                                    className={`flex items-center justify-between p-4 rounded-lg border ${paymentMethod === "khqr"
                                        ? "border-primary"
                                        : "border-gray-200"
                                        } cursor-pointer`}
                                    onClick={() => setPaymentMethod("khqr")}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            checked={paymentMethod === "khqr"}
                                            onChange={() => setPaymentMethod("khqr")}
                                            className="w-4 h-4 text-primary"
                                        />
                                        <div>
                                            <div className="font-semibold">KHQR</div>
                                            <div className="text-sm text-Description">
                                                Scan to pay with any banking app.
                                            </div>
                                        </div>
                                    </div>

                                </div>



                                <div
                                    className={`flex items-center justify-between p-4 rounded-lg border ${paymentMethod === "card"
                                        ? "border-primary"
                                        : "border-gray-200"
                                        } cursor-pointer`}
                                    onClick={() => setPaymentMethod("card")}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            checked={paymentMethod === "card"}
                                            onChange={() => setPaymentMethod("card")}
                                            className="w-4 h-4 text-primary"
                                        />
                                        <div>
                                            <div className="font-semibold">Credit/Debit Card</div>
                                            <div className="flex gap-2 mt-1">
                                                <div className="w-10 h-6 bg-[#1A1F71] rounded" />
                                                <div className="w-10 h-6 bg-[#FF5F00] rounded" />
                                                <div className="w-10 h-6 bg-[#00A1DF] rounded" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full ">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setActiveStep("seat")
                                    setSelectedSeat([]);
                                    toast.info('please select the seat again.');
                                }}
                                className="w-full"
                            >
                                Back
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-6 md:col-span-2">
                        <div className="p-6 shadow-custom rounded-lg">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold">Departure Trip Details</h2>
                                    <div className="flex justify-between items-start mt-2">
                                        <span className="font-bold">{routeSelected?.bus_type}</span>
                                        <span className="text-pink-600 font-bold">
                                            Seat Number: [ {selectedSeat?.map((item, index) => (<span key={index}>{item?.seat} , </span>)) || "-"} ]
                                        </span>
                                    </div>
                                    <Frees />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <RouteInfor
                                            city={routeSelected?.origin_details?.city_name}
                                            departure_date={dayjs(departureDate, "DD-MM-YYYY").format('MMMM-DD')}
                                            isStart={true}
                                            time={routeSelected.timing?.time}
                                        />
                                        <Bus className="w-5 h-5 mt-8 text-secondary ml-6 mr-6 " />
                                        <div className="flex-1 px-4 relative">
                                            <div className="text-center mt-6 text-sm text-gray-500">
                                                {routeSelected?.duration}
                                            </div>
                                            <div className="absolute inset-x-0 top-11 border-t border-gray-300"></div>
                                            <div className="text-center text-sm text-gray-500">
                                                {routeSelected?.kilo_meters} KM
                                            </div>
                                        </div>
                                        <MapPinCheckInside className="w-5 mt-8 h-5 text-secondary ml-6 mr-6" />

                                        <RouteInfor
                                            city={routeSelected?.destination_details?.city_name}
                                            departure_date={calculateArrival({
                                                departureTime: dayjs(departureDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
                                                durationHours: routeSelected?.duration,
                                                metaTime: routeSelected.timing?.time
                                            })}
                                            isStart={false}
                                            time={routeSelected.timing?.time ? addHoursToTime(routeSelected.timing?.time, routeSelected?.duration) : '' || 'no'} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* return trip */}
                        {
                            tripType == 'round-trip' ?
                                <div className="mt-8 md:mt-0 space-y-6 md:col-span-2">
                                    <div className="p-6 shadow-custom rounded-lg">
                                        <div className="space-y-6">
                                            <div>
                                                <h2 className="text-xl font-semibold">Return Trip Details</h2>

                                                <div className="flex justify-between items-start">
                                                    <span className="font-bold">{routeReturnSelected?.bus_type}</span>

                                                    <span className="text-pink-600 font-bold">
                                                        Seat Number: [ {selectedSeatReturn?.map((item, index) => (<span key={index}>{item?.seat} , </span>)) || "-"} ]
                                                    </span>
                                                </div>
                                                <Frees />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <RouteInfor
                                                        city={routeReturnSelected?.origin_details?.city_name}
                                                        departure_date={dayjs(returnDate, "DD-MM-YYYY").format('MMMM-DD')}
                                                        isStart={true}
                                                        time={routeReturnSelected?.timing?.time}
                                                    />

                                                    <Bus className="w-5 h-5 mt-8 text-secondary ml-6 mr-6 " />
                                                    <div className="flex-1 px-4 relative">
                                                        <div className="text-center mt-6 text-sm text-gray-500">
                                                            {routeReturnSelected?.duration}
                                                        </div>
                                                        <div className="absolute inset-x-0 top-11 border-t border-gray-300"></div>
                                                        <div className="text-center text-sm text-gray-500">
                                                            {routeReturnSelected?.kilo_meters} KM
                                                        </div>
                                                    </div>
                                                    <MapPinCheckInside className="w-5 mt-8 h-5 text-secondary ml-6 mr-6" />

                                                    <RouteInfor
                                                        city={routeReturnSelected?.destination_details?.city_name}
                                                        departure_date={calculateArrival({
                                                            departureTime: dayjs(departureDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
                                                            durationHours: routeReturnSelected?.duration,
                                                            metaTime: routeReturnSelected.timing?.time
                                                        })}
                                                        isStart={false}
                                                        time={routeReturnSelected.timing?.time ? addHoursToTime(routeReturnSelected.timing?.time, routeReturnSelected?.duration) : '' || 'no'}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> : <></>
                        }

                        {
                            tripType == 'round-trip' ? <div className="bg-white rounded-md p-6 shadow-custom2">
                                <h2 className="text-xl font-semibold mb-4">Bill details</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Departure Base Ticket Fare</span>
                                        <span>${routeSelected?.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Return Base Ticket Fare</span>
                                        <span>${routeReturnSelected?.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Travellers</span>
                                        <span>{selectedSeat?.length + selectedSeatReturn.length}</span>
                                    </div>
                                    <div className="flex justify-between font-medium pt-3 border-t">
                                        <span>Total Charge</span>
                                        <span>${
                                            (selectedSeat?.length * (Number(routeSelected?.price))) + (selectedSeatReturn.length * (Number(routeReturnSelected?.price)))
                                        }
                                        </span>
                                    </div>
                                </div>
                            </div> : <div className="bg-white rounded-md p-6 shadow-custom2">
                                <h2 className="text-xl font-semibold mb-4">Bill details</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600"> Base Ticket Fare </span>
                                        <span>${routeSelected?.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Travellers</span>
                                        <span>{selectedSeat?.length}</span>
                                    </div>
                                    <div className="flex justify-between font-medium pt-3 border-t">
                                        <span>Total Charge</span>
                                        <span>${selectedSeat?.length * (Number(routeSelected?.price))}</span>
                                    </div>
                                </div>
                            </div>
                        }
                        <div>
                            <form id="_xpayTestForm" name="_xpayTestForm"
                                action="https://epaymentuat.acledabank.com.kh/GIANTIBIS/paymentPage.jsp"
                                method="post">

                                <input type="hidden" id="merchantID" name="merchantID" value={merchantID} />
                                <input type="hidden" id="paymenttokenid" name="paymenttokenid" value={paymentTokenid} />
                                <input type="hidden" id="sessionid" name="sessionid" value={sessionId} />
                                <input type="hidden" id="transactionID" name="transactionID" value={transactionID} />
                                <input type="hidden" id="expirytime" name="expirytime" value="5" />
                                {
                                    tripType == 'round-trip' ? <input
                                        type="hidden"
                                        id="amount"
                                        name="amount"
                                        value={(selectedSeat?.length * (Number(routeSelected?.price))) + (selectedSeatReturn.length * (Number(routeReturnSelected?.price)))}
                                    /> :
                                        <input
                                            type="hidden"
                                            id="amount"
                                            name="amount"
                                            value={selectedSeat?.length * (Number(routeSelected?.price))}
                                        />


                                }
                                <input type="hidden" id="quantity" name="quantity" value="1" />
                                <input type="hidden" id="currencytype" name="currencytype" value="USD" />
                                <input type="hidden" id="description" name="description" value='booking' />
                                <input type="hidden" id="item" name="item" value='booking' />
                                <input type="hidden" id="errorUrl" name="errorUrl"
                                    value="http://localhost:3000/error" />
                                <input type="hidden" id="paymentCard" name="paymentCard" value={paymentMethod == 'khqr' ? '0' : '1'} />
                                <input type="hidden" id="invoiceid" name="invoiceid" value={transactionID} />

                                <input type="hidden" id="successUrlToReturn" name="successUrlToReturn"
                                    value={successsUrl} />
                                <input type="hidden" id="errorUrl" name="errorUrl"
                                    value={`http://localhost:3000/error/`} />
                                <br />
                                <button
                                    type="button"
                                    onClick={handlePay}
                                    className={` w-full text-lg py-3 text-white bg-primary hover:bg-primary-dark`}                                >
                                    Submit Payment
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}