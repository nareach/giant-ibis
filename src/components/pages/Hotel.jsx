'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, ChevronLeft, ChevronRight, Search, HotelIcon } from "lucide-react";
import { useGetAllCityQuery } from "@/store/features/cities";
import LoadingWithText from "../common/LoadingWithText";
import { useGetHotelByCityIdQuery, useLazyGetHotelByCityIdQuery } from "@/store/features/hotel";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function HotelListings() {

  const { data: cities, isLoading: isLoadingCity, isSuccess } = useGetAllCityQuery();
  const [triggerGetHotels, { data: hotels, isLoading: isLoadingGetHotel }] = useLazyGetHotelByCityIdQuery();

  const [selectCityId, setSelectCityId] = useState();

  useEffect(() => {
    if (isSuccess && cities?.data?.length) {
      setSelectCityId(cities.data[0].city_id);
    }
  }, [isSuccess, cities?.data]);

  useEffect(() => {
    if (selectCityId) {
      triggerGetHotels(selectCityId);
    }
  }, [selectCityId, triggerGetHotels]);

  if (isLoadingCity) {
    return <LoadingWithText />
  }

  return (
    <div className="bg-mainbg">
      <div className="px-4 md:px-10 lg:px-20 w-full mx-auto py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-80">
          </div>
          {
            selectCityId ? <Select defaultValue={selectCityId} onValueChange={(value) => setSelectCityId(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {
                  cities?.data?.map((item, index) => <SelectItem value={item?.city_id} key={index}>{item?.city_name}</SelectItem>)
                }
              </SelectContent>
            </Select> : <></>
          }
        </div>
        {
          !isLoadingGetHotel ? <div className="space-y-6">
            {
              hotels?.data?.length > 0 ? <div>
                {hotels?.data?.map((hotel, index) => (
                  <Card key={index} className="p-6 mb-5">
                    <div className="flex flex-col md:flex-row gap-6">
                      <img
                        src={`https://giantibis.com/ibis_admin/${hotel?.image}`}
                        alt={`${hotel.name} logo`}
                        className="w-full md:w-56 h-56 rounded-md object-contain"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                          <h2 className="text-xl font-semibold">{hotel.name}</h2>
                          <Link href={hotel?.url} target="_blank" variant="ghost" className="text-orange-500 hover:text-orange-600 flex justify-center items-center mt-2 md:mt-0" >
                            <MapPin className="w-4 h-4 mr-2" />
                            Get Direction
                          </Link>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {hotel.descripition}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          <span className="font-semibold">Address</span>: {hotel?.address}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div> : <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-amber-100 rounded-full mb-4">
                    <HotelIcon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    No Hotels Available
                  </h2>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any hotels matching your criteria. Try adjusting your filters or search in a different area.
                  </p>
                </div>
              </div>
            }
          </div> : <LoadingWithText />
        }

      </div>
    </div>
  );
}
