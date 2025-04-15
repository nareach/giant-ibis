"use client";
import dayjs from 'dayjs';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";
import Image from "next/image";
import { TitleFilter } from "../common/TitleFilter";
import { TripTypeComponent } from "../common/TripType";
import { SelectProvince } from "../common/SelectProvince";
import { PickDateFilter } from "../common/PickDate";
import { Banner } from "../layout/Banner";
import { useEffect, useState } from "react";
import { fetchFromApi } from "@/utils/api";
import { usePathname, useRouter } from "next/navigation";
import { BookProgress } from "../common/BookProgress";
import { AvailableTripItems } from "../common/AvailableTrip";
import moment from "moment";
import LoadingComponent from "../layout/Loading";
import { cn } from "@/lib/utils";

export default function SearchBookForm() {

  const pathname = usePathname();
  const router = useRouter();
  const { query } = router;


  /**
   * query param
   */

  const originParam = query?.origin || null; // '1'
  const destinationParam = query?.destination || null; // '2'
  const departureDateParam = query?.departure_date || null; // '14-04-2025'


  /**
   * state filter
   */
  const [origin, setOrigin] = useState(originParam);
  const [destination, setDestination] = useState(destinationParam);
  const [departureDate, setDepartureDate] = useState(departureDateParam);
  const [returnDate, setReturnDate] = useState();

  const [routeList, setRouteList] = useState([]);

  /**
   * 
   */
  const [activeStep, setActiveStep] = useState("select");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("khqr");
  const [data, setData] = useState(null);
  const [cities, setCities] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isOriginError, setOriginError] = useState(false);
  const [isDestinationError, setDestinationError] = useState(false);
  const [isDepartureDateError, setDepartureDateError] = useState(false);
  const [isReturneDateError, setReturnDateError] = useState(false);
  const [tripType, setTripType] = useState('one-way');


  /**
   * Result after search
   */
  const [trips, setTrips] = useState([]);

  const handleSearch = async () => {
    setLoading(true);

    setOriginError(!origin);
    setDestinationError(!destination);
    setDepartureDateError(!departureDate);

    if (tripType != 'one-way') {
      setReturnDateError(!returnDate);
      if (!origin || !destination || !departureDate || !returnDate) {
        setLoading(false);
        return;
      }
    }


    if (!origin || !destination || !departureDate) {
      setLoading(false);
      return;
    }

    if (pathname != '/book') {
      router.push(`/book?origin=${origin}&destination=${destination}&departure_date=${moment(departureDate).format('DD-MM-YYYY')}&trip_type=${tripType}&return_date=${moment(returnDate).format('DD-MM-YYYY')}`);
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setLoading(true);
        const result = await fetchFromApi('get_cityList');

        setCities(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if(pathname === '/book'){
    return (<></>);
  }



  return (
    <>
      <div className="mb-10">
        <div>
          <div className="max-w-7xl mx-auto mt-12 p-6 bg-white shadow-custom rounded-lg border border-gray-200">
            <TitleFilter />

            <div className={cn(
              `grid grid-cols-1 lg:grid-cols-8 gap-6 items-start`,
            )}>

              <TripTypeComponent onChange={(value) => {
                setTripType(value);
              }} />

              <div className={cn('lg:col-span-6 grid gap-6',
                tripType == 'one-way' ? 'lg:col-span-6' : ''
              )}>

                <div className={cn(
                  'flex flex-col lg:flex-row w-full lg:col-span-4 gap-6',
                  tripType == 'one-way' ? 'lg:col-span-4' : ''
                )}>
                  <SelectProvince
                    title="Origin"
                    value={origin}
                    isError={isOriginError}
                    items={cities?.data}
                    onChange={(value) => {
                      setOrigin(value);
                    }}
                  />

                  <SelectProvince
                    title="Destination"
                    value={destination}
                    isError={isDestinationError}
                    items={cities?.data}
                    onChange={(value) => {
                      setDestination(value);
                    }}
                  />

                  {
                    tripType == 'one-way' ? (
                      <PickDateFilter isError={isDepartureDateError} value={departureDate} title={'Departure'} onChange={(date, dateString) => {
                        setDepartureDate(date);
                      }} />) : (<></>)
                  }
                </div>

                <div className={cn(
                  'lflex flex-col lg:flex-row w-full lg:col-span-4 gap-6',
                  tripType == 'one-way' ? 'lg:col-span-2' : ''
                )}>
                  {
                    tripType == 'one-way' ? (<>
                    </>) : (<div className="flex flex-col lg:flex-row w-full lg:col-span-4 gap-6">

                      <PickDateFilter isError={isDepartureDateError} value={departureDate} title={'Departure'} onChange={(date, dateString) => {
                        setDepartureDate(date);
                      }} />
                      <PickDateFilter isError={isReturneDateError} value={returnDate} title={'Return'} onChange={(date, dateString) => {
                        setReturnDate(date);
                      }} />

                    </div>)
                  }
                </div>
              </div>


              <Button
                type="button"
                onClick={handleSearch}
                className="bg-primary w-32 text-center mt-7 hover:bg-primary "
              >
                {
                  loading ? 'Searching...' : 'Search'
                }
              </Button>
            </div>
          </div>
        </div>
        {
          loading || !trips ? <> </> : <>
            <div className="max-w-7xl py-16 mx-auto">
              {
                trips ? <>
                  <AvailableTripItems isLoadingFetching={loading} activeStep={activeStep} trips={trips} cities={cities} departureDate={departureDate} returnDate={returnDate} tripType={tripType} />
                </> : <></>
              }
            </div>
          </>
        }
      </div>
    </>
  );
}
