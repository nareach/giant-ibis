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
import { Toaster, toast } from 'sonner';
import { getAllSeatLayout } from '@/utils/seat-status';
import { RangePickDateFilter } from '../common/RangePickDate';
import { getBusStatus } from '@/utils/action';

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
  const departureDateParam = searchParams.get('departure_date') ? dayjs(searchParams.get('departure_date'), "DD-MM-YYYY") : dayjs();
  const return_date_param = searchParams.get('return_date') ? dayjs(searchParams.get('return_date'), "DD-MM-YYYY") : dayjs();
  const trip_type_param = searchParams.get('trip_type') || 'one-way';


  /**
   * state filter
   */
  const [origin, setOrigin] = useState(originParam);
  const [destination, setDestination] = useState(destinationParam);
  const [departureDate, setDepartureDate] = useState(departureDateParam);
  const [returnDate, setReturnDate] = useState(return_date_param);


  /**
 * before search state filter
 */
  const [originB4, setOriginB4] = useState(originParam);
  const [destinationB4, setDestinationB4] = useState(destinationParam);
  const [departureDateB4, setDepartureDateB4] = useState(departureDateParam);
  const [returnDateB4, setReturnDateB4] = useState(return_date_param);


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
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }));

  const [tripType, setTripType] = useState(trip_type_param);


  /**
   * Result after search
   */
  const [trips, setTrips] = useState([]);
  const [roundTrips, setRoundTrips] = useState([]);

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

    setCurrentTime(new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }))


    const routeList = await fetchFromApi('get_routeList');

    if (routeList.data == 'NULL' || !routeList.data) {
      alert('there no record');
      return;
    }

    let routeFilter = [];
    routeFilter = routeList?.data
      .filter(route =>
        route.origin === origin &&
        route.destination === destination
      );


    if (routeFilter.length == 0) {
      toast.info('There no data.');
      setTrips([]);
      setLoading(false);
      return;
    }

    const departureRoute = await getRouteDetail({
      origin,
      destination,
      routeList
    });

    let roundWayRoutes = [];
    if (tripType === 'round-trip') {
      roundWayRoutes = await getRouteDetail({
        origin: destination,
        destination: origin,
        routeList
      });
      setRoundTrips(roundWayRoutes);
    }

    /**
    * do the maping
    */

    setTrips(departureRoute);
    setLoading(false);

    setTimeout(() => {
      const element = document.getElementById('departure_trip_list');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 50);
  }


  const getRouteDetail = async ({
    origin, destination, routeList
  }) => {
    let routeFilter = [];
    routeFilter = routeList?.data
      .filter(route =>
        route.origin === origin &&
        route.destination === destination
      );

    routeFilter = (await Promise.all(
      routeFilter?.map(async (route, index) => {
        // get the city
        const originCity = cities?.data?.find(city => city.city_id === route.origin);
        const destinationCity = cities?.data?.find(city => city.city_id === route.destination);

        // fetch timing
        const timing = await fetchFromApi('get_route_timing', {
          route_id: route?.id
        });

        const busType = await fetchFromApi('get_busList', {
          bus_type: route?.bus_type
        });

        const routeTiming = timing?.data[index] || null;

        if (!routeTiming?.meta_value) {
          return null;
        }

        const busDetail = await fetchFromApi('get_route_bus', {
          route_id: route?.id,
          travel_time: routeTiming?.meta_value
        });

        const bus_status = await getBusStatus({
          busType: busType,
          date: departureDate,
          route: route,
          routeTiming: routeTiming,
          busDetail: busDetail
        })

        let busStatusReturn;
        if (tripType === 'round-trip') {
          busStatusReturn = await getBusStatus({
            busType: busType,
            date: returnDate[1],
            route: route,
            routeTiming: routeTiming,
            busDetail: busDetail
          });
        }


        return {
          ...route,
          origin_details: originCity,
          destination_details: destinationCity,
          busDetail: busDetail?.data[0],
          timing: routeTiming ? {
            meta_id: routeTiming?.meta_id,
            time: routeTiming.meta_value,
            day_night: routeTiming.day_night,
            price: routeTiming.price,
            part_price: routeTiming.part_price,
            bus_type: routeTiming?.bus_type,
            allowedpick: routeTiming?.allowedpick === '0' ? false : true,
          } : null,
          seat_status: bus_status,
          busTypeDetail: busType?.data[0],
        };
      })
    )).filter(Boolean);


    return routeFilter;
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
        if (origin && destination && departureDate) {
          await handleSearch();
        }
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

      <div className="mb-10 mx-3 lg:mx-auto">

        <Toaster />

        <div>
          <div className="max-w-7xl mx-auto mt-12 p-6 bg-white shadow-custom rounded-lg border border-gray-200">
            <TitleFilter />

            <div className={cn(
              `grid grid-cols-1 lg:grid-cols-8 gap-6 items-start`,
            )}>

              <TripTypeComponent defaultValue={trip_type_param} onChange={(value) => {
                setTripType(value);
                setTrips([]);
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

                      <PickDateFilter
                        isError={isDepartureDateError}
                        value={departureDate}
                        title={'Departure'}
                        onChange={(date, dateString) => {
                          setDepartureDate(date);
                        }} />

                      <RangePickDateFilter
                        isError={isReturneDateError}
                        startFrom={departureDate}
                        value={returnDate}
                        title={'Return'}
                        onChange={(date, dateString) => {
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
          loading ? <div className='text-center m-10 text-lg'>Loading ...</div> : <>
            <div className="max-w-7xl py-16 mx-auto">
              {
                trips.length > 0 ? <>
                  <AvailableTripItems
                    currentTime={currentTime}
                    isLoadingFetching={loading}
                    activeStep={activeStep}
                    trips={trips}
                    cities={cities}
                    departureDate={departureDate}
                    returnDate={returnDate[1]}
                    tripType={tripType}
                    roundTrips={roundTrips}
                    destination={destination}
                    origin={origin}
                  />
                </> : <></>
              }
            </div>
          </>
        }
      </div>
    </Suspense>
  );
}
