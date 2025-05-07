"use client";

import { Button } from "@/components/ui/button";
import { TitleFilter } from "../common/TitleFilter";
import { TripTypeComponent } from "../common/TripType";
import { SelectProvince } from "../common/SelectProvince";
import { PickDateFilter } from "../common/PickDate";
import { useEffect, useState } from "react";
import { fetchFromApi } from "@/utils/api";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
import { cn } from "@/lib/utils";
import { useGetAllCityQuery } from "@/store/features/cities";
import LoadingComponent from "../layout/Loading";
import LoadingWithText from "../common/LoadingWithText";

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
      router.push(`/book?origin=${origin}&destination=${destination}&departure_date=${moment(departureDate).format('DD-MM-YYYY')}&trip_type=${tripType}&return_date=${moment(returnDate).format('DD-MM-YYYY')}`);
    }
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
                    isError={isOriginError}
                    items={citiesData?.data}
                    onChange={(value) => {
                      setOrigin(value);
                    }}
                  />

                  <SelectProvince
                    title="Destination"
                    value={destination}
                    isError={isDestinationError}
                    items={citiesData?.data}
                    onChange={(value) => {
                      setDestination(value);
                    }}
                  />

                  {
                    tripType == 'one-way' ? (
                      <PickDateFilter isError={isDepartureDateError} value={departureDate} title={'Departure'} onChange={(date) => {
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

                      <PickDateFilter isError={isDepartureDateError} value={departureDate} title={'Departure'} onChange={(date) => {
                        setDepartureDate(date);
                      }} />
                      <PickDateFilter isError={isReturneDateError} value={returnDate} title={'Return'} onChange={(date) => {
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
          isLoadingCity ? <LoadingWithText/> : <></>
        }
      </div>
    </>
  );
}
