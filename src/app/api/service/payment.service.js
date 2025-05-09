import { ACLEDA_BANK_API_CHECK_STATUS, loginId, merchantID, merchantName, password, signature } from "@/constant/constant";
import { getAddressDetail, getAllBookDetail, getBusList, getCity, getRouteBus, getRouteList, getRouteTiming, printTicket } from "@/services/giantIbisServiceCall";
import { addHoursToTime, calculateArrival } from "@/utils/time-util";
import axios from "axios";
import moment from "moment";

export class PaymentService {


    confirmTheBooking = async ({
        paymentTokenId,
        oneWayCode
    }) => {

        const book = await this.fidnBookDetail(oneWayCode)

        return book;
    }

    confirmOneWay = async (bookList) => {

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

        return {
            ticket: ticketInfor?.length > 0 ? ticketInfor[0] : null,
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
            console.log('error: ', error);
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

}

export const paymentService = new PaymentService();