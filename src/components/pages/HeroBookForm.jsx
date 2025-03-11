"use client";

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
import { useRouter } from "next/navigation";
import { BookProgress } from "../common/BookProgress";
import { AvailableTripItems } from "../common/AvailableTrip";
import moment from "moment";

export default function SearchBookForm() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState("select");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("khqr");
  const [data, setData] = useState(null);
  const [cities, setCities] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  /**
   * state filter
   */
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [departureDate, setDepartureDate] = useState();
  const [routeList, setRouteList] = useState([]);

  /**
   * Result after search
   */
  const [trips, setTrips] = useState(null);


  const handleSearch = async () => {
    setLoading(true);

    // make it when filter
    const filteredRoutes = routeList.filter(route => {
      const matchesOrigin = origin ? route.origin?.city_id === origin : true;
      const matchesDestination = destination ? route.destination?.city_id === destination : true;

      return matchesOrigin && matchesDestination;
    });

    const routes = await handleMapStatus(filteredRoutes);
    console.log('search: ', routes);

    setTrips(routes)
    setLoading(false);
  }

  const handleMapSeat = async (routes) => {

    const uniqueBusTypes = [...new Set(routes.map(route => route.bus_type))];

    const busTypeToBusObject = {};
    for (let type of uniqueBusTypes) {
      const busDetails = await fetchFromApi('get_busList', { bus_type: type });
      if (busDetails?.data.length > 0) {
        busTypeToBusObject[type] = busDetails?.data[0];
      }
    }

    // Replace origin and destination IDs with city objects and map bus_type to bus object in the route list
    const mappedRoutes = routes.map(route => ({
      ...route,
      bus_type: busTypeToBusObject[route.bus_type] || { bus_type: route.bus_type, description: "No details available" }
    }));

    return mappedRoutes;
  }

  const handleMapCities = (routeList, cities) => {

    const cityIdToCityObject = cities?.data.reduce((map, city) => {
      map[city.city_id] = city;
      return map;
    }, {});

    const mappedRoutes = routeList?.data.map(route => ({
      ...route,
      origin: cityIdToCityObject[route.origin] || { city_id: route.origin, city_name: "Unknown City" },
      destination: cityIdToCityObject[route.destination] || { city_id: route.destination, city_name: "Unknown City" }
    }));


    return mappedRoutes
  }

  const handleMapRouteTime = async (routes) => {
    const routeIdSet = new Set(routes.map(route => route.id));
    const routeTimingMaps = {};

    for (let routeId of routeIdSet) {
      const timings = await fetchFromApi('get_route_timing', { route_id: routeId });
      timings?.data?.forEach(timing => {
        const key = `${routeId}-${timing.bus_type}`;

        if (!routeTimingMaps[key]) {
          routeTimingMaps[key] = [];
        }
        routeTimingMaps[key].push({
          ...timing
        });
      });
    }



    const routeTimes = routes.map(route => {
      const key = `${route.id}-${route.bus_type?.bus_type}`;
      return {
        ...route,
        timings: routeTimingMaps[key] ? routeTimingMaps[key][0] : null
      };
    });

    return routeTimes;
  }

  const handleMapStatus = async (routes) => {

    const routeResult = [];

    for (let route of routes) {
      const busData = await fetchFromApi('get_bus_status', {
        route_id: route?.id,
        bus_id: route?.bus_type?.id,
        travel_date: departureDate,
        travel_time: route?.timings?.meta_value
      });
      console.log('busData : ', busData);
      
      const seatBooked = busData?.data || null;

      if (seatBooked) {
        route.seatBooked = seatBooked;
        const busStatus = Array.isArray(busData?.data) ? busData.data.map(seat => seat.seat_id) : [];
        const busType = route?.bus_type?.bus_type;
        const busList = await fetchFromApi('get_busList', {
          bus_type: busType
        });
        
        const routeBus = busList?.data?.[0]?.seats_no?.split(',') || [];
        const avalableSeat = routeBus.filter(seat => !busStatus.includes(seat));
        const seatStatus = routeBus.map(seat => {
          
          return {
            seat_id: seat,
            status: busStatus.includes(seat) ? 'booked' : 'available'
          };
        });
        route.allSeat = seatStatus;
        route.seatAvalable = avalableSeat;

        routeResult.push(route);
      }
    }

    return routeResult;
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setLoading(true);
        const routeList = await fetchFromApi('get_routeList');
        const cities = await fetchFromApi('get_cityList');

        let routes = await handleMapCities(routeList, cities);
        routes = await handleMapSeat(routes);
        routes = await handleMapRouteTime(routes);

        const result = await fetchFromApi('get_cityList');

        setCities(result);
        setRouteList(routes);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      <div>
        <div>
          <div className="max-w-7xl mx-auto mt-12 p-6 bg-white shadow-custom rounded-lg border border-gray-200">
            <TitleFilter />

            <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 items-start">
              <TripTypeComponent onChange={(value) => {
                console.log('value : ', value);
              }} />

              <SelectProvince
                title="Origin"
                items={cities?.data}
                onChange={(value) => {
                  setOrigin(value);
                }}
              />

              <SelectProvince
                title="Destination"
                items={cities?.data}
                onChange={(value) => {
                  setDestination(value);
                }}
              />

              <PickDateFilter title={'Departure Date'} onChange={(value) => {
                setDepartureDate(value?.target?.value)
              }} />


              <Button
                type="button"
                onClick={handleSearch}
                className="bg-primary w-32 text-center mt-7 hover:bg-primary "
              >
                Search
              </Button>
            </div>
          </div>
        </div>
        {
          loading ? <>
            <h1>Loading</h1>
          </> : <div className="max-w-7xl py-16 mx-auto">
            {
              trips ? <>
                <AvailableTripItems activeStep={activeStep} trips={trips} cities={cities} departureDate={departureDate} />
              </> : <></>
            }
          </div>
        }
      </div>
    </>
  );
}
