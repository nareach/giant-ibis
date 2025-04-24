"use client";

import React from 'react'


import {
    Bus,
    Clock,
    Coffee,
    MapPin,
    Wifi,
    Monitor,
    Wind,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { addHoursToTime, hasBusLeft } from "@/utils/time-util";
import { cn } from '@/lib/utils';
import { toast, Toaster } from 'sonner';
export default function TripListComponent({
    handleTripSelect,
    trip,
    index,
    isLoadingFetching,
    departure_date
}) {
    return (
        <button
            key={index}
            className={cn('p-6 flex w-full justify-between items-start cursor-pointer hover:shadow-lg transition-shadow border rounded-lg relative',
                hasBusLeft(departure_date, trip?.timing?.time) ? 'cursor-not-allowed' : ''
            )}
            onClick={() => {
                if (!hasBusLeft(departure_date, trip?.timing?.time)) {
                    handleTripSelect(trip);
                } else {
                    toast.info('This trip is not allow');
                }
            }}
        >
            <div className='absolute left-2 top-[-13px] flex'>
                {
                    hasBusLeft(departure_date, trip?.timing?.time) ?
                        (<div className='bg-[#FF0000] mr-2  text-white px-2 rounded-lg'>This trip has already left. 🚍❌</div>) : (<></>)
                }
                {
                    trip?.seat_status?.seats.filter(
                        seat => seat.status === "Available"
                    ).length < 1 ?
                        (<div className='bg-[#FF0000] mr-2  text-white px-2 rounded-lg'>All seats have been booked.</div>) : (<></>)
                }
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium flex ">
                        {trip?.bus_type}
                        <Button
                            size="sm"
                            variant="secondary"
                            className="bg-primary ml-2 text-white hover:bg-blue-700"
                        >
                            ${trip?.price}
                        </Button>
                    </h3>

                    <div className="text-right">
                        <span className="text-seatColor text-sm font-semibold">
                            {trip?.seat_status?.seats.filter(
                                seat => seat.status === "Available"
                            ).length} Seats Left
                        </span>
                    </div>
                </div>

                <div className="flex gap-3 text-secondary mb-4">
                    <Wifi className="w-4 h-4" />
                    <Coffee className="w-4 h-4" />
                    <Monitor className="w-4 h-4" />
                    <Wind className="w-4 h-4" />
                    <Clock className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div>
                            <div className="text-lg font-semibold text-gray-900">
                                {trip.timing?.time || 'no'}
                            </div>
                            <div className="text-sm text-gray-500">{trip?.origin_details?.city_name || ''}</div>
                        </div>
                    </div>

                    <Bus className="w-5 h-5 text-secondary ml-2" />
                    <div className="flex-1 px-4 relative">
                        <div className="text-center mt-6 text-sm text-gray-500">
                            {trip.duration}
                        </div>
                        <div className="absolute  inset-x-0 top-11 border-t  border-red-200"></div>
                        <div className="text-center text-sm text-gray-500">
                            {trip?.kilo_meters} KM
                        </div>
                    </div>
                    <div className="flex   items-center text-right">
                        <MapPin className="w-5 h-5 text-secondary mr-2" />
                        <div>
                            <div className="text-lg font-semibold text-gray-900">
                                {trip.timing?.time ? addHoursToTime(trip.timing?.time, trip?.duration) : '' || 'no'}
                            </div>
                            <div className="text-sm text-gray-500">
                                {trip?.destination_details?.city_name || ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    )
}
