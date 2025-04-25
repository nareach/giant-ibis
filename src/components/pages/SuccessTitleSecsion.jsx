import { Check } from 'lucide-react'
import React from 'react'

export default function SuccessTitleSecsion() {
    return (
        <div className="bg-mainbg container mx-auto max-w-7xl p-4 sm:p-6">
            <div className="text-center mt-5">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#67B467] mb-4">
                    <Check className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#67B467] mb-2">
                    Congratulations! You have successfully booked tickets
                </h1>
                <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
                    Please remember to bring your booking confirmation and a valid ID for
                    check-in. Have a great trip!
                </p>
            </div>
        </div>
    )
}
