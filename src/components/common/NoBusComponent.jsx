import React from 'react'

export default function NoBusComponent() {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No Trips Available</h3>
            <p className="text-gray-500">We couldn't find any trips matching your criteria.</p>
        </div>
    )
}
