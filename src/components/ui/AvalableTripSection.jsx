import React from 'react'
import dayjs from 'dayjs';
import { getCityName } from '@/utils/time-util';

export default function AvailableTripSectionTitle({
    title,
    date,
    totalTrip,
    origin,
    destination,
    id = 'return_trip_list',
    cities
}) {
    return (
        <div className="text-xl font-semibold mb-6 grid grid-cols-3" id={id}>
            <h1 className="">{title} ({totalTrip})</h1>
            <div className="text-center pl-10 flex gap-3 col-span-2">
                <div> {dayjs(date, "DD-MM-YYYY").format('YYYY-MM-DD')}</div>
                <div className="flex gap-2">
                    <span>{getCityName({ cities, id: origin })}</span>
                    -
                    <span>{getCityName({ cities, id: destination })}</span>
                </div>
            </div>
        </div>
    )
}
