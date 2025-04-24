import { Coffee, RockingChair, TableIcon, Wifi } from 'lucide-react'
import React from 'react'

export default function Frees() {
    return (
        <div className="flex gap-4 mt-4">
            <Wifi className="w-5 h-5 text-orange-400" />
            <TableIcon className="w-5 h-5 text-orange-400" />
            <Coffee className="w-5 h-5 text-orange-400" />
            <RockingChair className="w-5 h-5 text-orange-400" />
        </div>
    )
}
