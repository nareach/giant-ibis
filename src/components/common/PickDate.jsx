import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export const PickDateFilter = ({ title, onChange }) => {
    return (
        <div className="lg:col-span-2">
            <Label
                htmlFor="departureDate"
                className="block text-sm font-normal pb-1 text-label mb-2"
            >
                {title}  {/* Use the passed title prop */}
            </Label>
            <Input
                type="date"
                id="departureDate"
                className="w-full"
                onChange={onChange}
            />
        </div>
    );
}
