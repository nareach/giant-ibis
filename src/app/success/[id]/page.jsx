'use client'
import { use, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import SuccessTitleSecsion from "@/components/pages/SuccessTitleSecsion";
import TicketConfirmation from "@/components/pages/BookSuccess";
import { fetchFromApi } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import LoadingComponent from "@/components/layout/Loading";
import axios from "axios";
import { ACLEDA_BANK_API, ACLEDA_BANK_API_CHECK_STATUS, loginId, merchantID, merchantName, password, signature } from "@/constant/constant";

export default function SuccessPage({ params }) {
  const unwrappedParams = use(params);
  const { id, two } = unwrappedParams;

  const [isLoading, setIsLoading] = useState(false);
  const [bookInfo, setBookInfo] = useState();

  const [depatureTripRoute, setDepatureTripRoute] = useState();

  const [departureRoute, setDepartureRoute] = useState();

  const searchParams = useSearchParams();
  const [isPaid, setIsPaid] = useState();


  const getTransactionStatus = async () => {
    try {
      const _paymenttokenid = searchParams.get('_paymenttokenid');

      let data = JSON.stringify({
        "loginId": loginId,
        "password": password,
        "merchantId": merchantID,
        "signature": signature,
        "merchantName": merchantName,
        "paymentTokenid": _paymenttokenid
      });

      const response = await axios.post(
        ACLEDA_BANK_API_CHECK_STATUS,
        data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('response: ', response.data);

      return response.data
    } catch (error) {
      console.log('error: ', error);
    }

  }


  useEffect(() => {
    const confirmedBook = async () => {
      setIsLoading(true);
      try {

        const transactionStatus = await getTransactionStatus();
        console.log(transactionStatus?.result.errorDetails != 'SUCCESS');
        
        if (transactionStatus?.result.errorDetails != 'SUCCESS') {
          setIsPaid(false);
          return;
        }

        setIsPaid(true);

        const confirmedBookDeparture = await fetchFromApi('confirm_Booking', {
          ref_code: id
        });

        let routeList = await fetchFromApi('get_routeList');
        const cities = await fetchFromApi('get_cityList');



        if (confirmedBookDeparture.status) {
          toast.success('Your booking is confirmed.');

          /**
           * fetch and display booking
           */
          const bookingList = await fetchFromApi('get_booking_detail', {
            email: "nareachkr@gmail.com",
            password: 123456,
          });

          const bookedDeparture = bookingList.data.filter(book => book.ref_code == id);

          if (bookedDeparture?.length > 0) {

            // filter route
            const routeDep = routeList?.data?.filter(route => route.id == bookedDeparture[0].route_id);

            const departureRouteDetail = await handleMapTrip({
              confirmInfo: bookedDeparture[0],
              routes: routeDep,
              cities
            });

            // book confirmed information
            setBookInfo(bookedDeparture[0]);

            // route detail
            setDepartureRoute(departureRouteDetail);

            toast.success('Your booking is already confirmed.');
          }

        } else {
          /**
           * Check it already book ? if not 
           */
          const bookingList = await fetchFromApi('get_booking_detail', {
            email: "nareachkr@gmail.com",
            password: 123456,
          });

          const bookedDeparture = bookingList.data.filter(book => book.ref_code == id);

          if (bookedDeparture?.length > 0) {

            // filter route
            const routeDep = routeList?.data?.filter(route => route.id == bookedDeparture[0].route_id);

            const departureRouteDetail = await handleMapTrip({
              confirmInfo: bookedDeparture[0],
              routes: routeDep,
              cities
            });

            // book confirmed information
            setBookInfo(bookedDeparture[0]);

            // route detail
            setDepartureRoute(departureRouteDetail);

            toast.success('Your booking is already confirmed.');
          } else {
            toast.success('Your booking is not confirmed. Please contact admin for more detail');
          }
        }

      } catch (err) {
        console.log('error confirm: ', err);
      }
      setIsLoading(false);
    };

    confirmedBook();
  }, [id, two]);


  const handleMapTrip = async ({ routes = [], confirmInfo, cities = [] }) => {

    /**
     * 1. Bus detail
     * 2. Timing
     */

    let routeFilter = [];
    routeFilter = (await Promise.all(
      routes?.map(async (route, index) => {

        const timing = await fetchFromApi('get_route_timing', {
          route_id: route?.id
        });

        const routeTiming = timing?.data[index] || null;

        const busType = await fetchFromApi('get_busList', {
          bus_type: route?.bus_type
        });


        const originCity = cities?.data?.find(city => city.city_id === route.origin);
        const destinationCity = cities?.data?.find(city => city.city_id === route.destination);


        return {
          ...route,
          originDetail: originCity,
          destinationDetail: destinationCity,
          timing: routeTiming,
          busType: busType?.data[0]
        }
      })
    )).filter(Boolean);


    /**
     * bus_id,
     * travel_date
     * travel_time
     */
    const finalData = routeFilter?.filter((item, index) =>
      (item?.busType?.id == confirmInfo?.bus_id) &&
      (item?.timing?.meta_value == confirmInfo?.travel_time) &&
      (item?.timing?.meta_id == confirmInfo?.meta_id))

    return finalData?.length > 0 ? finalData[0] : null;
  }

  if (isLoading) {
    return (<LoadingComponent />)
  }

  return (
    <>
      {
        isPaid ? <>
          <div className="flex flex-col justify-center items-center">
            <div className="">
              <SuccessTitleSecsion />
              {
                bookInfo && departureRoute ? <TicketConfirmation book={bookInfo} routeDetail={departureRoute} /> : <></>
              }
            </div>
          </div>
        </> : <>
              Your Payment fail please try again
        </>
      }
    </>
  );
}