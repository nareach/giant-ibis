import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'

export default function ServiceWhyIbis({
    img,
    title,
    content,
    index
}) {
    return (
        <Card className="p-6 mb-5">
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={`/assets/images/why-ibis/${img}`}
                    className={cn(
                        `w-full md:w-96 h-56 rounded-md object-cover order-2`,
                        index % 2 == 0 ? 'order-1': 'order-2'
                    )}
                />
                <div className={cn(
                    `flex-1 flex flex-col justify-center items-start order-1`,
                    index % 2 == 0 ? 'order-2': 'order-1'

                )}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                        <h2 className="text-xl font-semibold text-center">{title}</h2>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {content}
                    </p>
                </div>
            </div>
        </Card>
    )
}
