"use client";

import { Button } from "@/components/ui/button";
import { TitleFilter } from "../common/TitleFilter";
import { TripTypeComponent } from "../common/TripType";
import { SelectProvince } from "../common/SelectProvince";
import { PickDateFilter } from "../common/PickDate";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useGetAllCityQuery, useLazyGetCitesByOriginQuery } from "@/store/features/cities";
import dayjs from 'dayjs';
import LoadingWithText from "../common/LoadingWithText";

export default function SearchBookForm() {

  const pathname = usePathname();
  const router = useRouter();
  const { query } = router;
  const [triggerGetDestination, { data: destinations, isLoading: isLoadindDestination }] = useLazyGetCitesByOriginQuery();


  /**
   * query param
   */

  const originParam = query?.origin || null; // '1'
  const destinationParam = query?.destination || null; // '2'
  const departureDateParam = query?.departure_date || null; // '14-04-2025'
  const { data: citiesData, isLoading: isLoadingCity } = useGetAllCityQuery();

  /**
   * state filter
   */
  const [origin, setOrigin] = useState(originParam);
  const [destination, setDestination] = useState(destinationParam);
  const [departureDate, setDepartureDate] = useState(departureDateParam);
  const [returnDate, setReturnDate] = useState();

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
        router.push(`/book?origin=${origin}&destination=${destination}&departure_date=${departureDateFormat}&trip_type=${tripType}&return_date=${returnDateDateFormat}`);

      } else {

        setLoading(false);
        router.push(`/book?origin=${origin}&destination=${destination}&departure_date=${departureDateFormat}&trip_type=${tripType}`);
      }


    }
  }

  const handleFilterDestination = async (originId) => {
    setOrigin(originId)
    setDestination(null);
    await triggerGetDestination({
      originId: originId,
    }).unwrap();

  }


  if (pathname === '/book') {
    return (<></>);
  }


  if (pathname.includes('success')) {
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
                      <PickDateFilter isError={isDepartureDateError} value={departureDate} title={'Departure'} onChange={(date, dateString) => {
                        setDepartureDate(date);
                        setReturnDate(null);
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
                          setReturnDate(null);
                        }} />


                      <PickDateFilter
                        isError={isReturneDateError}
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
          isLoadingCity ? <LoadingWithText /> : <></>
        }
      </div>
    </>
  );
}
