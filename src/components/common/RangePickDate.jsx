import React from "react";
import { Label } from "@/components/ui/label";
import { DatePicker } from "antd";
import './pick-date.css';
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import dayjs from 'dayjs';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-poppins',
});

const { RangePicker } = DatePicker;

export const RangePickDateFilter = ({ title, onChange, isError, value, colspan = 'lg:col-span-2', startFrom }) => {
    const disabledDate = (current) => {
        // Disable dates before today
        if (current && current < dayjs().startOf('day')) {
            return true;
        }
        
        // If startFrom is provided, disable dates before startFrom + 1 day for the end date
        if (startFrom && current && current <= dayjs(startFrom).endOf('day')) {
            return true;
        }
        
        return false;
    };

    // Custom render function for the RangePicker inputs
    const renderExtraFooter = () => {
        return (
            <div style={{ padding: '10px', textAlign: 'center' }}>
                {startFrom ? `End date must be after ${dayjs(startFrom).format('YYYY-MM-DD')}` : 'Select end date'}
            </div>
        );
    };

    return (
        <div className={cn('w-full', colspan)}>
            <Label
                htmlFor="departureDate"
                className="block text-sm font-normal pb-1 text-label mb-2"
            >
                {title}
            </Label>

            <RangePicker
                placeholder={['Start date', 'End date']}
                value={value}
                format="YYYY-MM-DD"
                onChange={onChange}
                disabledDate={disabledDate}
                disabled={[true, false]} // First input disabled, second enabled
                defaultValue={startFrom ? [dayjs(startFrom), null] : undefined}
                renderExtraFooter={renderExtraFooter}
                className={`${poppins.className} font-normal flex h-[40px] w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`} 
            />

            {isError && (
                <span className="text-red-500 mt-3 text-[14px]">
                    {title} is required.
                </span>
            )}
        </div>
    );
}