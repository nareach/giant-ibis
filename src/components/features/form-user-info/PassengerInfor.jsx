import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { Checkbox, Select } from 'antd';
import './passengerInfor.css'
import NotificationPopup from '../modal/NotificationPopup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { isValidPhoneNumber } from 'libphonenumber-js';

const PassengerInfo = forwardRef(({ seatCount, onPassengerDataChange, tripType, pickupDeparture, pickupReturn, allowedpickUpDeparture, allowedpickUpReturn }, ref) => {
    const [passengers, setPassengers] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isOneForm, setIsOneForm] = useState(false);
    const [originalPassengers, setOriginalPassengers] = useState([]);
    const [allowNotificationOnce, setAllowNotificationOnce] = useState(false);
    const notificationRef = useRef();


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
        console.log("value");

        let updatedPassengers;
        console.log("change: ", { index, field, value });

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
                const raw = passengers[0]?.phoneNumber;
                const phoneWithPlus = raw.startsWith('+') ? raw : `+${raw}`;
                
                if (!passenger.phoneNumber.trim() || !isValidPhoneNumber(phoneWithPlus)) {
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

    const handleShowNotificationOnece = () => {

        if (!allowNotificationOnce) {
            setAllowNotificationOnce(true);
            notificationRef.current?.openModal();
        }
    }

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

            {
                field == "pickupLocation" ? (
                    <Select
                        showSearch
                        placeholder={`${label}`}
                        optionFilterProp="label"
                        onClick={handleShowNotificationOnece}
                        allowClear
                        className="w-full h-[43px] custom-select-placeholder"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        onChange={(value) => handleChange(passengerIndex, field, value)}
                        options={
                            pickupDeparture?.map(item => ({
                                value: item.id,
                                label: item.title
                            })) || []
                        }
                    />
                ) : (<>
                    <Select
                        showSearch
                        allowClear
                        placeholder={`${label}`}
                        onClick={handleShowNotificationOnece}
                        optionFilterProp="label"
                        className="w-full h-[43px] custom-select-placeholder"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        onChange={(value) => handleChange(passengerIndex, field, value)}
                        options={
                            pickupReturn?.map(item => ({
                                value: item.id,
                                label: item.title
                            })) || []
                        }
                    />
                </>)
            }
            {errors[passengerIndex]?.[field] && (
                <p className="text-red-500 text-xs mt-1">{errors[passengerIndex][field]}</p>
            )}
        </div>
    );

    return (
        <div className="space-y-6 shadow-custom2 p-6 rounded-md">
            <NotificationPopup ref={notificationRef} />

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
                        <p className="font-medium">Contact Details</p>
                        <div className='h-[2px] rounded-full bg-primary w-full'>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            Phone Number <span className="text-red-500">*</span>
                        </label>

                        <PhoneInput
                            country={'kh'}

                            value={passengers[0]?.phoneNumber || ''}
                            onChange={(value) => {
                                console.log("phone number: ", value);
                                handleChange(0, 'phoneNumber', value)
                            }}
                            inputProps={{
                                required: true,
                            }}
                            inputClass="!w-full !py-4 !pl-16 !text-base !border border-gray-300 !rounded-md"
                            buttonClass="!border-r border-gray-300 !px-2"
                            containerClass="!w-full"
                            dropdownClass="!text-black !max-h-60 overflow-y-auto"
                            searchClass="!border !border-gray-300 !rounded-md !px-2 !py-1 !my-2"
                            countryCodeEditable={false}
                            enableSearch={true}
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

                    {
                        allowedpickUpDeparture && (
                            renderPickupLocationSelect('pickupLocation', 'Departure Pickup Location')
                        )
                    }

                    {tripType === 'round-trip' && allowedpickUpReturn && (
                        renderPickupLocationSelect('returnPickupLocation', 'Return Pickup Location')
                    )}


                    <div className='pt-6'>
                        <p className="font-medium">Main Passenger</p>
                        <div className='h-[2px] rounded-full bg-primary w-full'>
                        </div>
                    </div>

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

                </div>
            ) : (
                passengers.map((passenger, index) => (
                    <div key={index} className="space-y-4 border-b pb-4 mb-4 last:border-b-0">


                        {index === 0 && (
                            <>
                                <div className='pt-6'>
                                    <p className="font-medium">Contact Detail</p>
                                    <div className='h-[2px] rounded-full bg-primary w-full'>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>

                                    <PhoneInput
                                        country={'kh'}
                                        value={passenger.phoneNumber}
                                        onChange={(value) => handleChange(index, 'phoneNumber', value)}
                                        inputClass="!w-full !py-4 !pl-16 !text-base !border border-gray-300 !rounded-md"
                                        buttonClass="!border-r border-gray-300 !px-2"
                                        containerClass="!w-full"
                                        dropdownClass="!text-black !max-h-60 overflow-y-auto"
                                        searchClass="!border !border-gray-300 !rounded-md !px-2 !py-1 !my-2"
                                        countryCodeEditable={false}
                                        enableSearch={true}
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
                                {
                                    allowedpickUpDeparture && renderPickupLocationSelect('pickupLocation', 'Departure Pickup Location', index)
                                }

                                {tripType === 'round-trip' && allowedpickUpReturn && (
                                    renderPickupLocationSelect('returnPickupLocation', 'Return Pickup Location', index)
                                )}
                            </>
                        )}


                        <div className='pt-6'>
                            <p className="font-medium">{index == 0 ? 'Main Passenger' : `Passenger ${index + 1}`}</p>
                            <div className='h-[2px] rounded-full bg-primary w-full'>
                            </div>
                        </div>

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


                    </div>
                ))
            )}
        </div>
    );
});

export default PassengerInfo;