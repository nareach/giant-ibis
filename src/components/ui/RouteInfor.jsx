'use client'
import { cn } from '@/lib/utils'
import { Map, MapIcon, MapPinCheck, Pin } from 'lucide-react'
import React, { } from 'react'

export default function RouteInfor({
    departure_date,
    time,
    city,
    isStart,
    address,
    isShowAddress = true,
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
                <div className={cn("cursor-pointer", isStart ? 'text-start' : 'text-right')}>
                    {address && isShowAddress && (
                        <a
                            href={address}
                            target='_blank'
                            rel="noopener noreferrer"
                            className={cn(
                                'inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors mt-[2px]',
                                isStart ? 'text-start' : 'text-right'
                            )}
                            aria-label="View location on map"
                        >
                            View Location <MapPinCheck className='tex-[12px]' />
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
