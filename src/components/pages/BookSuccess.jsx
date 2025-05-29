"use client"
import { Button } from "@/components/ui/button";
import RouteInfor from "../ui/RouteInfor";
import moment from "moment";
import FacilityAvailable from "../common/FacilityAvalable";
import { usePathname, useSearchParams } from "next/navigation";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";

export default function TicketConfirmation({
  book
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [fullUrl, setUrl] = useState(null);

  useEffect(() => {
    const fullUrl = window.location.href;
    console.log(fullUrl);
    setUrl(fullUrl);
  }, [pathname, searchParams]);

  return (
    <div className="bg-mainbg container mx-auto max-w-7xl p-4 sm:p-6">

      <div className="grid lg:grid-cols-[1fr,auto] gap-4 sm:gap-8">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-between gap-4 w-full ">
                <h2 className="text-lg font-semibold">
                  {book?.routeBus?.meta_key}
                </h2>
                <span className="text-rose-500 font-bold  text-left">
                  Seat Number {book?.seat_no}
                </span>
              </div>
              <FacilityAvailable facilities={book?.facilities} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-4 mb-8">
            <RouteInfor
              city={book?.originDetail?.city?.city_name}
              departure_date={moment(book?.originDetail?.leaveAt).format('MMMM-DD')}
              isStart={true}
              time={book?.originDetail?.time}
              address={book?.originDetail?.address?.url}
              routeId={book?.id}
            />
            <div className="flex-1 flex flex-col items-center w-full sm:pt-6">
              <div className="text-sm text-gray-500">{book?.duration}</div>
              <div className="w-full h-px bg-gray-200 my-2" />
              <div className="text-sm text-gray-500">{book?.kilo_meters} KM</div>
            </div>
            <div className="space-y-1 w-full sm:w-auto">
              <RouteInfor
                city={book?.destinationDetail?.city?.city_name}
                departure_date={moment(book?.destinationDetail?.arriveAt).format('MMMM-DD')}
                isStart={false}
                time={book?.destinationDetail?.time}
                address={book?.destinationDetail?.address?.url}
                routeId={book?.id}
              />

            </div>
          </div>
          <div className="space-y-6">
            {
              book?.pickup ? (<>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="text-gray-600">Pick Up At:</div>
                  <div className="font-medium sm:text-end">
                    <div>{book?.pickup?.title}</div>
                  </div>
                </div></>) : (<></>)
            }

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="text-gray-600">E-Tickets has been sent to:</div>
              <div className="font-medium sm:text-end">
                <div>{book?.ticket?.first_name} {book?.ticket?.last_name}</div>
                <div>{book?.ticket?.email}</div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div>
                <h3 className="font-medium mb-3">Traveller Details</h3>
                <div className="space-y-1">
                  <div className=""><span className="text-gray-500 pr-5">Phone Number: </span>{book?.ticket?.mobile}</div>
                  <div><span className="text-gray-500 pr-5">Booking Status: </span> {book?.seat_status}</div>
                  <div><span className="text-gray-500 pr-5">Price: </span> {book?.price}</div>
                  <div><span className="text-gray-500 pr-5">Ticket: </span> {book?.ticketCount}</div>
                  {
                    book?.paymentMethod != 'khqr' ? <div><span className="text-gray-500 pr-5">Service Charge: </span>$ {book?.ticketCount}</div> : <></>
                  }
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end pt-4 border-t">
              <div className="text-gray-600">Total Fare</div>
              {
                book?.paymentMethod != 'khqr' ? <div className="text-xl font-medium">${(Number(book?.price) * book?.ticketCount) + book?.ticketCount}</div> : <div className="text-xl font-medium">${Number(book?.price) * book?.ticketCount}</div>
              }

            </div>
          </div>
        </div>
        <div className="  p-4 sm:p-6 justify-center flex flex-col items-center">
          <div className="relative mb-6">

            <div className="w-36 h-36 sm:w-48 sm:h-48 object-contain">
              {
                fullUrl ? <QRCode
                  size={256}
                  style={{ height: "100%", maxWidth: "100%", width: "100%" }}
                  value={fullUrl}
                  viewBox={`0 0 256 256`}
                /> : <></>
              }
            </div>


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
