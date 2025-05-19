import { ACLEDA_BANK_API_CHECK_STATUS, loginId, merchantID, merchantName, password, signature } from "@/constant/constant";
import { confirmBooking, getAddressDetail, getAllBookDetail, getBusList, getCity, getPickUpList, getRouteBus, getRouteList, getRouteTiming, printTicket } from "@/services/giantIbisServiceCall";
import { addHoursToTime, calculateArrival } from "@/utils/time-util";
import axios from "axios";
import moment from "moment";
import nodemailer from 'nodemailer';
import { generateInvoicePdf } from "./utils/generate-invoice";
import { generateInvoiceRoundTripPdf } from "./utils/generate-invoice-round-trip";
import { RoundTripMailTemplate } from "../send/RoundTripTemplate";
import { OneWayTemplate } from "../send/OneWayTemplate";

export class PaymentService {


    confirmTheBooking = async ({
        paymentTokenId,
        oneWayCode
    }) => {

        const book = await this.fidnBookDetail(oneWayCode)

        return book;
    }


    confirmOneWay = async (bookList, refCode, isConfirm, paymentMethod) => {
        const seatNumbers = bookList?.map(item => item?.seat_id).join(",");
        const routeList = await getRouteList();
        const cities = await getCity();

        const routeFilter = routeList?.data?.filter((route, index) => route?.id == bookList[0].route_id);
        let route;
        if (routeFilter?.length > 0) {
            route = routeFilter[0];
        }

        const originCity = cities?.data?.filter((city, index) => city?.city_id == route?.origin)
        const destinationCity = cities?.data?.filter((city, index) => city?.city_id == route?.destination)

        const destinationTime = addHoursToTime(bookList[0].travel_time, route?.destination);
        const arrivalDate = calculateArrival({
            departureTime: bookList[0].travel_date,
            durationHours: route?.duration,
            metaTime: bookList[0].travel_time
        });


        // address
        const addressOriginAddress = await this.findAddress(route?.id, bookList[0].travel_time);
        const destinationAddress = await this.findAddress(route?.id, destinationTime);
        const busDetail = await this.findRouteBus(
            bookList[0].route_id,
            bookList[0].travel_time
        );

        const facility = this.getFacilities(busDetail?.data?.length > 0 ? busDetail?.data[0].facilities : null)
        const printTicket = await this.printTicketDetail(bookList[0].ref_code);
        let ticketInfor = null;
        let pickup = bookList[0].pickup;
        let pickupObj = null;
        if (pickup) {
            const getPickUpListData = await getPickUpList({ city_id: route?.origin });
            pickupObj = getPickUpListData?.data?.filter((item) => item?.id == pickup);
            pickupObj = pickupObj?.length > 0 ? pickupObj[0] : null;
        }

        if (printTicket?.data?.length > 0) {
            ticketInfor = printTicket?.data?.filter((item) => item?.first_name != "guest_name0")?.map((item) => {

                const email = item?.email?.split(",");
                const first_name = item?.first_name.split(",");
                const last_name = item?.last_name.split(",");
                const mobile = item?.mobile.split(",");

                return {
                    ...item,
                    email: email?.length > 0 ? email[0] : null,
                    first_name: first_name?.length > 0 ? first_name[0] : null,
                    last_name: last_name?.length > 0 ? last_name[0] : null,
                    mobile: mobile?.length > 0 ? mobile[0] : null,
                }
            })
        }

        let passengers = ticketInfor?.map((item) => {
            return {
                username: `${item?.first_name || ""} ${item?.last_name || ""}`,
                mobile: item?.mobile || "",
                email: item?.email || "",
                pickup: pickupObj?.title || "",
            }
        })

        if (isConfirm) {
            await this.sendMail({
                ticketCount: ticketInfor?.length || 0,
                price: ticketInfor[0].price,
                busType: route?.bus_type || "",
                kilometer: route?.kilo_meters || "",
                duration: route?.duration || "",
                seatNo: seatNumbers || "",
                toEmail: ticketInfor?.length > 0 ? ticketInfor[0]?.email : "",
                ticketId: refCode,
                dateSend: ticketInfor?.length > 0 ? ticketInfor[0]?.issued_date : "",
                originCity: originCity[0]?.city_name || "",
                originDate: moment(bookList[0]?.travel_date)?.format('MMMM-DD-YYYY') || "",
                originTime: bookList[0]?.travel_time || "",
                originAddress: addressOriginAddress?.data?.length > 0 ? addressOriginAddress?.data[0]?.url : null,
                destinationCity: destinationCity[0]?.city_name || "",
                destinationDate: arrivalDate || "",
                destinationTime: destinationTime || "",
                passengers: passengers,
                facibilities: facility,
                pickup: pickupObj?.title ? pickupObj?.title : null,
            })
        }

        return {
            passengers,
            ticketCount: ticketInfor?.length || 0,
            price: ticketInfor[0].price,
            ticket: ticketInfor?.length > 0 ? ticketInfor[0] : null,
            pickup: pickupObj || null,
            facilities: facility,
            kilo_meters: route?.kilo_meters,
            bus_type: route?.bus_type,
            duration: route?.duration,
            ref_code: bookList[0].ref_code,
            passenger_id: bookList[0].passenger_id,
            route_id: bookList[0].route_id,
            bus_id: bookList[0].bus_id,
            travel_date: bookList[0].travel_date,
            travel_time: bookList[0].travel_time,
            seat_status: bookList[0].seat_status,
            price: bookList[0].price,
            meta_id: bookList[0].meta_id,
            ref_id_ticket: bookList[0].ref_id_ticket,
            seat_no: seatNumbers,
            routeBus: busDetail?.data?.length > 0 ? busDetail?.data[0] : null,
            originDetail: {
                city: originCity[0],
                time: bookList[0].travel_time,
                leaveAt: moment(bookList[0].travel_date).format('MMMM-DD-YYYY'),
                address: addressOriginAddress?.data?.length > 0 ? addressOriginAddress?.data[0] : null
            },
            destinationDetail: {
                city: destinationCity[0],
                time: destinationTime,
                arriveAt: arrivalDate,
                address: destinationAddress,
            },
            route: route,
        };
    }

