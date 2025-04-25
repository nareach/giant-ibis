import { Check, Wifi, Building2, User, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addHoursToTime, calculateArrival } from "@/utils/time-util";
import RouteInfor from "../ui/RouteInfor";
import moment from "moment";

export default function TicketConfirmation({
  book = {}, routeDetail
}) {

  const {
    id = '',
    agency_id = '',
    branch_id = '',
    bus_id = '',
    canceled_by = null,
    cancle_date = null,
    discount = 0,
    exchange_rate = 1,
    invoice_no = '',
    issued_date = '',
    locked = '',
    loyality_code = '',
    meta_id = '',
    methodofbooking = '',
    passenger_id = '',
    pickup = '',
    price = 0,
    ref_code = '',
    ref_id_ticket = '',
    rmks = '',
    route_id = '',
    seat_id = '',
    seat_status = '',
    sessidphp = '',
    tid = '',
    token = '',
    totalriel = 0,
    travel_date = '',
    travel_time = '',
    type = '',
    unpaydate = null,
    unpaystatus = false,
    unpayuser = null,
    updatedtime = null,
    user_id = '',
    voucher_no = '',
    wpay_ststus = ''
  } = book;

  return (
    <div className="bg-mainbg container mx-auto max-w-7xl p-4 sm:p-6">

      <div className="grid lg:grid-cols-[1fr,auto] gap-4 sm:gap-8">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="space-y-4 w-full sm:w-auto">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">
                  {routeDetail?.bus_type}
                </h2>
                <span className="text-rose-500 font-medium md:ml-48">
                  Seat Number {seat_id}
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
            <RouteInfor
              city={routeDetail?.originDetail?.city_name}
              departure_date={moment(travel_date).format('MMMM-DD')}
              isStart={true}
              time={routeDetail?.timing?.meta_value}
            />
            <div className="flex-1 flex flex-col items-center w-full sm:pt-6">
              <div className="text-sm text-gray-500">{routeDetail?.duration}</div>
              <div className="w-full h-px bg-gray-200 my-2" />
              <div className="text-sm text-gray-500">{routeDetail?.kilo_meters} KM</div>
            </div>
            <div className="space-y-1 w-full sm:w-auto">
              <RouteInfor
                city={routeDetail?.destinationDetail?.city_name}
                departure_date={calculateArrival({
                  departureTime: moment(travel_date).format('YYYY-MM-DD'),
                  durationHours: routeDetail?.duration,
                  metaTime: routeDetail?.timing?.meta_value
                })}
                isStart={false}
                time={routeDetail?.timing?.meta_value ? addHoursToTime(routeDetail?.timing?.meta_value, routeDetail?.duration) : '' || 'no'}
              />

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
                <div>Booking Status : {seat_status}</div>
                <div>Seat no. : {seat_id}</div>
              </div>
            </div>

            <div className="flex justify-between items-end pt-4 border-t">
              <div className="text-gray-600">Total Fare</div>
              <div className="text-xl font-medium">${price}</div>
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
