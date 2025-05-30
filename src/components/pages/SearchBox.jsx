"use client";
import dayjs from 'dayjs';

import { Button } from "@/components/ui/button";
import { TitleFilter } from "../common/TitleFilter";
import { TripTypeComponent } from "../common/TripType";
import { SelectProvince } from "../common/SelectProvince";
import { PickDateFilter } from "../common/PickDate";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AvailableTripItems } from "../common/AvailableTrip";
import LoadingComponent from "../layout/Loading";
import { cn } from "@/lib/utils";
import { Toaster } from 'sonner';
import { useLazyGetRouteQuery } from '@/store/features/route-bus';
import { useGetAllCityQuery, useLazyGetCitesByOriginQuery } from '@/store/features/cities';
import LoadingWithText from '../common/LoadingWithText';
import { useLazyGetPickUpByCityIdQuery } from '@/store/features/pick-up';
import NoBusComponent from '../common/NoBusComponent';
import SelectPassengerCount from '../common/SelectPassengerCount';
import { Search } from 'lucide-react';

export default function SearchBookForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [triggerGetRoute, { data: routes, isLoading: isLoading, isError }] = useLazyGetRouteQuery();
  const [triggerGetDestination, { data: destinations, isLoading: isLoadindDestination }] = useLazyGetCitesByOriginQuery();
  const [triggerGetPickUp, { data: pickup, isLoading: isLoadingPickUp }] = useLazyGetPickUpByCityIdQuery();

  const { data: cities, isLoading: isLoadingCity } = useGetAllCityQuery();


  /**
   * query param
   */
  const originParam = searchParams.get('origin') || null;
  const destinationParam = searchParams.get('destination') || null;
  const departureDateParam = searchParams.get('departure_date') ? dayjs(searchParams.get('departure_date'), "DD-MM-YYYY") : null;
  const return_date_param = searchParams.get('return_date') ? dayjs(searchParams.get('return_date'), "DD-MM-YYYY") : null;
  const trip_type_param = searchParams.get('trip_type') || 'one-way';

  const passenger_count = searchParams.get('passenger_count') || 0;

  /**
   * state filter
   */
  const [origin, setOrigin] = useState(originParam);
  const [destination, setDestination] = useState(destinationParam);
  const [departureDate, setDepartureDate] = useState(departureDateParam);
  const [returnDate, setReturnDate] = useState(return_date_param);

  /**
   * 
   */
  const [activeStep, setActiveStep] = useState("select");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isOriginError, setOriginError] = useState(false);
  const [isDestinationError, setDestinationError] = useState(false);
  const [isDepartureDateError, setDepartureDateError] = useState(false);
  const [isReturneDateError, setReturnDateError] = useState(false);

  const [tripType, setTripType] = useState(trip_type_param);
  const [passengers, setPassengers] = useState(passenger_count);


  /**
   * Result after search
   */
  const [trips, setTrips] = useState();
  const [roundTrips, setRoundTrips] = useState([]);

  const handleSearch = async () => {

    setLoading(true);
    setOriginError(!origin);
    setDestinationError(!destination);
    setDepartureDateError(!departureDate);


    if (tripType === 'round-trip') {
      setReturnDateError(!returnDate);
    }

    if (!origin || !destination || !departureDate) {
      setLoading(false);
      return;
    }

    if (tripType === 'round-trip') {
      if (!departureDate) {
        setLoading(false);
        return;
      }
    }



    const result = await triggerGetRoute({
      origin: origin,
      destination: destination,
      travelDate: dayjs(departureDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
    }).unwrap();

    setTrips(result?.data);

    if (tripType === 'round-trip') {
      const result = await triggerGetRoute({
        origin: destination,
        destination: origin,
        travelDate: dayjs(returnDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
      }).unwrap();

      console.log("result round trip: ", result);


      setRoundTrips(result?.data);
    }


    setLoading(false);
    setTimeout(() => {
      const element = document.getElementById('result_search');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 50);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setLoading(true);
        if (origin && destination && departureDate) {

          await triggerGetDestination({
            originId: origin,
          }).unwrap();

          await handleSearch();

          router.replace(window.location.pathname, { scroll: false });
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterDestination = async (originId) => {
    setOrigin(originId)
    setDestination(null);

    await triggerGetDestination({
      originId: originId,
    }).unwrap();

  }

  return (
    <Suspense fallback={<div>Loading ...</div>}>

      <div className="mb-10 mx-3 lg:mx-auto">

        <Toaster />

        <div>
          <div className="max-w-7xl mx-auto mt-12 p-6 bg-white shadow-custom rounded-lg border border-gray-200">
            <TitleFilter />

            <div className={cn(
              `grid grid-cols-1 lg:grid-cols-10 gap-6 items-start`,
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
                    loading={isLoadingCity}
                    onChange={(value) => handleFilterDestination(value)}
                  />

                  <SelectProvince
                    title="Destination"
                    value={destination}
                    loading={isLoadindDestination || isLoadingCity}
                    isError={isDestinationError}
                    items={destinations?.data}
                    onChange={(value) => {
                      setDestination(value);
                    }}
                  />

                  {
                    tripType == 'one-way' ? (
                      <PickDateFilter
                        loading={isLoadingCity}
                        isError={isDepartureDateError} value={departureDate} title={'Departure'} onChange={(date, dateString) => {
                          setDepartureDate(date);
                          setReturnDate(null);
                        }} />) : (<></>)
                  }
                </div>

                <div className={cn(
                  'flex flex-col lg:flex-row w-full lg:col-span-4 gap-6',
                  tripType == 'one-way' ? 'lg:col-span-2' : ''
                )}>
                  {
                    tripType == 'one-way' ? (<>
                    </>) : (<div className="flex flex-col lg:flex-row w-full lg:col-span-4 gap-6">

                      <PickDateFilter
                        isError={isDepartureDateError}
                        value={departureDate}
                        loading={isLoadingCity}
                        title={'Departure'}
                        onChange={(date, dateString) => {
                          setDepartureDate(date);
                          setReturnDate(null);
                        }} />


                      <PickDateFilter
                        isError={isReturneDateError}
                        loading={isLoadingCity}
                        value={returnDate ? returnDate : null}
                        title={'Return'}
                        startFrom={departureDate}
                        onChange={(date, dateString) => {
                          setReturnDate(date);
                        }} />
                    </div>)
                  }
                </div>
              </div>


              <div className="flex lg:col-span-3 gap-3">

                <SelectPassengerCount
                  defaultPassenger={passengers}
                  onChange={(count) => {
                    setPassengers(count);
                    setTrips([]);
                    setRoundTrips([]);
                  }}
                />

                <Button
                  type="button"
                  onClick={handleSearch}
                  disabled={loading || isLoadingCity}
                  className={cn(
                    'bg-primary w-32 text-center mt-7 hover:bg-primary',
                    isLoadingCity || loading ? 'cursor-not-allowed' : ''
                  )}
                >
                  {
                    loading ? 'Searching...' : <div className="flex justify-center items-center gap-2">Search <Search /></div>
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div id='result_search'>
          {
            loading || isLoading ? <LoadingWithText /> : <>
              <div className="max-w-7xl py-16 mx-auto">
                {
                  trips?.length > 0 ? <>
                    <AvailableTripItems
                      isLoadingFetching={loading}
                      activeStep={activeStep}
                      trips={trips}
                      cities={cities}
                      departureDate={departureDate}
                      returnDate={returnDate}
                      tripType={tripType}
                      roundTrips={roundTrips}
                      destination={destination}
                      origin={origin}
                      passengers={passengers}
                    />
                  </> : <NoBusComponent />
                }
              </div>
            </>
          }
        </div>
      </div>
    </Suspense>
  );
}
