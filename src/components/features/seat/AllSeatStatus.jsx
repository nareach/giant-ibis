import React from 'react'

export default function AllSeatStatus() {
    return (
        <div className="mt-6 flex justify-around gap-4">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="text-sm text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm text-gray-600">Reserved</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-sm text-gray-600">Selected</span>
            </div>
        </div>
    )
}
