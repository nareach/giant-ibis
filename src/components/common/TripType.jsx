"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


export const TripTypeComponent = ({ onChange }) => {

    return (
        <div className="lg:col-span-1">
            <Label className="block text-sm font-normal text-label pb-3">
                Trip Type
            </Label>
            <RadioGroup
                defaultValue="one-way"
                className="space-y-2"
                onValueChange={onChange}
            >
                <Label className="flex items-center font-normal space-x-2">
                    <RadioGroupItem
                        value="one-way"
                        id="one-way"
                        className="text-secondary"
                    />
                    <span>One Way</span>
                </Label>
                <Label className="flex items-center font-normal pb-1 text-label space-x-2">
                    <RadioGroupItem
                        value="round-trip"
                        id="round-trip"
                        className="text-secondary "
                    />
                    <span>Round Trip</span>
                </Label>
            </RadioGroup>
        </div>
    );
};