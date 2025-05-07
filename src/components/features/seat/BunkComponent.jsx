import { cn } from '@/lib/utils'
import React from 'react'

export default function BunkComponent({ title, colSpan }) {
    return (
        <div className={cn(
            "relative my-5 w-full",
            `${colSpan}`
        )}>
            <div className="flex items-center">
                <div className="flex-grow border-t border-gray-100 dark:border-gray-700"></div>
                <span className={cn(
                    "px-3 py-1 mx-2 text-xs font-semibold tracking-wider",
                    "text-gray-500 dark:text-gray-400 uppercase",
                    "bg-gray-50 dark:bg-gray-800 rounded-lg",
                    "border border-gray-200 dark:border-gray-700"
                )}>
                    {title}
                </span>
                <div className="flex-grow border-t border-gray-100 dark:border-gray-700"></div>
            </div>
        </div>
    )
}