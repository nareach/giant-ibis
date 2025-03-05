"use client";

import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const SelectProvince = ({
    title, items, onChange
}) => {
    
    return (
        <div className="lg:col-span-2">
            <Label htmlFor="origin" className="block text-sm font-normal pb-1 text-label mb-2">
                {title}
            </Label>
            <Select onValueChange={onChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Select ${title}`} />
                </SelectTrigger>
                <SelectContent>
                    {items?.map((item, index) => (
                        <SelectItem key={index} value={item?.city_id}>{item?.city_name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
