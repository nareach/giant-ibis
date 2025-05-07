// In the same services/giantIbisService.ts file

import { callGiantIbisApi } from "./giantIbisService";

export const getRouteList = async () => {
    return callGiantIbisApi('get_routeList');
};


export const getRouteTiming = async (routeId: string) => {
    return callGiantIbisApi(
        'get_route_timing',
        {
            route_id: routeId
        }
    );
};


export const getCity = async () => {
    return callGiantIbisApi(
        'get_cityList',
    );
};

export const getAddressDetail = async (routeId: string, travelTime: string) => {
    console.log({
        route_id: routeId,
        travel_time: travelTime
    });
    
    return await callGiantIbisApi(
        'get_address', {
        route_id: routeId,
        travel_time: travelTime
    });
}

export const getBusList = async (busType: string) => {

    return callGiantIbisApi(
        'get_busList', {
        bus_type: busType
    });
}

// get allow seat
export const getRouteBus = async (busType: string, travelTime: string) => {

    return callGiantIbisApi(
        'get_route_bus', {
        route_id: busType,
        travel_time: travelTime
    });
}

export const confirmBooking = async (refCode: string) => {
    return callGiantIbisApi(
        'confirm_Booking', {
        ref_code: refCode
    })
}

export const getAllBookDetail = async () => {
    return callGiantIbisApi(
        'get_booking_detail', {
        email: "nareachkr@gmail.com",
        password: 123456,
    })
}


export const printTicket = async (bookingId) => {
    return callGiantIbisApi(
        'print_ticket', {
        booking_id: bookingId,
    })
}

export const getBusStatusDetail = async ({
    routeId, busId, travelDate, travelTime
}) => {
    return callGiantIbisApi(
        'get_bus_status', {
        route_id: routeId,
        bus_id: busId,
        travel_date: travelDate,
        travel_time: travelTime
    })
}