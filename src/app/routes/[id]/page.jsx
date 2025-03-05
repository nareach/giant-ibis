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

const page = ({id}) => {
  return (
    <div>
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
    </div>
  )
}

export default page
