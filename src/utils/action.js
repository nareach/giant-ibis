import { fetchFromApi } from "./api";
import dayjs from 'dayjs';
import { getAllSeatLayout } from "./seat-status";

export const getBusStatus = async ({
    route,
    busType,
    date,
    routeTiming,
    busDetail
}) => {
    
    const bus_status = await fetchFromApi('get_bus_status', {
        route_id: route?.id,
        bus_id: busType?.data[0].id,
        travel_date: dayjs(date, "DD-MM-YYYY").format('YYYY-MM-DD'),
        travel_time: routeTiming?.meta_value,
    });

    console.log({
        route_id: route?.id,
        bus_id: busType?.data[0].id,
        travel_date: dayjs(date, "DD-MM-YYYY").format('YYYY-MM-DD'),
        travel_time: routeTiming?.meta_value,
    });
    
    console.log('bus_status: ',bus_status);
    
    

    const seatsArray = busDetail.data[0].meta_value.split(',');

    const seatStatuses = bus_status.status && bus_status.data !== "NULL"
        ? bus_status.data
        : [];

    const seatsWithStatus = seatsArray.map(seat => {
        const foundStatus = seatStatuses.find(s => s.seat_id === seat);
        return {
            seat,
            status: foundStatus ? foundStatus.seat_status : "Available"
        };
    });

    const seatStatisLayout = getAllSeatLayout(route.bus_type);

    let busStatus = [];
    busStatus = seatsWithStatus;
    const allowedSeats = new Set(seatsWithStatus.map(item => item.seat));

    const updatedSeats = seatStatisLayout.seats.map(seatItem => {
        if (seatItem.status === 'hide' || seatItem.status === 'wc') {
            return seatItem;
        }

        if (!allowedSeats.has(seatItem.seat)) {
            return {
                ...seatItem,
                status: 'Reserved'
            };
        }

        const statusItem = busStatus.find(item => item.seat === seatItem.seat);

        return {
            ...seatItem,
            status: statusItem ? statusItem.status : 'Reserved'
        };
    });

    const updatedLayout = {
        ...seatStatisLayout,
        seats: updatedSeats
    };

    return updatedLayout;
}