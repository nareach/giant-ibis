import React from 'react';
import dayjs from 'dayjs';


export default function AvailableTripSectionTitle({
    title,
    date,
    totalTrip,
    origin,
    destination,
    id = 'return_trip_list',
}) {
    return (
        <div 
            className="w-full mb-6 space-y-2 md:space-y-0 md:flex md:items-baseline"
            id={id}
        >
            <h1 className="text-xl font-semibold text-gray-900 max-sm:text-sm">
                {title} 
                <span className="text-blue-600 ml-1">({totalTrip})</span>
            </h1>
            
            <div className="md:ml-6 flex items-center text-gray-600 max-sm:text-sm">
                <span className="hidden md:block mr-2 text-gray-400">|</span>
                <span className="font-medium">{date}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span>
                    {origin} 
                    <span className="mx-2 text-gray-400">→</span> 
                    {destination}
                </span>
            </div>
        </div>
    );
}