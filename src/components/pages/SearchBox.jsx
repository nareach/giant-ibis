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
import { Suspense, useEffect, useState } from "react";
import { fetchFromApi } from "@/utils/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BookProgress } from "../common/BookProgress";
import { AvailableTripItems } from "../common/AvailableTrip";
import moment from "moment";
import LoadingComponent from "../layout/Loading";
import { cn } from "@/lib/utils";

export default function SearchBookForm() {

  const pathname = usePathname();
  const router = useRouter();
  const { query } = router;
  const searchParams = useSearchParams();


  /**
   * query param
   */

  const originParam = searchParams.get('origin') || null;
  const destinationParam = searchParams.get('destination') || null;
  const departureDateParam = dayjs(searchParams.get('departure_date'), "DD-MM-YYYY") || null;
  const return_date_param = dayjs(searchParams.get('return_date'), "DD-MM-YYYY") || null;
  const trip_type_param = searchParams.get('trip_type') || 'one-way';


  /**
   * state filter
   */
  const [origin, setOrigin] = useState(originParam);
  const [destination, setDestination] = useState(destinationParam);
  const [departureDate, setDepartureDate] = useState(departureDateParam);
  const [returnDate, setReturnDate] = useState(return_date_param);

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
  const [tripType, setTripType] = useState(trip_type_param);


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
      router.push(`/book?origin=${origin}&destination=${destination}&departure_date=${moment(departureDate).format('DD-MM-YYYY')}`);
    }


    const routeList = await fetchFromApi('get_routeList');

    if (routeList.data == 'NULL' || !routeList.data) {
      alert('there no record');
      return;
    }

    let routeFilter = routeList?.data
      .filter(route =>
        route.origin === origin &&
        route.destination === destination
      );



    const busDetail = await fetchFromApi('get_busList', {
      bus_type: routeFilter[0].bus_type
    });


    const timing = await fetchFromApi('get_route_timing', {
      route_id: routeFilter[0]?.id
    });



    routeFilter = await Promise.all(
      routeFilter?.map(async (route, index) => {
        const originCity = cities?.data?.find(city => city.city_id === route.origin);
        const destinationCity = cities?.data?.find(city => city.city_id === route.destination);

        const routeTiming = timing?.data[index] || null;


        const bus_status = await fetchFromApi('get_bus_status', {
          route_id: routeFilter[0]?.id,
          bus_id: busDetail.data[0].id,
          travel_date: moment(departureDate).format('YYYY-MM-DD'),
          travel_time: routeTiming?.meta_value,
        });

        const seatsArray = busDetail.data[0].seats_no.split(',');

        const seatStatuses = bus_status.status && bus_status.data !== "NULL"
          ? bus_status.data
          : [];

        const seatsWithStatus = seatsArray.map(seat => {
          const foundStatus = seatStatuses.find(s => s.seat_id === seat);
          return {
            seat,
            status: foundStatus ? foundStatus.seat_status : "Available"
          };
        });


        return {
          ...route,
          origin_details: originCity,
          destination_details: destinationCity,
          busDetail: busDetail?.data[0],
          timing: routeTiming ? {
            time: routeTiming.meta_value,
            day_night: routeTiming.day_night,
            price: routeTiming.price,
            part_price: routeTiming.part_price,
            bus_type: routeTiming?.bus_type
          } : null,
          seat_status: seatsWithStatus
        };
      })
    );


    /**
     * do the maping
     */

    console.log('routeFilter: ', routeFilter);

    setTrips(routeFilter);
    setLoading(false);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setLoading(true);
        await handleSearch();
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cities]);



  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <div className="mb-10">
        <div>
          <div className="max-w-7xl mx-auto mt-12 p-6 bg-white shadow-custom rounded-lg border border-gray-200">
            <TitleFilter />

            <div className={cn(
              `grid grid-cols-1 lg:grid-cols-8 gap-6 items-start`,
            )}>

              <TripTypeComponent defaultValue={trip_type_param} onChange={(value) => {
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
    </Suspense>
  );
}
