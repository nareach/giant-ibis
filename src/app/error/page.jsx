import React from 'react'
import Link from 'next/link'
import { FaExclamationTriangle, FaHome, FaRedo, FaCreditCard } from 'react-icons/fa'

export default function PaymentErrorPage() {
  return (
    <div className=" bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-red-500 p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <FaExclamationTriangle className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-white">Payment Failed</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              We couldn't process your payment. This could be due to:
            </p>
            <ul className="text-left text-gray-600 list-disc list-inside space-y-1 mb-6">
              <li>Insufficient funds</li>
              <li>Incorrect card details</li>
              <li>Network issues</li>
              <li>Payment authorization failure</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href={"/book"}  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition">
              <FaRedo />
              Try Payment Again
            </Link>
            

            <Link href="/" className="block w-full">
              <button className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 font-medium py-3 px-4 rounded-lg transition">
                <FaHome />
                Return to Homepage
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}