    confirmRoundTrip1 = async (bookListOneWay, bookListRoundTrip, refCode, refCodeRoundTrip) => {

        try {

            // make a confirm to API
            const confirmOneWayRef = await confirmBooking(refCode);
            const confirmRoundRef = await confirmBooking(refCodeRoundTrip);

            // select seat
            const seatOneWayNumbers = bookListOneWay?.map(item => item?.seat_id).join(",");
            const seatRoundTripNumbers = bookListRoundTrip?.map(item => item?.seat_id).join(",");

            const routeList = await getRouteList();
            const cities = await getCity();

            // find the route
            const routeOneWayFilter = routeList?.data?.filter((route, index) => route?.id == bookListOneWay[0].route_id);
            const routeRoundTripFilter = routeList?.data?.filter((route, index) => route?.id == bookListRoundTrip[0].route_id);

            let routeOneWay;
            if (routeOneWayFilter?.length > 0) {
                routeOneWay = routeOneWayFilter[0];
            }

            let routeRoundTrip;
            if (routeRoundTripFilter?.length > 0) {
                routeRoundTrip = routeRoundTripFilter[0];
            }


            // select the city
            const originOneWayCity = cities?.data?.filter((city, index) => city?.city_id == routeOneWay?.origin)
            const destinationOneWayCity = cities?.data?.filter((city, index) => city?.city_id == routeOneWay?.destination)

            const originRoundTripCity = cities?.data?.filter((city, index) => city?.city_id == routeRoundTrip?.origin)
            const destinationRoundTripCity = cities?.data?.filter((city, index) => city?.city_id == routeRoundTrip?.destination)

            // select the time
            const destinationOneWayTime = addHoursToTime(bookListOneWay[0].travel_time, routeOneWay?.destination);
            const arrivalOneWayDate = calculateArrival({
                departureTime: bookListOneWay[0].travel_date,
                durationHours: routeOneWay?.duration,
                metaTime: bookListOneWay[0].travel_time
            });

            const destinationRoundTripTime = addHoursToTime(bookListRoundTrip[0].travel_time, routeRoundTrip?.destination);
            const arrivalRoundTripDate = calculateArrival({
                departureTime: bookListRoundTrip[0].travel_date,
                durationHours: routeRoundTrip?.duration,
                metaTime: bookListRoundTrip[0].travel_time
            });


            // pick up address
            let ticketOneWayInfor = null;
            let ticketRoundTripInfor = null;

            let pickupOneWay = bookListOneWay[0].pickup;
            let pickupRoundTrip = bookListRoundTrip[0].pickup;

            let pickupOneWayObj = null;
            let pickupRoundTripObj = null;

            if (pickupOneWay) {
                const getPickUpListData = await getPickUpList({ city_id: routeOneWay?.origin });
                pickupOneWayObj = getPickUpListData?.data?.filter((item) => item?.id == pickupOneWay);
                pickupOneWayObj = pickupOneWayObj?.length > 0 ? pickupOneWayObj[0] : null;
            }

            if (pickupRoundTrip) {
                const getPickUpListData = await getPickUpList({ city_id: routeRoundTrip?.origin });
                pickupRoundTripObj = getPickUpListData?.data?.filter((item) => item?.id == pickupRoundTrip);
                pickupRoundTripObj = pickupRoundTripObj?.length > 0 ? pickupRoundTripObj[0] : null;
            }



            // const facilityOneWay = this.getFacilities(busDetail?.data?.length > 0 ? busDetail?.data[0].facilities : null)
            const printTicketOneWay = await this.printTicketDetail(bookListOneWay[0].ref_code);
            if (printTicketOneWay?.data?.length > 0) {
                ticketInfor = printTicket?.data?.filter((item) => item?.first_name != "guest_name0")?.map((item) => {

                    const email = item?.email?.split(",");
                    const first_name = item?.first_name.split(",");
                    const last_name = item?.last_name.split(",");
                    const mobile = item?.mobile.split(",");

                    return {
                        ...item,
                        email: email?.length > 0 ? email[0] : null,
                        first_name: first_name?.length > 0 ? first_name[0] : null,
                        last_name: last_name?.length > 0 ? last_name[0] : null,
                        mobile: mobile?.length > 0 ? mobile[0] : null,
                    }
                })
            }


        } catch (error) {

        }
    }

