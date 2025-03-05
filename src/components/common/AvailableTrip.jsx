"use client";


import {
    Bus,
    Armchair,
    CreditCard,
    Clock,
    Coffee,
    MapPin,
    Wifi,
    Monitor,
    Wind,
    TableIcon,
    RockingChair,
    MapPinCheckInside,
    Tag,
    Building2,
    User,
    BusFront,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const AvailableTripItems = ({ trips, cities = [] }) => {

    const [activeStep, setActiveStep] = useState('select');
    const [routeSelected, setRouteSelected] = useState();
    const router = useRouter();
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("khqr");

    const handleTripSelect = (trip) => {
        console.log('trip: ', trip);

        setActiveStep("seat")
        setRouteSelected(trip);
    };

    const handleSeatSelect = (seatSelected) => {
        console.log('selected : ', seatSelected);
        
        setRouteSelected((prevRouteSelected) => {
          const updatedSeats = prevRouteSelected.allSeat.map((seat) => {
            console.log('t.seat_id === seatSelected?.seatId: ', seat.seat_id === seatSelected?.seat_id);
            
            if (seat.seat_id === seatSelected?.seat_id) {
              return {
                ...seat,
                status: seat.status === 'available' ? 'selected' : 'available'
              };
            }
            return seat;
          });
      
          return {
            ...prevRouteSelected,
            allSeat: updatedSeats
          };
        });
      };

    const handleSeatConfirm = () => {
        if (selectedSeat) {
            setActiveStep("pay");
        } else {
            toast.error("Please select a seat");
        }
    };

    const handlePay = () => {
        router.push("/success");
    };
    const Seat = ({ number, status, onClick }) => {
        const getStatusColor = () => {
            switch (status) {
                case "available":
                    return "bg-gray-300 hover:bg-gray-400 text-white cursor-pointer";
                case "reserved":
                    return "bg-red-500 text-white cursor-not-allowed";
                case "selected":
                    return "bg-blue-600 text-white cursor-pointer";
                default:
                    return "";
            }
        };

        return (
            <button
                onClick={onClick}
                className={`w-16 h-16 flex items-center justify-center rounded-lg ${getStatusColor()}`}
                disabled={status === "reserved"}
            >
                <div className="flex flex-col items-center">
                    <RockingChair className="w-8 h-8" />
                    <span className="text-xs font-medium">{number}</span>
                </div>
            </button>
        );
    };

    function addHoursToTime(timeString, timeToAddString) {
        const hoursToAdd = parseInt(timeToAddString, 10);

        const [time, period] = timeString?.split(" ");
        const [hour, minute] = time?.split(":");

        let hour24 = parseInt(hour, 10);
        if (period === "PM" && hour24 !== 12) {
            hour24 += 12;
        } else if (period === "AM" && hour24 === 12) {
            hour24 = 0;
        }

        const date = new Date(1970, 0, 1, hour24, minute);

        date.setHours(date.getHours() + hoursToAdd);

        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        const newTimeString = date.toLocaleTimeString('en-US', options);

        return newTimeString;
    }

    if (activeStep === "select") {
        return (
            <div>
                <h1 className="text-xl font-semibold mb-6">
                    Available Trips ({trips?.length})
                </h1>
                <div className="space-y-4">
                    {trips?.map((trip, index) => (
                        <div
                            key={index}
                            className="p-6 flex mb-7 justify-between items-start cursor-pointer hover:shadow-lg transition-shadow border rounded-lg"
                            onClick={() => handleTripSelect(trip)}
                        >
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-medium">
                                        {trip?.bus_type?.bus_type}
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="bg-primary ml-2 text-white hover:bg-blue-700"
                                        >
                                            ${trip?.price}
                                        </Button>
                                    </h3>

                                    <div className="text-right">
                                        <span className="text-seatColor text-sm font-semibold">
                                            {trip?.seatAvalable.length} Seats Left
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3 text-secondary mb-4">
                                    <Wifi className="w-4 h-4" />
                                    <Coffee className="w-4 h-4" />
                                    <Monitor className="w-4 h-4" />
                                    <Wind className="w-4 h-4" />
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="text-gray-700 font-medium">
                                                {/* {trip?.timings?.meta_value || 'no'} */}
                                            </div>
                                            <div className="text-lg font-semibold text-gray-900">
                                                {trip?.timings?.meta_value || 'no'}
                                            </div>
                                            <div className="text-sm text-gray-500">{trip?.origin?.city_name || ''}</div>
                                        </div>
                                    </div>

                                    <Bus className="w-5 h-5 text-secondary ml-2" />
                                    <div className="flex-1 px-4 relative">
                                        <div className="text-center mt-6 text-sm text-gray-500">
                                            {trip.duration}
                                        </div>
                                        <div className="absolute  inset-x-0 top-11 border-t  border-red-200"></div>
                                        <div className="text-center text-sm text-gray-500">
                                            {trip?.kilo_meters} KM
                                        </div>
                                    </div>
                                    <div className="flex   items-center text-right">
                                        <MapPin className="w-5 h-5 text-secondary mr-2" />
                                        <div>
                                            <div className="text-gray-700 font-medium">
                                                {trip.date || 'no'}
                                            </div>
                                            <div className="text-lg font-semibold text-gray-900">
                                                {trip.timings?.meta_value ? addHoursToTime(trip?.timings?.meta_value, trip?.duration) : '' || 'no'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {trip?.destination?.city_name || ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (activeStep === "seat") {
        return (
            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 shadow-custom rounded-lg md:col-span-1">
                    <div className="grid grid-cols-3 ml-8 gap-4">
                        {routeSelected?.allSeat.map((seat, index) => (
                            <Seat
                                key={index}
                                {...seat}
                                onClick={() => handleSeatSelect(seat)}
                            />
                        ))}
                    </div>
                    <div className="mt-6 flex justify-around gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-300" />
                            <span className="text-sm text-gray-600">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-sm text-gray-600">Reserved</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-600" />
                            <span className="text-sm text-gray-600">Selected</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8 md:mt-0 space-y-6 md:col-span-2">
                    <div className="p-6 shadow-custom rounded-lg">
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-semibold">Trip Details</h2>
                                    <span className="text-pink-600 font-bold">
                                        Seat Number: [ {selectedSeat?.map((item, index) => (<span key={index}>{item?.seat_id} , </span>)) || "-"} ]
                                    </span>
                                </div>
                                <h3 className="text-lg mt-2">{trips[0].title}</h3>
                                <div className="flex gap-4 mt-4">
                                    <Wifi className="w-5 h-5 text-orange-400" />
                                    <TableIcon className="w-5 h-5 text-orange-400" />
                                    <Coffee className="w-5 h-5 text-orange-400" />
                                    <RockingChair className="w-5 h-5 text-orange-400" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-md font-medium">{trips[0].date || 'no'}</div>
                                        <div className="text-lg font-bold">{routeSelected?.timings?.meta_value || 'no'}</div>
                                        <div className="text-gray-600">{routeSelected?.origin?.city_name}</div>
                                        <div className="text-gray-600">{trips[0].from || 'no'}</div>
                                    </div>
                                    <Bus className="w-5 h-5 mt-8 text-secondary ml-6 mr-6 " />
                                    <div className="flex-1 px-4 relative">
                                        <div className="text-center mt-6 text-sm text-gray-500">
                                            {trips[0].duration || 'duration'}
                                        </div>
                                        <div className="absolute inset-x-0 top-11 border-t border-gray-300"></div>
                                        <div className="text-center text-sm text-gray-500">
                                            {trips[0].distance || 'duration'}
                                        </div>
                                    </div>
                                    <MapPinCheckInside className="w-5 mt-8 h-5 text-secondary ml-6 mr-6" />
                                    <div className="text-right">
                                        <div className="text-md font-medium">{trips[0].date || 'date'}</div>
                                        <div className="text-lg font-bold">{addHoursToTime(routeSelected?.timings?.meta_value, routeSelected?.duration) || 'no'}</div>
                                        <div className="text-gray-600">{routeSelected?.destination?.city_name}</div>
                                        <div className="text-gray-600">{trips[0].to}</div>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="w-32 text-primary border-primary"
                                onClick={handleTripSelect}
                            >
                                Change Trip
                            </Button>
                        </div>
                    </div>
                    <div className="bg-white rounded-md p-6 shadow-custom2">
                        <h2 className="text-xl font-semibold mb-4">Bill details</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Base Ticket Fare</span>
                                <span>${routeSelected?.price}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Travellers</span>
                                <span>{selectedSeat?.length}</span>
                            </div>
                            <div className="flex justify-between font-medium pt-3 border-t">
                                <span>Total Charge</span>
                                <span>${selectedSeat?.length * (Number(routeSelected?.price))}</span>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={handleSeatConfirm}
                        className="w-full bg-primary hover:bg-primary text-lg py-6"
                    >
                        Confirm Seat
                    </Button>
                </div>

                <Button
                    variant="outline"
                    className="mb-6"
                    onClick={() => setActiveStep("select")}
                >
                    Back
                </Button>
            </div>
        );
    } else if (activeStep === "pay") {
        return (
            <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-6 md:col-span-1">
                    <div className="space-y-4 shadow-custom2 p-6 rounded-md">
                        <h2 className="text-xl font-semibold mb-4">Traveller Details</h2>
                        <div>
                            <label className="block text-sm mb-1">
                                Fullname <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="012 345 678"
                                className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                className="w-full p-3 rounded-md bg-[#F8F7FD] border-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">
                                Pickup Origin <span className="text-red-500">*</span>
                            </label>
                            <Select>
                                <SelectTrigger className="w-full p-3 bg-[#F8F7FD] border-none">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="location1">Location 1</SelectItem>
                                    <SelectItem value="location2">Location 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="border-2 border-dashed shadow-custom2 p-6 rounded-md border-pay">
                        <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
                        <div className="space-y-3">
                            <div
                                className={`flex items-center justify-between p-4 rounded-lg border ${paymentMethod === "khqr"
                                    ? "border-primary"
                                    : "border-gray-200"
                                    } cursor-pointer`}
                                onClick={() => setPaymentMethod("khqr")}
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "khqr"}
                                        onChange={() => setPaymentMethod("khqr")}
                                        className="w-4 h-4 text-primary"
                                    />
                                    <div>
                                        <div className="font-semibold">KHQR</div>
                                        <div className="text-sm text-Description">
                                            Scan to pay with any banking app.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`flex items-center justify-between p-4 rounded-lg border ${paymentMethod === "card"
                                    ? "border-primary"
                                    : "border-gray-200"
                                    } cursor-pointer`}
                                onClick={() => setPaymentMethod("card")}
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "card"}
                                        onChange={() => setPaymentMethod("card")}
                                        className="w-4 h-4 text-primary"
                                    />
                                    <div>
                                        <div className="font-semibold">Credit/Debit Card</div>
                                        <div className="flex gap-2 mt-1">
                                            <div className="w-10 h-6 bg-[#1A1F71] rounded" />
                                            <div className="w-10 h-6 bg-[#FF5F00] rounded" />
                                            <div className="w-10 h-6 bg-[#00A1DF] rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full ">
                        <Button
                            variant="outline"
                            onClick={() => setActiveStep("seat")}
                            className="w-full"
                        >
                            Back
                        </Button>
                    </div>
                </div>

                <div className="space-y-6 md:col-span-2">
                    <div className="bg-white rounded-md p-6 shadow-custom2">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-semibold">Trip Details</h2>
                            <span className="text-seatColor">
                                Seat Number {selectedSeat || "-"}
                            </span>
                        </div>
                        <h3 className="text-lg mb-3">{trips[0].title}</h3>
                        <div className="flex gap-3 mb-6">
                            <Wifi className="w-5 h-5 text-secondary" />
                            <Building2 className="w-5 h-5 text-secondary" />
                            <User className="w-5 h-5 text-secondary" />
                            <MapPin className="w-5 h-5 text-secondary" />
                            <Clock className="w-5 h-5 text-secondary" />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                <div className="text-md font-medium">{trips[0].time || 'no'}</div>
                                <div className="text-gray-500">{trips[0].date || 'no'}</div>
                                <BusFront className="w-5 h-5 absolute top-9 right-0 text-secondary" />
                                <div className="mt-1">{routeSelected?.origin?.city_name}</div>
                                <div className="text-gray-500">{trips[0].from || 'no'}</div>
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                                <div className="text-sm text-gray-500">
                                    {trips[0].duration}
                                </div>
                                <div className="w-full h-px bg-gray-200 my-2" />
                                <div className="text-sm text-gray-500">
                                    {trips[0].distance}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="text-md font-medium">1:00 PM</div>
                                <div className="text-gray-500">{trips[0].date || 'no'}</div>
                                <MapPinCheckInside className="w-5 h-5 absolute top-9 right-32 text-secondary" />
                                <div className="mt-1">{routeSelected?.destination?.city_name}</div>
                                <div className="text-gray-500">{trips[0].to || 'no'}</div>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-32 text-primary border-primary"
                        >
                            Change Trip
                        </Button>
                    </div>
                    <div className="border-2 border-dashed border-primary rounded-md shadow-custom2 p-6">
                        <h2 className="text-xl font-semibold mb-4">Offers</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-primary" />
                                    <span>50% off up to ₹100 | Use code BOOKNOW</span>
                                </div>
                                <Button variant="link" className="text-primary font-medium">
                                    Apply
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-primary" />
                                    <span>20% off | Use code FIRSTTIME</span>
                                </div>
                                <Button variant="link" className="text-primary font-medium">
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-custom2">
                        <div className="flex items-center gap-3">
                            <Tag className="w-5 h-5 text-primary" />
                            <span className="font-medium">Apply Code</span>
                            <input
                                type="text"
                                placeholder="Enter Code"
                                className="flex-1 border-none bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-md p-6 shadow-custom2">
                        <h2 className="text-xl font-semibold mb-4">Bill details</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Base Ticket Fare</span>
                                <span>$15</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Travellers</span>
                                <span>1</span>
                            </div>
                            <div className="flex justify-between font-medium pt-3 border-t">
                                <span>Total Charge</span>
                                <span>$15</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={handlePay}
                        className="w-full bg-primary hover:bg-primary text-white py-6 text-lg"
                    >
                        Pay
                    </Button>
                </div>
            </div>
        );
    }
}