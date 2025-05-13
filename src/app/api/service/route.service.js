import { addHoursToTime, calculateArrival, calculateArrivalDateTime, hasBusLeft } from "@/utils/time-util";
import { getAddressDetail, getBusList, getCity, getRouteBus, getRouteList, getRouteTiming } from "../../../services/giantIbisServiceCall";
import { getBusStatus } from "@/utils/action";
import moment from "moment";


export class RouteService {

    async findRouteDetail(params) {
        try {

            const { origin, destination, travelDate } = params;

            let routes = await this.findByOriginAndDestination({ destination, origin });
            if(routes?.length < 1){
                return null;
            }
            const timing = await this.findTimingByRouteId(routes[0]?.id);
            const cities = await this.findAllCity();

            routes = (await Promise.all(
                routes?.map(async (route, index) => {

                    if (!timing?.data?.[index]) return undefined;

                    const isBusLeaft = hasBusLeft(travelDate, timing?.data[index]?.meta_value);

                    if (isBusLeaft) return undefined;


                    const routeId = route.id;
                    if (!routeId) return undefined;

                    const originDetail = cities?.data?.find(city => city?.city_id == origin);
                    const destinationDetail = cities?.data?.find(city => city?.city_id == destination);

                    if (!originDetail || !destinationDetail) return undefined;

                    // timing
                    const routeTiming = timing?.data[index] || null;
                    const routeTimingMetaValue = timing?.data[index]?.meta_value || null;
                    const destinationTime = addHoursToTime(routeTimingMetaValue, route?.destination);
                    const arrivalDate = calculateArrival({
                        departureTime: travelDate,
                        durationHours: route?.duration,
                        metaTime: timing.data[index].meta_value
                    })

                    // address
                    const addressOrigin = await this.findAddress(routeId, routeTimingMetaValue);

                    const destinationAddress = await this.findAddress(routeId, destinationTime);

                    // bus
                    const busType = await this.findBusList(route?.bus_type);
                    const busDetail = await this.findRouteBus(routeId, routeTimingMetaValue);

                    // bus departure status
                    const bus_status = await getBusStatus({
                        busType: busType,
                        date: travelDate,
                        route: route,
                        routeTiming: routeTiming,
                        busDetail: busDetail
                    });

                    let allowedpickUp = busDetail?.data?.length > 0 ? busDetail?.data[0].allowedpick : '';
                    allowedpickUp = allowedpickUp == '0' ? false : true ;
                    const facility = this.getFacilities(busDetail?.data?.length > 0 ? busDetail?.data[0].facilities : null)

                    // route detail
                    return {
                        ...route,
                        facilities: facility,
                        allowedpickUp: allowedpickUp,
                        timing: timing.data[index],
                        busTypeDetail: busType?.data?.length > 0 ? busType?.data[0] : null,
                        seat_status: bus_status,
                        originDetail: {
                            city: originDetail,
                            leaveAt: moment(travelDate).format('MMMM-DD-YYYY'),
                            time: timing.data[index].meta_value,
                            address: addressOrigin?.data?.length > 0 ? addressOrigin?.data[0] : null
                        },
                        destinationDetail: {
                            city: destinationDetail,
                            time: destinationTime,
                            arriveAt: arrivalDate,
                            address: destinationAddress?.data?.length > 0 ? destinationAddress?.data[0] : null
                        },
                    };
                }))).filter(Boolean);

            return routes;

        } catch (error) {
            console.error("Error fetching routes:", error);
            return null;
        }
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


    async findByOriginAndDestination({ origin, destination }) {

        const routes = await getRouteList();

        return routes?.data.filter((route) => {

            if (origin && route.origin !== origin) return false;

            if (destination && route.destination !== destination) return false;

            return true;
        });
    }

    async findTimingByRouteId(routeId) {
        return getRouteTiming(routeId);
    }

    async findAllCity() {
        return await getCity();
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

}

export const routeService = new RouteService();