    confirmBookingWithoutSendMail = async (bookList, refCode) => {

        const seatNumbers = bookList?.map(item => item?.seat_id).join(",");
        const routeList = await getRouteList();
        const cities = await getCity();

        const routeFilter = routeList?.data?.filter((route, index) => route?.id == bookList[0].route_id);
        let route;
        if (routeFilter?.length > 0) {
            route = routeFilter[0];
        }

        const originCity = cities?.data?.filter((city, index) => city?.city_id == route?.origin)
        const destinationCity = cities?.data?.filter((city, index) => city?.city_id == route?.destination)

        const destinationTime = addHoursToTime(bookList[0].travel_time, route?.destination);
        const arrivalDate = calculateArrival({
            departureTime: bookList[0].travel_date,
            durationHours: route?.duration,
            metaTime: bookList[0].travel_time
        });


        // address
        const addressOriginAddress = await this.findAddress(route?.id, bookList[0].travel_time);
        const destinationAddress = await this.findAddress(route?.id, destinationTime);
        const busDetail = await this.findRouteBus(
            bookList[0].route_id,
            bookList[0].travel_time
        );

        const facility = this.getFacilities(busDetail?.data?.length > 0 ? busDetail?.data[0].facilities : null)
        const printTicket = await this.printTicketDetail(bookList[0].ref_code);
        let ticketInfor = null;
        let pickup = bookList[0].pickup;
        let pickupObj = null;

        if (pickup) {
            const getPickUpListData = await getPickUpList({ city_id: route?.origin });
            pickupObj = getPickUpListData?.data?.filter((item) => item?.id == pickup);
            pickupObj = pickupObj?.length > 0 ? pickupObj[0] : null;
        }

        if (printTicket?.data?.length > 0) {
            ticketInfor = printTicket?.data?.filter((item) => item?.first_name != "guest_name0")?.map((item) => {

                const email = item?.email?.split(",");
                const first_name = item?.first_name.split(",");
                const last_name = item?.last_name.split(",");
                const mobile = item?.mobile.split(",");

                return {
                    ...item,
                    email: email?.length > 0 ? email[0] : null,
                    first_name: first_name?.length > 0 ? first_name[0] : null,
                    last_name: last_name?.length > 0 ? last_name[0] : null,
                    mobile: mobile?.length > 0 ? mobile[0] : null,
                }
            })
        }

        let passengers = ticketInfor?.map((item) => {
            return {
                username: `${item?.first_name || ""} ${item?.last_name || ""}`,
                mobile: item?.mobile || "",
                email: item?.email || "",
                pickup: pickupObj?.title || "",
            }
        })

        return {
            notification: {
                pickup: pickupObj?.title ? pickupObj?.title : null,
                ticketCount: ticketInfor?.length || 0,
                price: ticketInfor[0].price,
                busType: route?.bus_type || "",
                kilometer: route?.kilo_meters || "",
                duration: route?.duration || "",
                seatNo: seatNumbers || "",
                toEmail: ticketInfor?.length > 0 ? ticketInfor[0]?.email : "",
                ticketId: refCode,
                dateSend: ticketInfor?.length > 0 ? ticketInfor[0]?.issued_date : "",
                originCity: originCity[0]?.city_name || "",
                originDate: moment(bookList[0]?.travel_date)?.format('MMMM-DD-YYYY') || "",
                originTime: bookList[0]?.travel_time || "",
                originAddress: addressOriginAddress?.data?.length > 0 ? addressOriginAddress?.data[0]?.url : null,
                destinationCity: destinationCity[0]?.city_name || "",
                destinationDate: arrivalDate || "",
                destinationTime: destinationTime || "",
                passengers: passengers,
                facibilities: facility,
            },
            ticketCount: ticketInfor?.length || 0,
            price: ticketInfor[0].price,
            ticket: ticketInfor?.length > 0 ? ticketInfor[0] : null,
            pickup: pickupObj || null,
            facilities: facility,
            kilo_meters: route?.kilo_meters,
            bus_type: route?.bus_type,
            duration: route?.duration,
            ref_code: bookList[0].ref_code,
            passenger_id: bookList[0].passenger_id,
            route_id: bookList[0].route_id,
            bus_id: bookList[0].bus_id,
            travel_date: bookList[0].travel_date,
            travel_time: bookList[0].travel_time,
            seat_status: bookList[0].seat_status,
            price: bookList[0].price,
            meta_id: bookList[0].meta_id,
            ref_id_ticket: bookList[0].ref_id_ticket,
            seat_no: seatNumbers,
            routeBus: busDetail?.data?.length > 0 ? busDetail?.data[0] : null,
            originDetail: {
                city: originCity[0],
                time: bookList[0].travel_time,
                leaveAt: moment(bookList[0].travel_date).format('MMMM-DD-YYYY'),
                address: addressOriginAddress?.data?.length > 0 ? addressOriginAddress?.data[0] : null
            },
            destinationDetail: {
                city: destinationCity[0],
                time: destinationTime,
                arriveAt: arrivalDate,
                address: destinationAddress,
            },
            route: route,
        };
    }

