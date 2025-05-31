'use client'

import React, { useState } from 'react';
import { Dropdown, InputNumber, Button } from 'antd';
import { User } from 'lucide-react';
import { Label } from '@radix-ui/react-label';

export default function SelectPassengerCount({ onChange, defaultPassenger = 0, isError }) {
    const [passengerCount, setPassengerCount] = useState(defaultPassenger);

    const updateCount = (newCount) => {
        setPassengerCount(newCount);
        if (typeof onChange === 'function') {
            onChange(newCount);
        }
    };

    const handleIncrease = () => {
        updateCount(passengerCount + 1);
    };

    const handleDecrease = () => {
        updateCount(Math.max(0, passengerCount - 1));
    };

    const handleInputChange = (value) => {
        updateCount(value ?? 0);
    };

    const dropdownContent = (
        <div className="p-4 w-52 bg-white border border-gray-200 rounded-md">
            <div className="mb-2 text-center font-medium">Passengers</div>
            <div className="flex items-center justify-between mb-3">
                <Button onClick={handleDecrease}>-</Button>
                <InputNumber
                    min={0}
                    value={passengerCount}
                    onChange={handleInputChange}
                    className="text-center"
                />
                <Button onClick={handleIncrease}>+</Button>
            </div>
        </div>
    );

    return (
        <div>
            <Label
                htmlFor="departureDate"
                className="block text-sm font-normal pb-1 text-label mb-2"
            >
                Passengers
            </Label>
            <Dropdown
                dropdownRender={() => dropdownContent}
                trigger={['click']}
                className="bg-white"
            >
                <div className="cursor-pointer h-10 w-44 border border-gray-200 rounded-md text-center flex justify-center items-center space-x-2 hover:shadow-sm">
                    <span>{passengerCount} Passengers</span>
                    <User size={16} />
                </div>
            </Dropdown>
            {
                isError ? (<span className="text-red-500 mt-3 text-[14px]">Passengers is required.</span>) : ''
            }
        </div>
    );
}
