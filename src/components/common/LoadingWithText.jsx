import React from 'react'

export default function LoadingWithText() {
    return (
        <div className="flex items-center justify-center space-x-2 my-20">
            <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse delay-100"></div>
            <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse delay-200"></div>
            <span className="ml-2 text-gray-600">Loading...</span>
        </div>
    )
}
