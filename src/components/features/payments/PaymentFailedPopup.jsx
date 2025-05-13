import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const PaymentFailedPopup =  ({
  isVisible,
  errorMessage = 'Payment failed. Please try again.',
  onRetry,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <div className="flex flex-col items-center text-center">
              {/* Error Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              {/* Message */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Failed</h3>
              <p className="text-gray-600 mb-6">{errorMessage}</p>

              {/* Buttons */}
              <div className="flex gap-3 w-full">
                {onClose && (
                  <button
                    onClick={onClose}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                  >
                    Close
                  </button>
                )}
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="flex-1 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition focus:outline-none"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentFailedPopup;