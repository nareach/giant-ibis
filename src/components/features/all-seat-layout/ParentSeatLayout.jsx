import { universeNode37 } from '@/components/seat-layut-data/universe-noble-37'
import { cn } from '@/lib/utils'
import { getStatusColor } from '@/utils/color-util'
import { renderBusLayout } from '@/utils/seat-status'
import { Button } from 'antd'
import { RockingChair } from 'lucide-react'
import React from 'react'

export default function ParentSeatLayout({
    busType,
    onClick,
    seatData,
}) {

    const colMapping = {
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
    };

    const onDisabled = () => {
        return item?.status != 'Available';
    }

    return (
        <div>
            <div className="text-black text-center mb-5 text-sm">Vechicle Type: {busType}</div>
            <div className={cn(`grid  ml-8 gap-3`, colMapping[seatData.col] || 'grid-cols-4')}>
                {seatData?.seats?.map((item, index) => (
                    <button
                        key={index}
                        disabled={item?.status == 'Booked' || item?.status == 'Reserved' || item?.status == 'wc' || item?.status == 'hide' }
                        onClick={() => onClick(item)}
                        className={cn(
                            `w-12 h-12 flex items-center justify-center rounded-lg ${getStatusColor(item?.status)}`,
                            item?.status == 'Available' ? 'cursor-pointer' : '',
                            item?.status == 'Booked' ? 'cursor-not-allowed' : '',
                            item?.status == 'Reserved' ? 'cursor-not-allowed' : '',
                            item?.status == 'hide' ? 'cursor-auto' : '',
                            item?.status == 'wc' ? 'cursor-auto' : ''
                        )}
                    >
                        {renderBusLayout(item?.status, item?.seat)}
                    </button>
                ))}
            </div>
        </div>
    )
}
