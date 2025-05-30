"use client";

import { Button } from "@/components/ui/button";
import { TitleFilter } from "../common/TitleFilter";
import { TripTypeComponent } from "../common/TripType";
import { SelectProvince } from "../common/SelectProvince";
import { PickDateFilter } from "../common/PickDate";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useGetAllCityQuery, useLazyGetCitesByOriginQuery } from "@/store/features/cities";
import dayjs from 'dayjs';
import LoadingWithText from "../common/LoadingWithText";
import { Search, User } from "lucide-react";
import SelectPassengerCount from "../common/SelectPassengerCount";

export default function SearchBookForm() {

  const pathname = usePathname();
  const router = useRouter();
  const [triggerGetDestination, { data: destinations, isLoading: isLoadindDestination }] = useLazyGetCitesByOriginQuery();


  /**
   * query param
   */

  const { data: citiesData, isLoading: isLoadingCity } = useGetAllCityQuery();

  /**
   * state filter
   */
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState();
  const [passengers, setPassengers] = useState(0);

  /**
   * 
   */

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

      const departureDateFormat = dayjs(departureDate, "DD-MM-YYYY").format('DD-MM-YYYY')

      if (tripType != "one-way") {
        const returnDateDateFormat = dayjs(returnDate, "DD-MM-YYYY").format('DD-MM-YYYY');

        setLoading(false);
        router.push(`/book?origin=${origin}&destination=${destination}&departure_date=${departureDateFormat}&trip_type=${tripType}&return_date=${returnDateDateFormat}&passenger_count=${passengers}`);

      } else {

        setLoading(false);
        router.push(`/book?origin=${origin}&destination=${destination}&departure_date=${departureDateFormat}&trip_type=${tripType}&passenger_count=${passengers}`);
      }


    }

    setLoading(false);
  }

  const handleFilterDestination = async (originId) => {
    setOrigin(originId)
    setDestination(null);
    await triggerGetDestination({
      originId: originId,
    }).unwrap();

  }


  if (pathname === '/book' || pathname === '/term-and-conditions') {
    return (<></>);
  }


  if (pathname.includes('success') || pathname === '/error') {
    return (<></>);
  }


  return (
    <>
      <div className="mb-10 ">
        <div>
          <div className="max-w-7xl mx-auto mt-12 p-6 dark:bg-gray-800 bg-white shadow-custom rounded-lg border border-gray-200">
            <TitleFilter />

            <div className={cn(
              `grid grid-cols-1 lg:grid-cols-10 gap-6 items-start`,
            )}>

              <TripTypeComponent onChange={(value) => {
                setTripType(value);
              }} />

              <div className={cn('lg:col-span-6 grid gap-3',
                tripType == 'one-way' ? 'lg:col-span-6 ' : ''
              )}>

                <div className={cn(
                  'flex flex-col lg:flex-row w-full lg:col-span-4 gap-3',
                  tripType == 'one-way' ? 'lg:col-span-4' : ''
                )}>
                  <SelectProvince
                    title="Origin"
                    value={origin}
                    loading={isLoadingCity}
                    isError={isOriginError}
                    items={citiesData?.data}
                    onChange={(value) => handleFilterDestination(value)}
                  />

                  <SelectProvince
                    title="Destination"
                    value={destination}
                    isError={isDestinationError}
                    items={destinations?.data}
                    loading={isLoadindDestination || isLoadingCity}
                    onChange={(value) => {
                      setDestination(value);
                    }}
                  />

                  {
                    tripType == 'one-way' ? (
                      <PickDateFilter
                        isError={isDepartureDateError}
                        value={departureDate}
                        title={'Departure'}
                        loading={isLoadingCity}
                        onChange={(date, dateString) => {
                          setDepartureDate(date);
                          setReturnDate(null);
                        }}
                      />) : (<></>)
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
                        loading={isLoadingCity}
                        onChange={(date, dateString) => {
                          setDepartureDate(date);
                          setReturnDate(null);
                        }} />


                      <PickDateFilter
                        isError={isReturneDateError}
                        value={returnDate ? returnDate : null}
                        title={'Return'}
                        loading={isLoadingCity}
                        startFrom={departureDate}
                        onChange={(date, dateString) => {
                          setReturnDate(date);
                        }} />

                    </div>)
                  }
                </div>
              </div>


              <div className="flex lg:col-span-3 gap-3">

                <SelectPassengerCount onChange={(count) => setPassengers(count)} />


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
        {
          isLoadingCity ? <LoadingWithText /> : <></>
        }
      </div>
    </>
  );
}