    confirmRoundTrip = async (bookListOneWay, bookListRoundTrip, refCode, refCodeRoundTrip, isConfirm, paymentMethod) => {

        const confirmOneWay = await this.confirmBookingWithoutSendMail(bookListOneWay, refCode);
        const confirmRoundTrip = await this.confirmBookingWithoutSendMail(bookListRoundTrip, refCodeRoundTrip);

        const oneWayNotification = confirmOneWay?.notification;
        const roundTripNotification = confirmRoundTrip?.notification;

        if (isConfirm)
            await this.sendMailRoundTrip({
                ...oneWayNotification,
                pickupReturn: roundTripNotification?.pickup,
                ticketCountReturn: roundTripNotification?.ticketCount,
                priceReturn: roundTripNotification?.price,
                ticketIdReturn: roundTripNotification?.ticketId,
                busTypeReturn: roundTripNotification?.busType,
                seatNoReturn: roundTripNotification?.seatNo,
                originDateReturn: roundTripNotification?.originDate,
                originTimeReturn: roundTripNotification?.originTime,
                originCityReturn: roundTripNotification?.originCity,
                originAddressReturn: roundTripNotification?.originAddress,
                durationReturn: roundTripNotification?.duration,
                kilometerReturn: roundTripNotification?.kilometer,
                destinationDateReturn: roundTripNotification?.destinationDate,
                destinationTimeReturn: roundTripNotification?.destinationTime,
                destinationCityReturn: roundTripNotification?.destinationCity,
                dateSendReturn: roundTripNotification?.dateSend,
                passengersReturn: roundTripNotification?.passengers,
                facibilitiesReturn: roundTripNotification?.facibilities,
            })

        return {
            oneWay: confirmOneWay || null,
            roundTrip: confirmRoundTrip || null,
        }
    }

