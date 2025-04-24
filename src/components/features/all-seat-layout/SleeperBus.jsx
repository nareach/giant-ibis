import { sleeerBusSeatDataLayoutBottom } from '@/components/seat-layut-data/sleeper-bus-data-layout-bottom'
import { sleeerBusSeatDataLayoutTop } from '@/components/seat-layut-data/sleeper-bus-data-layout-top'
import { universeLuxury } from '@/components/seat-layut-data/universe-luxury'
import { cn } from '@/lib/utils'
import { getStatusColor } from '@/utils/color-util'
import { renderBusLayout, seatStatusConfig } from '@/utils/seat-status'
import React from 'react'

export default function SleepeerBus({
    busType,
    onClick,
}) {
    return (
        <div>
            <div className="text-black text-center mb-5 text-sm">Vechicle Type: {busType}</div>

            <div className="text-black text-center my-2 text-sm">Bottom Bunk</div>
            <div className={cn(`grid grid-cols-${sleeerBusSeatDataLayoutBottom.col} ml-8 gap-3`)}>
                {sleeerBusSeatDataLayoutBottom.seats.map((item, index) => (
                    <button
                        key={index}
                        disabled={seatStatusConfig[item?.status]?.disabled || item?.status !== 'Booked' && item?.status !== 'Reserved'}
                        onClick={() => onClick(item)}
                        className={cn(
                            `w-12 h-12 flex items-center justify-center rounded-lg ${getStatusColor(item?.status)}`,
                            `${item?.status !== 'Booked' && item?.status !== 'Reserved' ? 'cursor-pointer' : 'cursor-not-allowed'}`,
                            item?.status == 'hide' ? 'cursor-auto' : ''
                        )}
                    >
                        {renderBusLayout(item?.status, item?.seat)}

                    </button>
                ))}
            </div>

            {/*  */}

            <div className="text-black text-center my-2 text-sm">Top Bunk</div>
            <div className={cn(`grid grid-cols-${sleeerBusSeatDataLayoutTop.col} ml-8 gap-3`)}>
                {sleeerBusSeatDataLayoutTop.seats.map((item, index) => (
                    <button
                        key={index}
                        disabled={seatStatusConfig[item?.status]?.disabled ?? true}
                        onClick={() => item?.status !== 'Booked' && item?.status !== 'Reserved' && onClick(item)}
                        className={cn(
                            `w-12 h-12 flex items-center justify-center rounded-lg ${getStatusColor(item?.status)}`,
                            `${item?.status !== 'Booked' && item?.status !== 'Reserved' ? 'cursor-pointer' : 'cursor-not-allowed'}`,
                            item?.status == 'hide' ? 'cursor-auto' : ''
                        )}
                    >
                        {renderBusLayout(item?.status, item?.seat)}

                    </button>
                ))}
            </div>
        </div>
    )
}
