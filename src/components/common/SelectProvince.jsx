"use client";

import React from "react";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Skeleton } from "@heroui/react";
import { Select } from "antd";
import './select-province-placehoder.css'
export const SelectProvince = ({
    title,
    items,
    onChange,
    isError,
    colspan = 'lg:col-span-2',
    value,
    loading = false,
}) => {
    return (
        <div className={cn('w-full', colspan)}>
            <Label htmlFor="origin" className="block text-sm font-normal pb-1 text-label mb-2">
                {title}
            </Label>

            {loading ? (
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full rounded-md" />
                    {isError && (
                        <span className="text-red-500 mt-3 text-[14px]">
                            {title} is required.
                        </span>
                    )}
                </div>
            ) : (
                <Select
                    showSearch
                    value={value}
                    placeholder={`Select ${title}`}
                    optionFilterProp="label"
                    className="w-full h-[39px] text-black custom-select-placeholder"
                    style={{
                        color: 'black'
                    }}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    onChange={onChange}
                    options={
                        items?.map(item => ({
                            value: item.city_id.toString(),
                            label: item.city_name
                        })) || []
                    }
                />
            )}
        </div>
    );
};