    checkPaymentStatus = async (paymentTokenId) => {
        try {

            let data = JSON.stringify({
                "loginId": loginId,
                "password": password,
                "merchantId": merchantID,
                "signature": signature,
                "merchantName": merchantName,
                "paymentTokenid": paymentTokenId
            });

            const response = await axios.post(
                ACLEDA_BANK_API_CHECK_STATUS,
                data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            return response.data;
        } catch (error) {
            console.log('error: ', error?.response);
        }

        return null;
    }


    async findTimingDetail({ travel_time, meta_id, routeId }) {
        const timing = await this.findTimingByRouteId(routeId);

        if (timing?.data?.length > 0) {
            const timingDetail = timing?.data?.filter((item, index) => item.meta_id == meta_id && item?.meta_value == travel_time)
            return timingDetail[0];
        }
        return null;
    }

    async findTimingByRouteId(routeId) {
        return await getRouteTiming(routeId);
    }

    async printTicketDetail(bookId) {
        return await printTicket(bookId);
    }

    async fidnBookDetail() {
        const bookList = await getAllBookDetail();
        return bookList?.data;
    }

    async findAddress(routeId, travelTime) {
        return await getAddressDetail(routeId, travelTime);
    }


    async findBusList(busType) {
        return await getBusList(busType);
    }

    async findRouteBus(routeId, travelTime) {
        return await getRouteBus(routeId, travelTime);
    }

    getFacilities(facilities) {
        const str = facilities.split(',');
        return this.isFacilitiesAvailable(str);
    }

    isFacilitiesAvailable(facilityArray) {

        const facilities = [
            "Air Conditioning", "WiFi", "Snack", "Water Bottle", "Wet Towel", "Power Outlet", "GPS",
            "Leg Room", "Seat Belt", "Toilet", "TV", "USB Charger", "Sleeping Bed"
        ];

        return {
            airConditioning: facilityArray.includes("Air Conditioning"),
            wifi: facilityArray.includes("WiFi"),
            snack: facilityArray.includes("Snack"),
            waterBottle: facilityArray.includes("Water Bottle"),
            wetTowel: facilityArray.includes("Wet Towel"),
            powerOutlet: facilityArray.includes("Power Outlet"),
            gps: facilityArray.includes("GPS"),
            legRoom: facilityArray.includes("Leg Room"),
            seatBelt: facilityArray.includes("Seat Belt"),
            toilet: facilityArray.includes("Toilet"),
            tv: facilityArray.includes("TV"),
            usbCharger: facilityArray.includes("USB Charger"),
            sleepingBed: facilityArray.includes("Sleeping Bed")
        };
    }

    async sendMail({
        ticketCount,
        price,
        toEmail,
        ticketId,
        busType,
        seatNo,
        originDate,
        originTime,
        originCity,
        originAddress,
        duration,
        kilometer,
        destinationDate,
        destinationTime,
        destinationCity,
        dateSend,
        passenger,
        passengers = [],
        facibilities,
        pickup,
    }) {

        const transporter = nodemailer.createTransport({
            host: '4156.smtp.antispamcloud.com',
            port: 465,
            secure: true,
            logger: true,
            debug: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        try {

            const htmlContent = OneWayTemplate({
                originAddress,
                ticketCount,
                price,
                toEmail,
                ticketId,
                busType,
                seatNo,
                originDate,
                originTime,
                originCity,
                duration,
                kilometer,
                destinationDate,
                destinationTime,
                destinationCity,
                passengers,
                dateSend,
                facibilities,
                pickup
            });


            const pdfBuffer = await generateInvoicePdf({
                ticketCount,
                price,
                ticketId,
                toEmail,
                busType,
                seatNo,
                originDate,
                originTime,
                originCity,
                originAddress,
                duration,
                kilometer,
                destinationDate,
                destinationTime,
                destinationCity,
                dateSend,
                passengers,
                facibilities,
                pickup
            });


            transporter.sendMail({
                from: 'info@giantibis.com',
                to: toEmail,
                subject: 'Giant Ibis E-Ticket',
                text: 'Please find your e-ticket attached.',
                html: htmlContent,
                attachments: [
                    {
                        filename: 'e-ticket.pdf',
                        content: pdfBuffer,
                        contentType: 'application/pdf',
                    },
                ],
            });

            console.log('Email sent successfully!');
        } catch (error) {
            console.error('Error sending mail:', error);
            throw error;
        }
    }

    async sendMailRoundTrip({
        // departuree param
        ticketCount,
        price,
        toEmail,
        ticketId,
        busType,
        seatNo,
        originDate,
        originTime,
        originCity,
        originAddress,
        duration,
        kilometer,
        destinationDate,
        destinationTime,
        destinationCity,
        dateSend,
        passengers = [],
        facibilities = [],
        pickup,
        pickupReturn,
        // return param
        ticketCountReturn,
        priceReturn,
        ticketIdReturn,
        busTypeReturn,
        seatNoReturn,
        originDateReturn,
        originTimeReturn,
        originCityReturn,
        originAddressReturn,
        durationReturn,
        kilometerReturn,
        destinationDateReturn,
        destinationTimeReturn,
        destinationCityReturn,
        dateSendReturn,
        passengersReturn = [],
        facibilitiesReturn = []
    }) {


        const transporter = nodemailer.createTransport({
            host: '4156.smtp.antispamcloud.com',
            port: 465,
            secure: true,
            logger: true,
            debug: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        try {

            const htmlContent = RoundTripMailTemplate({
                ticketCount,
                price,
                originAddress,
                toEmail,
                ticketId,
                busType,
                seatNo,
                originDate,
                originTime,
                originCity,
                duration,
                kilometer,
                destinationDate,
                destinationTime,
                destinationCity,
                facibilities,
                passengers,
                dateSend,
                ticketCountReturn,
                priceReturn,
                ticketIdReturn,
                busTypeReturn,
                seatNoReturn,
                originDateReturn,
                originTimeReturn,
                originCityReturn,
                originAddressReturn,
                durationReturn,
                kilometerReturn,
                destinationDateReturn,
                destinationTimeReturn,
                destinationCityReturn,
                dateSendReturn,
                passengersReturn,
                facibilitiesReturn,
                pickup,
                pickupReturn
            });

            const pdfBuffer = await generateInvoiceRoundTripPdf({
                pickup: pickup,
                pickupReturn: pickupReturn,
                ticketCount,
                price,
                ticketId,
                toEmail,
                busType,
                seatNo,
                originDate,
                originTime,
                originCity,
                originAddress,
                duration,
                kilometer,
                destinationDate,
                destinationTime,
                destinationCity,
                dateSend,
                passengers,
                facibilities,
                ticketCountReturn,
                priceReturn,
                ticketIdReturn,
                busTypeReturn,
                seatNoReturn,
                originDateReturn,
                originTimeReturn,
                originCityReturn,
                originAddressReturn,
                durationReturn,
                kilometerReturn,
                destinationDateReturn,
                destinationTimeReturn,
                destinationCityReturn,
                dateSendReturn,
                passengersReturn,
                facibilitiesReturn
            });


            transporter.sendMail({
                from: 'info@giantibis.com',
                to: toEmail,
                subject: 'Giant Ibis E-Ticket',
                text: 'Please find your e-ticket attached.',
                html: htmlContent,
                attachments: [
                    {
                        filename: 'e-ticket.pdf',
                        content: pdfBuffer,
                        contentType: 'application/pdf',
                    },
                ],
            });

            console.log('Email sent successfully!');
        } catch (error) {
            console.error('Error sending mail:', error);
            throw error;
        }
    }

}

export const paymentService = new PaymentService();