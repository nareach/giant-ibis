"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchBookForm from "./HeroBookForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";

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

export default function BusBookingFlow() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState("select");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("khqr");

  const trips = [
    {
      id: 1,
      title: "Universe Noble-37 (Mini Van 15 Seats)",
      price: 15,
      time: "08:45 AM",
      date: "Nov 16",
      from: "Phnom Penh",
      to: "Battambang",
      seatsLeft: 9,
      duration: "5 hours",
      distance: "295 KM",
    },
    {
      id: 2,
      title: "Galaxy Explorer-15 (Bus 40 Seats)",
      price: 20,
      time: "09:30 AM",
      date: "Nov 17",
      from: "Phnom Penh",
      to: "Siem Reap",
      seatsLeft: 12,
      duration: "6 hours",
      distance: "320 KM",
    },
    {
      id: 3,
      title: "Cosmos Cruiser-21 (Coach 30 Seats)",
      price: 18,
      time: "10:15 AM",
      date: "Nov 18",
      from: "Phnom Penh",
      to: "Sihanoukville",
      seatsLeft: 8,
      duration: "4.5 hours",
      distance: "270 KM",
    },
  ];

  const seats = [
    { number: 1, status: "available" },
    { number: 2, status: "reserved" },
    { number: 3, status: "reserved" },
    { number: 4, status: "reserved" },
    { number: 5, status: "reserved" },
    { number: 6, status: "available" },
    { number: 7, status: "reserved" },
    { number: 8, status: "reserved" },
    { number: 9, status: "reserved" },
    { number: 10, status: "reserved" },
    { number: 11, status: "available" },
    { number: 12, status: "available" },
    { number: 13, status: "available" },
    { number: 14, status: "available" },
    { number: 15, status: "available" },
    { number: 16, status: "available" },
    { number: 17, status: "available" },
    { number: 18, status: "available" },
    { number: 19, status: "available" },
  ];

  const handleTripSelect = () => {
    setActiveStep("seat");
  };

  const handleSeatSelect = (seat) => {
    if (seat.status === "available") {
      setSelectedSeat(seat.number);
    }
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
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-4 my-12 mx-4">
        <div className="flex flex-col items-center gap-2 m-2">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-sm ${
              activeStep === "select"
                ? "bg-primary text-white"
                : "border border-primary text-primary"
            }`}
          >
            <Bus className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <span className="text-xs sm:text-sm  text-Textcolor">Select</span>
        </div>
        <div className="w-36 h-[2px] bg-gray-200 hidden sm:block" />

        <div className="flex flex-col items-center gap-2 m-2">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${
              activeStep === "seat"
                ? "bg-primary text-white"
                : "border border-primary text-primary"
            }`}
          >
            <Armchair className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <span className="text-xs sm:text-sm text-Textcolor">Select Seat</span>
        </div>
        <div className="w-36 h-[2px] bg-gray-200 hidden sm:block" />
        <div className="flex flex-col items-center gap-2 m-2">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${
              activeStep === "pay"
                ? "bg-primary text-white"
                : "border border-primary text-primary"
            }`}
          >
            <CreditCard className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <span className="text-xs sm:text-sm text-Textcolor">Pay</span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (activeStep === "select") {
      return (
        <div>
          <h1 className="text-xl font-semibold mb-6">
            Available Trips ({trips.length})
          </h1>
          <div className="space-y-4">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="p-6 flex mb-7 justify-between items-start cursor-pointer hover:shadow-lg transition-shadow border rounded-lg"
                onClick={handleTripSelect}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">
                      {trip.title}
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-primary ml-2 text-white hover:bg-blue-700"
                      >
                        ${trip.price}
                      </Button>
                    </h3>

                    <div className="text-right">
                      <span className="text-seatColor text-sm font-semibold">
                        {trip.seatsLeft} Seats Left
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
                          {trip.date}
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {trip.time}
                        </div>
                        <div className="text-sm text-gray-500">{trip.from}</div>
                      </div>
                    </div>

                    <Bus className="w-5 h-5 text-secondary ml-2" />
                    <div className="flex-1 px-4 relative">
                      <div className="text-center mt-6 text-sm text-gray-500">
                        {trip.duration}
                      </div>
                      <div className="absolute  inset-x-0 top-11 border-t  border-red-200"></div>
                      <div className="text-center text-sm text-gray-500">
                        {trip.distance}
                      </div>
                    </div>
                    <div className="flex   items-center text-right">
                      <MapPin className="w-5 h-5 text-secondary mr-2" />
                      <div>
                        <div className="text-gray-700 font-medium">
                          {trip.date}
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          1:00 PM
                        </div>
                        <div className="text-sm text-gray-500">{trip.to}</div>
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
              {seats.map((seat) => (
                <Seat
                  key={seat.number}
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
                      Seat Number {selectedSeat || "-"}
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
                      <div className="text-md font-medium">{trips[0].date}</div>
                      <div className="text-lg font-bold">{trips[0].time}</div>
                      <div className="text-gray-600">Bat Chum Villa Hotel</div>
                      <div className="text-gray-600">{trips[0].from}</div>
                    </div>
                    <Bus className="w-5 h-5 mt-8 text-secondary ml-6 mr-6 " />
                    <div className="flex-1 px-4 relative">
                      <div className="text-center mt-6 text-sm text-gray-500">
                        {trips[0].duration}
                      </div>
                      <div className="absolute inset-x-0 top-11 border-t border-gray-300"></div>
                      <div className="text-center text-sm text-gray-500">
                        {trips[0].distance}
                      </div>
                    </div>
                    <MapPinCheckInside className="w-5 mt-8 h-5 text-secondary ml-6 mr-6" />
                    <div className="text-right">
                      <div className="text-md font-medium">{trips[0].date}</div>
                      <div className="text-lg font-bold">1:00 PM</div>
                      <div className="text-gray-600">City Lodge Hotel</div>
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
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    paymentMethod === "khqr"
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
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    paymentMethod === "card"
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
                  <div className="text-md font-medium">{trips[0].time}</div>
                  <div className="text-gray-500">{trips[0].date}</div>
                  <BusFront className="w-5 h-5 absolute top-9 right-0 text-secondary" />
                  <div className="mt-1">Bat Chum Villa Hotel</div>
                  <div className="text-gray-500">{trips[0].from}</div>
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
                  <div className="text-gray-500">{trips[0].date}</div>
                  <MapPinCheckInside className="w-5 h-5 absolute top-9 right-32 text-secondary" />
                  <div className="mt-1">City Lodge Hotel</div>
                  <div className="text-gray-500">{trips[0].to}</div>
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
  };

  return (
    <div className="">
          <SearchBookForm />
    </div>
  );
}
