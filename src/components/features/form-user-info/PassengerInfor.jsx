import React, { useState, useEffect, forwardRef } from 'react';
import { Checkbox } from 'antd';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PassengerInfo = forwardRef(({ seatCount, onPassengerDataChange, tripType, pickupDeparture, pickupReturn }, ref) => {
    const [passengers, setPassengers] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isOneForm, setIsOneForm] = useState(false);
    const [originalPassengers, setOriginalPassengers] = useState([]);

    // Initialize passengers when seatCount or tripType changes
    useEffect(() => {
        const initialPassengers = Array(seatCount).fill().map(() => ({
            firstname: '',
            lastname: '',
            phoneNumber: '',
            email: '',
            pickupLocation: '',
            returnPickupLocation: tripType === 'round-trip' ? '' : undefined
        }));
        setPassengers(initialPassengers);
        setOriginalPassengers(JSON.parse(JSON.stringify(initialPassengers)));
        setErrors(Array(seatCount).fill().map(() => ({})));
    }, [seatCount, tripType]);

    const handleChange = (index, field, value) => {
        let updatedPassengers;

        if (isOneForm) {
            updatedPassengers = passengers.map(passenger => ({
                ...passenger,
                [field]: value
            }));
        } else {
            updatedPassengers = [...passengers];
            updatedPassengers[index][field] = value;
        }

        setPassengers(updatedPassengers);

        // Clear error when user types
        if (errors[index]?.[field]) {
            const updatedErrors = [...errors];
            if (isOneForm) {
                updatedErrors.forEach(error => {
                    error[field] = '';
                });
            } else {
                updatedErrors[index][field] = '';
            }
            setErrors(updatedErrors);
        }

        if (onPassengerDataChange) {
            onPassengerDataChange(updatedPassengers);
        }
    };

    const handleOneFormToggle = (e) => {
        const checked = e.target.checked;
        setIsOneForm(checked);

        if (checked) {
            // Store current passengers before applying same details
            setOriginalPassengers([...passengers]);

            // Apply first passenger's details to all
            if (passengers.length > 0) {
                const firstPassenger = passengers[0];
                const updatedPassengers = passengers.map(() => ({ ...firstPassenger }));
                setPassengers(updatedPassengers);
                if (onPassengerDataChange) {
                    onPassengerDataChange(updatedPassengers);
                }
            }
        } else {
            // Restore original passengers with current pickup locations
            if (originalPassengers.length > 0) {
                const restoredPassengers = originalPassengers.map((passenger, index) => ({
                    ...passenger,
                    pickupLocation: passengers[index]?.pickupLocation || '',
                    returnPickupLocation: tripType === 'round-trip'
                        ? (passengers[index]?.returnPickupLocation || '')
                        : undefined
                }));

                setPassengers(restoredPassengers);
                if (onPassengerDataChange) {
                    onPassengerDataChange(restoredPassengers);
                }
            }
        }
    };

    const validatePassengers = () => {
        let isValid = true;
        const newErrors = passengers.map((passenger, index) => {
            const error = {};
            if (!passenger.firstname.trim()) {
                error.firstname = 'First name is required';
                isValid = false;
            }

            if (!passenger.lastname.trim()) {
                error.lastname = 'Last name is required';
                isValid = false;
            }

            if (index === 0) {
                if (!passenger.phoneNumber.trim()) {
                    error.phoneNumber = 'Phone number is required';
                    isValid = false;
                }

                if (!passenger.email.trim()) {
                    error.email = 'Email is required';
                    isValid = false;
                } else if (!/^\S+@\S+\.\S+$/.test(passenger.email)) {
                    error.email = 'Invalid email format';
                    isValid = false;
                }
            }
            return error;
        });

        setErrors(newErrors);

        if (!isValid) {
            setTimeout(() => {
                const firstErrorIndex = newErrors.findIndex(error => Object.keys(error).length > 0);
                if (firstErrorIndex >= 0) {
                    const firstErrorField = Object.keys(newErrors[firstErrorIndex])[0];
                    const element = document.getElementById(
                        isOneForm
                            ? `passenger-all-${firstErrorField}`
                            : `passenger-${firstErrorIndex}-${firstErrorField}`
                    );
                    if (element) {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                        element.focus();
                    }
                }
            }, 50);
        }

        return isValid;
    };

    React.useImperativeHandle(ref, () => ({
        validatePassengers,
        getPassengerData: () => passengers,
        isOneForm: isOneForm
    }));

    const renderPickupLocationSelect = (field, label, passengerIndex = 0) => (
        <div>
            <label className="block text-sm mb-1">
                {label} <span className="text-red-500">*</span>
            </label>
            <Select
                value={passengers[passengerIndex]?.[field] || ''}
                className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                onValueChange={(value) => handleChange(passengerIndex, field, value)}
            >
                <SelectTrigger
                    id={`passenger-${isOneForm ? 'all' : passengerIndex}-${field}`}
                    className="w-full p-3 bg-[#F8F7FD] border-none"
                >
                    <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-auto">
                    {
                        field == "pickupLocation" ? (<>
                            {pickupDeparture?.map((location) => (
                                <SelectItem key={location.id} value={location.id}>
                                    {location.title}
                                </SelectItem>
                            ))}
                        </>) : (<>
                            {pickupReturn.map((location) => (
                                <SelectItem key={location.id} value={location.id}>
                                    {location.title}
                                </SelectItem>
                            ))}
                        </>)
                    }

                </SelectContent>
            </Select>
            {errors[passengerIndex]?.[field] && (
                <p className="text-red-500 text-xs mt-1">{errors[passengerIndex][field]}</p>
            )}
        </div>
    );

    return (
        <div className="space-y-6 shadow-custom2 p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-4" id="travellerDetail">
                Traveller Details ({seatCount} {seatCount === 1 ? 'Passenger' : 'Passengers'})
            </h2>

            <div className="mb-4">
                <Checkbox
                    onChange={handleOneFormToggle}
                    checked={isOneForm}
                    className='text-medium font-semibold underline'
                >
                    Use same details for all passengers
                </Checkbox>
            </div>

            {isOneForm ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">
                            Firstname <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="passenger-all-firstname"
                            placeholder="John"
                            value={passengers[0]?.firstname || ''}
                            onChange={(e) => handleChange(0, 'firstname', e.target.value)}
                            className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                        />
                        {errors[0]?.firstname && (
                            <p className="text-red-500 text-xs mt-1">{errors[0].firstname}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="passenger-all-lastname"
                            placeholder="Doe"
                            value={passengers[0]?.lastname || ''}
                            onChange={(e) => handleChange(0, 'lastname', e.target.value)}
                            className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                        />
                        {errors[0]?.lastname && (
                            <p className="text-red-500 text-xs mt-1">{errors[0].lastname}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="passenger-all-phoneNumber"
                            placeholder="012 345 678"
                            value={passengers[0]?.phoneNumber || ''}
                            onChange={(e) => handleChange(0, 'phoneNumber', e.target.value)}
                            className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                        />
                        {errors[0]?.phoneNumber && (
                            <p className="text-red-500 text-xs mt-1">{errors[0].phoneNumber}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="passenger-all-email"
                            placeholder="example@gmail.com"
                            value={passengers[0]?.email || ''}
                            onChange={(e) => handleChange(0, 'email', e.target.value)}
                            className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                        />
                        {errors[0]?.email && (
                            <p className="text-red-500 text-xs mt-1">{errors[0].email}</p>
                        )}
                    </div>

                    {renderPickupLocationSelect('pickupLocation', 'Departure Pickup Location')}

                    {tripType === 'round-trip' && (
                        renderPickupLocationSelect('returnPickupLocation', 'Return Pickup Location')
                    )}
                </div>
            ) : (
                passengers.map((passenger, index) => (
                    <div key={index} className="space-y-4 border-b pb-4 mb-4 last:border-b-0">
                        <h3 className="font-medium">Passenger {index + 1}</h3>

                        <div>
                            <label className="block text-sm mb-1">
                                First name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id={`passenger-${index}-firstname`}
                                placeholder="John"
                                value={passenger.firstname}
                                onChange={(e) => handleChange(index, 'firstname', e.target.value)}
                                className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                            />
                            {errors[index]?.firstname && (
                                <p className="text-red-500 text-xs mt-1">{errors[index].firstname}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm mb-1">
                                Last name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id={`passenger-${index}-lastname`}
                                placeholder="Doe"
                                value={passenger.lastname}
                                onChange={(e) => handleChange(index, 'lastname', e.target.value)}
                                className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                            />
                            {errors[index]?.lastname && (
                                <p className="text-red-500 text-xs mt-1">{errors[index].lastname}</p>
                            )}
                        </div>

                        {index === 0 && (
                            <>
                                <div>
                                    <label className="block text-sm mb-1">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id={`passenger-${index}-phoneNumber`}
                                        placeholder="012 345 678"
                                        value={passenger.phoneNumber}
                                        onChange={(e) => handleChange(index, 'phoneNumber', e.target.value)}
                                        className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                                    />
                                    {errors[index]?.phoneNumber && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].phoneNumber}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id={`passenger-${index}-email`}
                                        placeholder="example@gmail.com"
                                        value={passenger.email}
                                        onChange={(e) => handleChange(index, 'email', e.target.value)}
                                        className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                                    />
                                    {errors[index]?.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].email}</p>
                                    )}
                                </div>

                                {renderPickupLocationSelect('pickupLocation', 'Departure Pickup Location', index)}

                                {tripType === 'round-trip' && (
                                    renderPickupLocationSelect('returnPickupLocation', 'Return Pickup Location', index)
                                )}
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
});

export default PassengerInfo;