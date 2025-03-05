"use client";

import React from "react";
import {
  Wifi,
  TableIcon,
  Coffee,
  RockingChair,
  MapPin,
  Monitor,
  CreditCard,
  Bus,
  MapPinCheckInside,
  Armchair,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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

export default function BusBooking() {
  const router = useRouter();
  const seats = [
    { number: 1, status: "selected" },
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
  ];
  const handleBookNow = () => {
    router.push("/pay");
  };

  return (
    <div className="min-h-screen bg-mainbg p-4 md:p-8">
      <div className="flex flex-wrap justify-center items-center gap-4 mt-24 mb-14">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center text-sm">
            <Bus className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-gray-700">Select</span>
        </div>
        <div className="w-24 h-px bg-gray-200 hidden sm:block" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border bg-primary text-white flex items-center justify-center">
            <Armchair className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-gray-700">Select Seat</span>
        </div>
        <div className="w-24 h-px bg-gray-200 hidden sm:block" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center">
            <CreditCard className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-gray-700">Pay</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="p-6   shadow-custom rounded-lg  md:col-span-1">
          <div className="grid grid-cols-3 gap-4">
            {seats.map((seat) => (
              <Seat key={seat.number} {...seat} />
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
          <div className="p-6  shadow-custom rounded-lg ">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">Trip Details</h2>
                  <span className="text-pink-600 font-bold">Seat Number 1</span>
                </div>
                <h3 className="text-lg mt-2">
                  Universe Noble-37 (Mini Van 15 Seats)
                </h3>
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
                    <div className="text-md font-medium">Nov 16</div>
                    <div className="text-lg font-bold">08:45 AM</div>
                    <div className="text-gray-600">Bat Chum Villa Hotel</div>
                    <div className="text-gray-600">Phnom Penh</div>
                  </div>

                  <Bus className="w-5 h-5 mt-8 text-secondary mr-2" />

                  <div className="flex-1 px-4 relative">
                    <div className="text-center mt-6 text-sm text-gray-500">
                      5 hours
                    </div>
                    <div className="absolute inset-x-0 top-11 border-t border-gray-300"></div>
                    <div className="text-center text-sm text-gray-500">
                      295 KM
                    </div>
                  </div>
                  <MapPinCheckInside className="w-5  mt-8 h-5 text-secondary ml-2" />

                  <div className="text-right">
                    <div className="text-md font-medium">Nov 16</div>
                    <div className="text-lg font-bold">1:00 PM</div>
                    <div className="text-gray-600">City Lodge Hotel</div>
                    <div className="text-gray-600">Battambang</div>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-32 border-primary text-primary"
              >
                Change Trip
              </Button>
            </div>
          </div>

          <div className="border-t-2  shadow-custom rounded-lg   text-Description  "></div>
          <div className="border-t pt-6  shadow-custom rounded-lg   p-6 space-y-4">
            <h3 className="text-xl font-semibold">Bill details</h3>
            <div className="flex justify-between">
              <span className="text-gray-600">Base Ticket Fare</span>
              <span className="font-medium">$15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Travellers</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Charge</span>
              <span>$45</span>
            </div>
          </div>
          <Button
            onClick={handleBookNow}
            className="w-full  bg-primary hover:bg-primary text-lg py-6"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
