"use client";

import dayjs from 'dayjs';

import {
    Bus,
    MapPinCheckInside,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { BookProgress } from "./BookProgress";
import { fetchFromApi } from "../../utils/api";
import { CLIENT_URL, merchantID } from "@/constant/constant";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { cn } from "@/lib/utils";
import { SeatLayout } from "../features/seat/SeatLayout";
import TripListComponent from "../features/trip/ListTrip";
import AllSeatStatus from "../features/seat/AllSeatStatus";
import AvailableTripSectionTitle from "../ui/AvalableTripSection";
import RouteInfor from "../ui/RouteInfor";
import PassengerInfo from "../features/form-user-info/PassengerInfor";
import FacilityAvailable from './FacilityAvalable';
import { useGetPickUpByCityIdQuery } from '@/store/features/pick-up';
import NoBusComponent from './NoBusComponent';
import { useGenerateQRMutation } from '@/store/features/payment';
import PaymentFailedPopup from '../features/payments/PaymentFailedPopup';
import { Checkbox } from '@heroui/react';
import Link from 'next/link';


export const AvailableTripItems = ({
    trips,
    departureDate,
    returnDate,
    tripType,
    isLoadingFetching,
    roundTrips,
    origin,
    destination
}) => {

    const { data: pickupDeparture, isLoading: isLoadingPickUp, isError: isErrorPickUp } =
        useGetPickUpByCityIdQuery({ cityId: origin }, { skip: !origin });

    const { data: pickupReturn, isLoading: isLoadingPickUpReturn, isError: isErrorPickUpReturn } =
        useGetPickUpByCityIdQuery({ cityId: destination }, { skip: !destination });

    const [generatQR, { isError: isErrorPayment, isLoading: isLoadingGeneratePayment, error: errorPayment }] = useGenerateQRMutation();
    const [showPopup, setShowPopup] = useState(false);


    const [activeStep, setActiveStep] = useState('select');
    const [routeSelected, setRouteSelected] = useState();
    const [routeReturnSelected, setRouteReturnSelected] = useState();

    const [selectedSeat, setSelectedSeat] = useState([]);
    const [selectedSeatReturn, setSelectedSeatReturn] = useState([]);

    const [paymentMethod, setPaymentMethod] = useState("khqr");

    /**
     * Loading state
     */
    const [loading, setLoading] = useState("");
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmPayment, setIsConfirmPayment] = useState(true);


    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sessionId, setSessionId] = useState();
    const [paymentTokenid, setPaymentTokenid] = useState();
    const [transactionID, setTransactionID] = useState();
    const [payDate, setPayDate] = useState();
    const [showSecondTrip, setShowSecondTrip] = useState(false);
    const [amountTotal, setAmountTotal] = useState();

    const [successsUrl, setSuccesssUrl] = useState();

    const passengerInfoRef = useRef();

    const [oneTripBooking, setOneTripBooking] = useState();
    const [roundTripBooking, setRoundTripBooking] = useState();
    const [item, setItem] = useState();


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

            toast.info("Please select return route.")
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

        try {
            setConfirmLoading(true);

            if (selectedSeat.length < 1) {
                toast.warning('Please select at least one seat.');
                return;
            }

            if (tripType == 'round-trip') {
                if (selectedSeatReturn.length < 1) {
                    toast.warning('Please select at least one return seat!');
                    return;
                }

                if (selectedSeat.length != selectedSeatReturn.length) {
                    toast.warning('The number of departure seats must match the number of return seats.');
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
                    travel_time: routeSelected?.timing?.meta_value,
                    routeSelect: routeSelected,
                    selectedSeatData: selectedSeat,
                    tripType: 'one-trip'
                });


                const statusRoundTrip = await getBusStatusByTrip({
                    bus_id: routeReturnSelected?.busTypeDetail.id,
                    route_id: routeReturnSelected?.id,
                    travel_date: dayjs(returnDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
                    travel_time: routeReturnSelected?.timing?.meta_value,
                    routeSelect: routeReturnSelected,
                    selectedSeatData: selectedSeatReturn,
                    tripType: 'round-trip'
                });


                if (!statusOneTrip || !statusRoundTrip) {
                    return;
                }

                setActiveStep('pay');
            } else {

                const statusOneTrip = await getBusStatusByTrip({
                    bus_id: routeSelected?.busTypeDetail.meta_id,
                    route_id: routeSelected?.id,
                    travel_date: dayjs(departureDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
                    travel_time: routeSelected?.timing?.meta_value,
                    routeSelect: routeSelected,
                    selectedSeatData: selectedSeat,
                    tripType: 'one-trip'
                });


                if (!statusOneTrip) return;

                setActiveStep('pay');
            }

            setConfirmLoading(false);
        } catch (error) {

        } finally {
            setConfirmLoading(false);
        }
    };


    /**
     * if the seat bus already reserved or bookek, it will return from here the function is stop
     * 1. find bus status
     * 2. compare bus
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

        // 1. retrive bus status
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
        // END get bus status


        // find if seat already reserved or book by someone else.
        const invalidSeats = selectedSeatData.map(selected => {
            const seatInfo = seatStatusData.find(item => item.seat_id === selected.seat);
            return seatInfo?.seat_status === "Reserved" || seatInfo?.seat_status === "Booked"
                ? seatInfo
                : null;
        }).filter(Boolean);


        if (tripType != 'one-trip') {

            // START 1: departure is default to update
            const updatedSeatStatus = routeSelect.seat_status?.seats.map(seat => {
                const invalidMatch = seatStatusData.find(invalid =>
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

        } else {


            // START 1: departure
            const updatedSeatStatus = routeSelect.seat_status?.seats.map(seat => {
                const invalidMatch = seatStatusData.find(invalid =>
                    String(invalid.seat_id).trim() === String(seat.seat).trim()
                );

                return invalidMatch
                    ? { ...seat, status: invalidMatch?.seat_status }
                    : seat;
            });

            // update the seat layout status seat
            setRouteSelected(prevRouteSelected => ({
                ...prevRouteSelected,
                seat_status: {
                    col: prevRouteSelected?.seat_status?.col,
                    row: prevRouteSelected?.seat_status.row,
                    seats: updatedSeatStatus
                }
            }));

            // remove the seat is check reserved or booked
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
            // END 1: departure is default to update
        }

        if (invalidSeats.length > 0) {

            if (tripType == 'one-trip') {

                // retrive the invalid and alert message to the user
                const unavailableSeats = invalidSeats.map(item => item.seat_id).join(', ');
                toast.error(`These seats are unavailable: ${unavailableSeats}. Please remove them.`);
                setActiveStep("");
                return false;
            } else {

                // 
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
        seat_no,
        tripType
    }) => {

        const allPassengerData = passengerInfoRef.current.getPassengerData();
        const uEmail = allPassengerData?.map((item, index) => item?.email).join(",");
        const uFirstname = allPassengerData?.map((item, index) => item?.firstname).join(",");
        const uLastname = allPassengerData?.map((item, index) => item?.lastname).join(",");
        const uPhoneNumber = allPassengerData?.map((item, index) => item?.phoneNumber).join(",");
        let pickUp = '';
        if (tripType == 'one-trip') {
            let pickUpTemp = allPassengerData?.map((item, index) => item?.pickupLocation);
            pickUp = pickUpTemp?.length > 0 ? pickUpTemp[0] : ''
        } else {
            let pickUpTemp = allPassengerData?.map((item, index) => item?.returnPickupLocation);
            pickUp = pickUpTemp?.length > 0 ? pickUpTemp[0] : '';
        }


        const books = {
            route_id: route_id,
            email: "nareachkr@gmail.com",
            password: 123456,
            travel_date: travel_date,
            travel_time: travel_time,
            price: price,
            bus_id: bus_id,
            bus_type: bus_type,
            seat_no: seat_no,
            mobile: uPhoneNumber,
            pass_email: uEmail,
            firstname: uFirstname,
            surname: uLastname,
            pickup: pickUp,
            remarks: ''
        };

        console.log("booked infor: ", books);

        const book = await fetchFromApi('add_booking', books);
        return book;
    }


    // When set this data to form success it will trigger to call useEffect submit the form
    useEffect(() => {
        const submitTheForm = async () => {
            if (transactionID && payDate && successsUrl && sessionId && amountTotal) {

                document.getElementById('_xpayTestForm').submit();
            }
        };
        submitTheForm();
    }, [transactionID, payDate, successsUrl, sessionId, paymentMethod, amountTotal])


    const handlePay = async () => {
        try {
            setLoading(true);
            setIsLoading(true);

            if (!passengerInfoRef.current.validatePassengers()) {
                toast.error("Please fill in all user information");
                setLoading(false);
                return;
            }
            let url = ''
            let amount = 0;
            let ticketCount = 0;

            if (tripType == 'round-trip') {

                const statusOneTrip = await getBusStatusByTrip({
                    bus_id: routeSelected?.busTypeDetail.id,
                    route_id: routeSelected?.id,
                    travel_date: dayjs(departureDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
                    travel_time: routeSelected?.timing?.meta_value,
                    routeSelect: routeSelected,
                    selectedSeatData: selectedSeat,
                    tripType: 'one-trip'
                });


                const statusRoundTrip = await getBusStatusByTrip({
                    bus_id: routeReturnSelected?.busTypeDetail.id,
                    route_id: routeReturnSelected?.id,
                    travel_date: dayjs(returnDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
                    travel_time: routeReturnSelected?.timing?.meta_value,
                    routeSelect: routeReturnSelected,
                    selectedSeatData: selectedSeatReturn,
                    tripType: 'round-trip'
                });


                if (!statusOneTrip || !statusRoundTrip) {
                    setActiveStep("seat");
                    return;
                }

                const travelDateDeparture = dayjs(departureDate, "DD-MM-YYYY").format('DD-MM-YYYY');
                const seatNoDeparture = selectedSeat?.map(item => item.seat).join(',');

                const bookedOnWay = await addBooking({
                    travel_date: travelDateDeparture,
                    travel_time: routeSelected?.timing?.meta_value,
                    bus_type: routeSelected?.busTypeDetail?.meta_key,
                    route_id: routeSelected?.id,
                    bus_id: routeSelected?.busTypeDetail?.id,
                    seat_no: seatNoDeparture,
                    price: routeSelected?.price,
                    tripType: "one-trip",
                });
                setOneTripBooking(bookedOnWay);


                const travelDate = dayjs(returnDate, "DD-MM-YYYY").format('DD-MM-YYYY');
                const seat_no = selectedSeatReturn?.map(item => item.seat).join(',')
                const booked = await addBooking({
                    travel_date: travelDate,
                    travel_time: routeReturnSelected?.timing?.meta_value,
                    bus_type: routeReturnSelected?.busTypeDetail?.meta_key,
                    route_id: routeReturnSelected?.id,
                    bus_id: routeReturnSelected?.busTypeDetail?.meta_id,
                    seat_no: seat_no,
                    price: routeReturnSelected?.price,
                    tripType: "round-trip",
                });

                setRoundTripBooking(booked);

                if (!(booked?.status && bookedOnWay.status)) {
                    toast.warning('Other User select user seat please try again');
                    setActiveStep("seat");
                    return;
                }


                if (paymentMethod != 'khqr') {
                    ticketCount = selectedSeat?.length + selectedSeatReturn.length;
                }


                url = `${CLIENT_URL}/success/${bookedOnWay?.Booking_id}/${booked?.Booking_id}`
                amount = (selectedSeat?.length * (Number(routeSelected?.price))) + (selectedSeatReturn.length * (Number(routeReturnSelected?.price))) + ticketCount;

            } else {

                const statusOneTrip = await getBusStatusByTrip({
                    bus_id: routeSelected?.busTypeDetail.meta_id,
                    route_id: routeSelected?.id,
                    travel_date: dayjs(departureDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
                    travel_time: routeSelected?.timing?.meta_value,
                    routeSelect: routeSelected,
                    selectedSeatData: selectedSeat,
                    tripType: 'one-trip'
                });


                if (!statusOneTrip) {
                    setActiveStep("seat");
                    return;
                };

                const travelDateDeparture = dayjs(departureDate, "DD-MM-YYYY").format('DD-MM-YYYY');
                const seatNoDeparture = selectedSeat?.map(item => item.seat).join(',')

                const bookedOnWay = await addBooking({
                    travel_date: travelDateDeparture,
                    travel_time: routeSelected?.timing?.meta_value,
                    bus_type: routeSelected?.busTypeDetail?.bus_type,
                    route_id: routeSelected?.id,
                    bus_id: routeSelected?.busTypeDetail?.id,
                    seat_no: seatNoDeparture,
                    price: routeSelected?.price,
                    tripType: "one-trip",
                });

                setOneTripBooking(bookedOnWay);

                if (!bookedOnWay.status) {
                    setActiveStep("seat");
                    return;
                }


                if (paymentMethod != 'khqr') {
                    ticketCount = selectedSeat?.length;
                }

                url = `${CLIENT_URL}/success/${bookedOnWay?.Booking_id}`
                amount = (selectedSeat?.length * (Number(routeSelected?.price))) + ticketCount;
            }

            const uuid = uuidv4();
            const payDate1 = moment(new Date()).format('DD-MM-YYYY');

            const body = {
                "uuid": uuid,
                "amount": amount,
                "purchaseDate": payDate1,
                "paymentMethod": paymentMethod == 'khqr' ? '0' : '1',
            }


            const qr = await generatQR(body).unwrap();

            setError(null);
            setTransactionID(uuid);
            setPayDate(payDate1);
            setSuccesssUrl(url);
            setPaymentTokenid(qr.data?.result?.xTran?.paymentTokenid)
            setSessionId(qr.data?.result?.sessionid);
            setAmountTotal(amount);
            /**
             * After set thhis data to form success it will trigger to call useEffect submit the form
             */
        } catch (error) {
            console.log("error: ", error);

            if (error?.data?.type == "payment") {
                setShowPopup(true);
            }

            setLoading(false);
        } finally {
            setIsLoading(false);
        }
    }




    if (activeStep === "select") {
        return (
            <div>
                <BookProgress activeStep={activeStep} />
                {
                    !showSecondTrip && trips.length > 0 ? <>
                        <AvailableTripSectionTitle
                            date={trips[0]?.originDetail?.leaveAt}
                            destination={trips[0]?.destinationDetail?.city?.city_name}
                            origin={trips[0]?.originDetail?.city?.city_name}
                            title={'Departure Trips Available'}
                            totalTrip={trips?.length}
                        />
                        <div className="space-y-4">
                            {
                                isLoadingFetching ? (<>Loading ...</>) : (<div className="flex flex-col gap-6">
                                    {trips?.map((trip, index) =>
                                    (
                                        <TripListComponent
                                            departure_date={departureDate}
                                            key={index}
                                            handleTripSelect={handleTripSelect}
                                            trip={trip}
                                            index={index}
                                        />
                                    )
                                    )}
                                </div>)
                            }
                        </div>
                    </> : <></>
                }
                {
                    showSecondTrip ? <>
                        {
                            roundTrips?.length > 0 ? <>
                                <AvailableTripSectionTitle
                                    date={roundTrips[0]?.originDetail?.leaveAt}
                                    destination={roundTrips[0]?.destinationDetail?.city?.city_name}
                                    origin={roundTrips[0]?.originDetail?.city?.city_name}
                                    title={'Return Trips Available'}
                                    totalTrip={roundTrips?.length}
                                />
                                <div className="space-y-4">
                                    {
                                        isLoadingFetching ? (<>Loading ...</>) : (<div className="flex flex-col gap-6">
                                            {roundTrips?.map((trip, index) => (
                                                <TripListComponent
                                                    departure_date={returnDate}
                                                    key={index}
                                                    handleTripSelect={handleSelectNextReturnTip}
                                                    trip={trip}
                                                    index={index}
                                                />
                                            ))}
                                        </div>)
                                    }
                                </div>
                            </> : <>
                                <NoBusComponent />
                            </>
                        }
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
                                    <FacilityAvailable facilities={routeSelected?.facilities} />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <RouteInfor
                                            city={routeSelected?.originDetail?.city?.city_name}
                                            departure_date={routeSelected?.originDetail?.leaveAt}
                                            isStart={true}
                                            time={routeSelected?.timing?.meta_value}
                                            routeId={routeSelected?.id}
                                            address={routeSelected?.originDetail?.address?.url}
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
                                            city={routeSelected?.destinationDetail?.city?.city_name}
                                            routeId={routeSelected?.id}
                                            departure_date={routeSelected?.destinationDetail?.arriveAt}
                                            isStart={false}
                                            time={routeSelected?.destinationDetail?.time}
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
                                                <FacilityAvailable facilities={routeReturnSelected?.facilities} />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <RouteInfor
                                                        city={routeReturnSelected?.originDetail?.city?.city_name}
                                                        departure_date={routeReturnSelected?.originDetail?.leaveAt}
                                                        isStart={true}
                                                        time={routeReturnSelected?.timing?.meta_value}
                                                        routeId={routeSelected?.id}
                                                        address={routeSelected?.originDetail?.address?.url}
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
                                                        city={routeReturnSelected?.destinationDetail?.city?.city_name}
                                                        routeId={routeReturnSelected?.id}
                                                        departure_date={routeReturnSelected?.destinationDetail?.arriveAt}
                                                        isStart={false}
                                                        time={routeReturnSelected?.destinationDetail?.time}
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
                            disabled={confirmLoading}
                            className={cn(
                                'w-full bg-primary hover:bg-primary text-lg py-6',
                                confirmLoading ? 'cursor-progress' : ''
                            )}
                        >
                            {confirmLoading ? 'Checking Status ...' : 'Confirm Seat'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    } else if (activeStep === "pay") {
        return (
            <div>
                <BookProgress activeStep={activeStep} />

                {
                    showPopup ? <PaymentFailedPopup
                        isVisible={showPopup}
                        onClose={() => {
                            setShowPopup(false);
                        }}
                        onRetry={() => {
                            setShowPopup(false);
                        }}
                        errorMessage={errorPayment.data?.message}
                    /> :
                        <></>
                }

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-6 md:col-span-1">
                        <PassengerInfo
                            seatCount={selectedSeat.length}
                            ref={passengerInfoRef}
                            tripType={tripType}
                            allowedpickUpReturn={routeReturnSelected?.allowedpickUp}
                            allowedpickUpDeparture={routeSelected?.allowedpickUp}
                            pickupDeparture={pickupDeparture?.data}
                            pickupReturn={pickupReturn?.data}
                        />

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
                                    <FacilityAvailable facilities={routeSelected?.facilities} />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">

                                        <RouteInfor
                                            city={routeSelected?.originDetail?.city?.city_name}
                                            departure_date={routeSelected?.originDetail?.leaveAt}
                                            isStart={true}
                                            time={routeSelected?.timing?.meta_value}
                                            routeId={routeSelected?.id}
                                            address={routeSelected?.originDetail?.address?.url}
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
                                            city={routeSelected?.destinationDetail?.city?.city_name}
                                            departure_date={routeSelected?.destinationDetail?.arriveAt}
                                            isStart={true}
                                            time={routeSelected?.destinationDetail?.time}
                                            routeId={routeSelected?.id}
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
                                                <FacilityAvailable facilities={routeReturnSelected?.facilities} />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <RouteInfor
                                                        city={routeReturnSelected?.originDetail?.city?.city_name}
                                                        departure_date={routeReturnSelected?.originDetail?.leaveAt}
                                                        isStart={true}
                                                        time={routeReturnSelected?.timing?.meta_value}
                                                        routeId={routeReturnSelected?.id}
                                                        address={routeReturnSelected?.originDetail?.address?.url}
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
                                                        city={routeReturnSelected?.destinationDetail?.city?.city_name}
                                                        departure_date={routeReturnSelected?.destinationDetail?.arriveAt}
                                                        isStart={true}
                                                        time={routeReturnSelected?.destinationDetail?.time}
                                                        routeId={routeReturnSelected?.id}
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

                                    {
                                        paymentMethod != "khqr" ? <div className="flex justify-between">
                                            <span className="text-gray-600">Service Charge</span>
                                            <span>$ {selectedSeat?.length + selectedSeatReturn.length}</span>
                                        </div> : <></>
                                    }
                                    <div className="flex justify-between font-medium pt-3 border-t">
                                        <span>Total Charge</span>

                                        {
                                            paymentMethod != "khqr" ? <span>${(selectedSeat?.length * (Number(routeSelected?.price))) + (selectedSeatReturn.length * (Number(routeReturnSelected?.price)) + (selectedSeat.length + selectedSeatReturn.length))}
                                            </span> : <span>${(selectedSeat?.length * (Number(routeSelected?.price))) + (selectedSeatReturn.length * (Number(routeReturnSelected?.price)))}</span>
                                        }
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
                                    {
                                        paymentMethod != "khqr" ? <div className="flex justify-between">
                                            <span className="text-gray-600">Service Charge</span>
                                            <span>$ {selectedSeat.length}</span>
                                        </div> : <></>
                                    }
                                    <div className="flex justify-between font-medium pt-3 border-t">
                                        <span>Total Charge</span>
                                        {
                                            paymentMethod != "khqr" ? <span>${(selectedSeat?.length * (Number(routeSelected?.price))) + (selectedSeat.length)}</span> :
                                                <span>${selectedSeat?.length * (Number(routeSelected?.price))}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="border-2 border-dashed shadow-custom2 p-6 rounded-md border-pay bg-white">
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
                            <div>
                                <div className="flex items-center mt-4">
                                    <Checkbox
                                        defaultSelected
                                        size="lg"
                                        radius="full"
                                        className='font-medium'
                                        isSelected={confirmPayment}
                                        onValueChange={() => setIsConfirmPayment(!confirmPayment)}
                                    />
                                    <span className='font-medium'>
                                        I accept the{' '}
                                        <Link href={'/term-and-conditions'} target='_blank' className='underline'>
                                            Terms and Conditions.
                                        </Link>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <form id="_xpayTestForm" name="_xpayTestForm"
                                    action="https://epaymentuat.acledabank.com.kh/GIANTIBIS/paymentPage.jsp"
                                    method="post">
                                    <input type="hidden" id="merchantID" name="merchantID" value={merchantID} />
                                    <input type="hidden" id="paymenttokenid" name="paymenttokenid" value={paymentTokenid} />
                                    <input type="hidden" id="sessionid" name="sessionid" value={sessionId} />
                                    <input type="hidden" id="transactionID" name="transactionID" value={transactionID} />
                                    <input type="hidden" id="expirytime" name="expirytime" value="5" />
                                    <input type="hidden" id="amount" name="amount" value={amountTotal} />
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
                                        disabled={isLoading || !confirmPayment}
                                        onClick={handlePay}
                                        className={cn(
                                            `text-[15px] w-full rounded-md py-3 text-white bg-primary hover:bg-primary-dark`,
                                            !confirmPayment ? 'cursor-not-allowed' : ''
                                        )}
                                    >
                                        {isLoading ? 'Submitting ...' : 'Payment'}
                                    </button>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}