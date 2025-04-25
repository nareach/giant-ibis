import { cn } from '@/lib/utils'
import React from 'react'

export default function RouteInfor({
    departure_date,
    time,
    city,
    isStart
}) {
    return (
        <div className="flex items-center">
            <div>
                <div className={cn('text-lg font-semibold text-gray-900', isStart ? 'text-start' : 'text-right')}>
                    {departure_date}
                </div>
                <div className={cn('text-lg font-semibold text-gray-900 text-start', isStart ? 'text-start' : 'text-right')}>
                    {time}
                </div>
                <div className={cn('text-sm text-gray-500 text-start', isStart ? 'text-start' : 'text-right')}>
                    {city}
                </div>
            </div>
        </div>
    )
}
