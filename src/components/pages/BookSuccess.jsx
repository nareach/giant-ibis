import { Check, Wifi, Building2, User, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TicketConfirmation() {
  return (
    <div className="bg-mainbg container mx-auto max-w-7xl p-4 sm:p-6">
      <div className="text-center mb-8 sm:mb-12 mt-16 sm:mt-28">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#67B467] mb-4">
          <Check className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#67B467] mb-2">
          Congratulations! You have successfully booked tickets
        </h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
          Please remember to bring your booking confirmation and a valid ID for
          check-in. Have a great trip!
        </p>
      </div>
      <div className="grid lg:grid-cols-[1fr,auto] gap-4 sm:gap-8">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="space-y-4 w-full sm:w-auto">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">
                  Universe Noble-37 (Mini Van 15 Seats)
                </h2>
                <span className="text-rose-500 font-medium md:ml-48">
                  Seat Number 1
                </span>
              </div>
              <div className="flex gap-2   text-secondary flex-wrap">
                <Wifi className="w-5 h-5" />
                <Building2 className="w-5 h-5" />
                <User className="w-5 h-5" />
                <MapPin className="w-5 h-5" />
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-4 mb-8">
            <div className="space-y-1 w-full sm:w-auto">
              <div className="font-medium">Nov 16</div>
              <div className="text-lg font-medium">08:45 AM</div>
              <div>Bat Chum Villa Hotel</div>
              <div className="text-gray-500">Phnom Penh</div>
            </div>
            <div className="flex-1 flex flex-col items-center w-full sm:pt-6">
              <div className="text-sm text-gray-500">5 hours</div>
              <div className="w-full h-px bg-gray-200 my-2" />
              <div className="text-sm text-gray-500">295 KM</div>
            </div>
            <div className="space-y-1 w-full sm:w-auto">
              <div className="font-medium">Nov 16</div>
              <div className="text-lg font-medium">1:00 PM</div>
              <div>City Lodge Hotel</div>
              <div className="text-gray-500">Battambang</div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="text-gray-600">E-Tickets has been sent to:</div>
              <div className="font-medium sm:text-end">
                <div>Johndoe</div>
                <div>Johndoe@gmail.com</div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div>
                <h3 className="font-medium mb-3">Traveller Details</h3>
                <div className="space-y-1">
                  <div>John Doe</div>
                  <div className="text-gray-500">Phone Number: 012 775 538</div>
                  <div className="text-gray-500">Email: johndoe@gmail.com</div>
                </div>
              </div>

              <div className="text-gray-600 lg:mt-16">
                <div>Booking Status : Confirmed (CNF)</div>
                <div>Seat no. : 1(lower berth), A1</div>
              </div>
            </div>

            <div className="flex justify-between items-end pt-4 border-t">
              <div className="text-gray-600">Total Fare</div>
              <div className="text-xl font-medium">$15</div>
            </div>
          </div>
        </div>
        <div className="  p-4 sm:p-6 justify-center flex flex-col items-center">
          <div className="relative mb-6">
            <img
              src="/assets/qr-code.webp"
              alt="QR Code"
              className="w-36 h-36 sm:w-48 sm:h-48 object-contain"
            />
          </div>

          <p className="text-gray-500 text-sm text-center mb-6">
            Scan the code to view in any device
          </p>

          <div className="w-full space-y-3">
            <Button
              variant="outline"
              className="w-full h-11 border border-primary text-primary "
            >
              Print ticket
            </Button>
            <Button className="w-full h-11 bg-primary hover:bg-primary text-white">
              Book Another Ticket
            </Button>
            <Button
              variant="outline"
              className="w-full h-11  bg-primary text-white hover:bg-primary"
            >
              Download Ticket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
