import { nExclusiveVipSeaterData } from '@/components/seat-layut-data/n-exclusive-vip-seater'
import { cn } from '@/lib/utils'
import { getStatusColor } from '@/utils/color-util'
import { renderBusLayout } from '@/utils/seat-status'
import { RockingChair, Toilet } from 'lucide-react'
import React from 'react'

export default function NExclusiveVipSeater({
    busType,
    onClick,
}) {

    return (
        <div>
            <div className="text-black text-center mb-5 text-sm">Vechicle Type: {busType}</div>
            <div className={cn(`grid grid-cols-${nExclusiveVipSeaterData.col} ml-8 gap-3`)}>
                {nExclusiveVipSeaterData.seats.map((item, index) => (
                    <button
                        key={index}
                        disabled={item?.status == 'hide'}
                        onClick={() => item?.status !== 'Booked' && item?.status !== 'Reserved' && onClick(item)}
                        className={cn(
                            `w-12 h-12 flex items-center justify-center rounded-lg ${getStatusColor(item?.status)}`,
                            `${item?.status !== 'Booked' && item?.status !== 'Reserved' ? 'cursor-pointer' : 'cursor-not-allowed'}`,
                            item?.status == 'hide' ? 'cursor-auto' : '',
                            item?.status == 'wc' ? 'row-span-2 h-full cursor-auto' : ''
                        )}
                    >
                        {renderBusLayout(item?.status, item?.seat)}
                    </button>
                ))}
            </div>
        </div>
    )
}
