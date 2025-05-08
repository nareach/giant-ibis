import { fetchFromApi } from "./api";
import dayjs from 'dayjs';
import { getAllSeatLayout } from "./seat-status";
import { getBusStatusDetail } from "@/services/giantIbisServiceCall";

export const getBusStatus = async ({
    route,
    busType,
    date,
    routeTiming,
    busDetail
}) => {
    
    const bus_status = await getBusStatusDetail({
        routeId: route?.id,
        busId: busType?.data[0].id,
        travelDate: dayjs(date, "DD-MM-YYYY").format('YYYY-MM-DD'),
        travelTime: routeTiming?.meta_value,
    });

    
    // allow seat
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

    const updatedSeats = seatStatisLayout?.seats.map(seatItem => {

        // just ignore it because need to design ui base static
        if (seatItem.status === 'hide' || seatItem.status === 'wc') {
            return seatItem;
        }

        // if it doesn't include in allow seat mark Reserved because the admin disabled it.
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