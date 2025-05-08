"use client";
import dayjs from 'dayjs';
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
import { hasBusLeft } from "@/utils/time-util";
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import RouteInfor from '@/components/ui/RouteInfor';
import FacilityAvailable from '@/components/common/FacilityAvalable';
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
            className={cn('p-6 flex w-full justify-between items-start cursor-pointer hover:shadow-lg transition-shadow border rounded-lg relative',)}
            onClick={() => {
                handleTripSelect(trip);
            }}
        >
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
                            {trip?.seat_status?.seats?.filter(
                                seat => seat.status === "Available"
                            ).length} Seats Left
                        </span>
                    </div>
                </div>

                <FacilityAvailable facilities={trip?.facilities} />

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <RouteInfor
                            city={trip?.originDetail?.city?.city_name}
                            departure_date={trip?.originDetail?.leaveAt}
                            isStart={true}
                            time={trip.timing?.meta_value}
                            routeId={trip?.id}
                            isShowAddress={false}
                        />
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

                        <RouteInfor
                            city={trip?.destinationDetail?.city?.city_name}
                            departure_date={trip?.destinationDetail?.arriveAt}
                            isShowAddress={false}
                            routeId={trip?.id}
                            isStart={false}
                            time={trip?.destinationDetail?.time}
                        />
                    </div>
                </div>
            </div>
        </button>
    )
}
