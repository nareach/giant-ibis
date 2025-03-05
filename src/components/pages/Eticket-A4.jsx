import Image from "next/image";

import {
  MapPin,
  Wifi,
  AirVent,
  Droplet,
  Usb,
  Toilet,
  LocateOffIcon,
  MapPinCheckInside,
  BusFront,
} from "lucide-react";

export default function ETicket() {
  return (
    <div className="bg-white w-[2480px] h-[3508px] mx-auto p-8 shadow-lg">
      <div className="flex justify-between text-sm mb-4">
        <div className="space-y-1">
          <div>From: Giantibis.com</div>
          <div>Subject: E-Ticket ID #01213</div>
        </div>
        <div className="text-right space-y-1">
          <div>Date: 9 January 2025 3:12 AM</div>
          <div>To: sunjessica05@gmail.com</div>
        </div>
      </div>

      <div className="border-b mb-6"></div>

      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <Image
          src="/assets/logos/logo.png"
          alt="Giant Ibis Transport"
          width={150}
          height={50}
          className="object-contain"
        />
        <div className="text-right">
          <div className="text-blue-600 text-lg font-semibold">
            Your E-Ticket
          </div>
          <div className="text-blue-600 font-semibold">ID #01213</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="  w-[1900px]">
          <h2 className="text-blue-600 text-lg font-semibold mb-4">
            Trip Detail
          </h2>
          <div className="space-y-4 justify-between">
            <div className=" flex ">
              <div>Universe Noble-37 (Mini Van 15 Seats)</div>
              <div className="text-rose-500  md:ml-[1460px]">Seat Number 1</div>
            </div>
            <div className=" space-y-5">
              <div className="flex gap-4 items-center">
                <Wifi className="w-6 h-6 text-secondary" />
                <AirVent className="w-6 h-6 text-secondary" />
                <Droplet className="w-6 h-6 text-secondary" />
                <Toilet className="w-6 h-6 text-secondary" />
                <MapPinCheckInside className="w-6 h-6 text-secondary" />
              </div>

              <div className="  flex justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16">Nov 16</div>
                  <div>
                    <div className="font-semibold">08:45 AM</div>
                    <div>Bat Chum Villa Hotel</div>
                    <div className="text-gray-600">Phnom Penh</div>
                    <button className="mt-2 inline-flex items-center border border-primary gap-1 px-3 py-1 rounded-md text-sm">
                      <MapPin className="w-4 h-4 text-secondary" /> Get
                      Direction
                    </button>
                  </div>
                </div>

                <div>
                  <BusFront className=" w-5 h-5 text-secondary md:mr-[1350px]  relative top-10 " />
                  <div className="my-4 flex items-center justify-center gap-2 px-16">
                    <div className="text-center text-sm text-gray-500">
                      <div>5 hours</div>
                      <div>295 KM</div>
                    </div>
                    <div className=" w-[1300px] flex-1  border absolute z-30"></div>
                  </div>
                  <MapPinCheckInside className=" w-5 h-5 relative text-secondary left-[1350px] bottom-14" />
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-16">Nov 16</div>
                  <div>
                    <div className="font-semibold">1:00 PM</div>
                    <div>City Lodge Hotel</div>
                    <div className="text-gray-600">Battambang</div>
                    <button className="mt-2 inline-flex items-center border border-primary gap-1 px-3 py-1 rounded-md text-sm">
                      <MapPin className="w-4 h-4 text-secondary" /> Get
                      Direction
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" md:ml-[920px]">
          <h2 className="text-blue-600 text-lg font-semibold mb-4">
            Payment Detail
          </h2>
          <div className="space-y-2">
            <div className="">
              <div>Amount 1 ticket(s)</div>
            </div>
            <div className="flex justify-between">
              <div>
                Credit Card Processing Fee <span className=" ml-4"> 0$</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                Total <span className=" ml-4"> 16$</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                Payment Method <span className=" ml-4"> KHQR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-blue-600 text-lg font-semibold mb-4">
          Passenger Detail
        </h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Gender</th>
                <th className="px-4 py-2 text-left">Phone Number</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Seat</th>
                <th className="px-4 py-2 text-left">Pickup</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-t">Sun Jessica</td>
                <td className="px-4 py-2 border-t">Female</td>
                <td className="px-4 py-2 border-t">012 775 538</td>
                <td className="px-4 py-2 border-t">sunjessica05@gmail.com</td>
                <td className="px-4 py-2 border-t">A1</td>
                <td className="px-4 py-2 border-t">
                  Aquarius Hotel & Urban Resort St.240
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-blue-600 text-lg font-semibold mb-4">
          Please be Informed
        </h2>
        <div className="text-sm space-y-2">
          <p>
            The following rules apply to all Giant Ibis Transport passengers and
            is subject to change at any time without prior notice:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Tickets are non-refundable but exchangeable for 1 time only up to
              one year from the date of purchase. Note: Please inform us 24
              hours before departure time via email: info@giantibis.com or
              Hotline: +855 95 959 3333.
            </li>
            <li>
              Online tickets may be purchased at any time before departure as
              long as seats are still available.
            </li>
            <li>
              Complimentary pick up may be arranged when tickets are purchased
              one day in advance of departure.
            </li>
            <li>
              Complimentary pick up is only available for customer who stays in
              the listed partner hotels and guesthouses.
            </li>
            <li>
              Passengers must be ready and wait for pickup service bus at the
              lobby in their hotel or guesthouse 1 hour before departure time.
              Our pickup guys would talk to the hotel's receptionist when using
              our service.
            </li>
            <li>
              Giant Ibis Transport is not liable for no-show and/or late
              passengers who miss their pick up or scheduled departure.
            </li>
            <li>
              Complimentary pick up is NOT available for night bus departures.
            </li>
            <li>
              Passengers must arrive at the bus terminal 15 minutes before their
              scheduled departure time.
            </li>
            <li>
              Passengers must present their ticket or valid identification in
              order to board the bus.
            </li>
            <li>
              Parents may hold infants without purchasing an additional ticket
              for local routes and are charged 15$/pax for international routes.
              Children aged 3+ must have a ticket.
            </li>
            <li>
              Giant Ibis Transport will not make any refund related to our
              complimentary services such as Pick up, Wi-Fi, Snack, and outlet.
            </li>
            <li>
              The duration of the trip will depend largely on road conditions at
              the time of your journey. Giant Ibis Transport will not
              responsible for any early/late arrival.
            </li>
            <li>
              Please keep in mind that our company does not accept liability for
              any damage to personal belongings and luggage that may occur
              during our services. Thank you for your understanding.
            </li>
            <li>
              tickets need not be printed, but may be presented electronically.
            </li>
            <li>
              A car seat may be provided free of charge given advanced notice of
              the requirement; however a ticket must be purchased for infants
              that will use a car seat.
            </li>
            <li>
              Each passenger is permitted 1 carry on and a maximum of 2 pieces
              of stored luggage not exceeding 25kg. Stored luggage exceeding
              25kg may be subject to additional charges.
            </li>
            <li>
              Livestock, pet, weapons, illegal products and hazardous material
              are prohibited aboard the bus.
            </li>
            <li>
              Passengers may not bring strong smelling food items onto the bus
              (ie. durian, prahok, etc.).
            </li>
            <li>
              All passengers should mind their manners and language in the
              presence of fellow passengers and company staff.
            </li>
            <li>Smoking inside the bus is prohibited.</li>
            <li>
              The passenger hereby acknowledges and agrees that personal data
              has been given to Giant Ibis Transport for the purposes of
              purchasing online tickets, providing and developing ancillary
              services and facilities, accounting, billing and auditing,
              security, administrative and legal purposes, systems testing,
              maintenance and development, statistical analysis, and helping us
              in any future dealings with you. For these purposes, by entering
              into purchasing online ticket with us you authorize us to retain
              and use your data.
            </li>
            <li>
              Note for Phnom Penh - Ho Chi Minh: Passenger should have Vietnam
              Visa before boarding the bus due to Vietnam Visa cannot apply at
              the border. In case passenger did not have Vietnam Visa on the
              date of traveling, they cannot claim to refund or delay travel
              schedule.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
