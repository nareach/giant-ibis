"use client";

import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const SelectProvince = ({
    title, items, onChange, isError, colspan = 'lg:col-span-2', value,
}) => {

    return (
        <div className={cn('w-full', colspan)}>
            <Label htmlFor="origin" className="block text-sm font-normal pb-1 text-label mb-2">
                {title}
            </Label>
            <Select onValueChange={onChange} value={value ?? ""} // Use empty string when null to clear selection
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Select ${title}`} />
                </SelectTrigger>
                <SelectContent>
                    {items?.map((item, index) => (
                        <SelectItem key={index} value={item?.city_id}>{item?.city_name}</SelectItem>
                    ))}
                </SelectContent>
                {
                    isError ? (<span className="text-red-500 mt-3 text-[14px]">{title} is required.</span>) : ''
                }
            </Select>
        </div>
    );
}
