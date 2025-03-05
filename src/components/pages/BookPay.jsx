"use client";

import { useState } from "react";
import {
  MapPin,
  Wifi,
  ChevronDown,
  Tag,
  Clock,
  Building2,
  User,
  Monitor,
  CreditCard,
  BusFront,
  MapPinCheckInside,
  Bus,
  Armchair,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function TravelBooking() {
  const [paymentMethod, setPaymentMethod] = useState("khqr");

  const router = useRouter();

  const handlePay = () => {
    router.push("/success");
  };

  return (
    <div className="bg-mainbg container mx-auto p-6 py-28 max-w-7xl">
      <div className="flex flex-wrap justify-center items-center gap-4  mt-9 mb-14">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border  border-primary text-primary   flex items-center justify-center text-sm">
            <Bus className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-Textcolor">Select</span>
        </div>
        <div className="w-24 h-px bg-gray-200 hidden sm:block" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center">
            <Armchair className="w-4 h-4" />
          </div>
          <span className="text-sm text-Textcolor">Select Seat</span>
        </div>
        <div className="w-24 h-px bg-gray-200 hidden sm:block" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border bg-primary text-white border-primary flex items-center justify-center">
            <CreditCard className="w-4 h-4" />
          </div>
          <span className="text-sm text-Textcolor">Pay</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-6  md:col-span-1">
          <div className=" ">
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
          </div>
          <div className="border-2 border-dashed shadow-custom2 p-6 rounded-md border-pay ">
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
        </div>

        <div className="space-y-6 md:col-span-2">
          <div className="bg-white rounded-md p-6 shadow-custom2">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Trip Details</h2>
              <span className="text-seatColor">Seat Number 1</span>
            </div>
            <h3 className="text-lg mb-3">
              Universe Noble-37 (Mini Van 15 Seats)
            </h3>
            <div className="flex gap-3 mb-6">
              <Wifi className="w-5 h-5 text-secondary" />
              <Building2 className="w-5 h-5 text-secondary" />
              <User className="w-5 h-5 text-secondary" />
              <MapPin className="w-5 h-5 text-secondary" />
              <Clock className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className=" relative">
                <div className="text-md font-medium">08:45 AM</div>
                <div className="text-gray-500">Nov 16</div>
                <BusFront className="w-5 h-5 absolute  top-9 right-0 text-secondary" />

                <div className="mt-1">Bat Chum Villa Hotel</div>
                <div className="text-gray-500">Phnom Penh</div>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="text-sm text-gray-500">5 hours</div>
                <div className="w-full h-px mr-3 bg-gray-200 my-2" />
                <div className="text-sm text-gray-500">295 KM</div>
              </div>
              <div className=" relative">
                <div className="text-md font-medium">1:00 PM</div>
                <div className="text-gray-500">Nov 16</div>
                <MapPinCheckInside className="w-5 h-5 absolute  top-9 right-32 text-secondary" />

                <div className="mt-1">City Lodge Hotel</div>
                <div className="text-gray-500">Battambang</div>
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
    </div>
  );
}
