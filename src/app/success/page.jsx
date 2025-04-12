'use client';

import TicketConfirmation from "@/components/pages/BookSuccess";
import { ACLEDA_BANK_API_CHECK_STATUS, loginId, merchantID, merchantName, password, signature } from "@/constant/constant";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import axios from 'axios';
import LoadingComponent from "@/components/layout/Loading";
import { decrypt, fetchFromApi } from "@/utils/api";

// Move the main logic to a separate component
const PaymentStatusChecker = () => {
  const searchParams = useSearchParams();
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const _paymenttokenid = searchParams.get('_paymenttokenid');
    const bus_id = searchParams.get('bus_id');
    const mobile = searchParams.get('mobile');
    const route_id = searchParams.get('route_id');

    const checkPaymentStatus = async () => {
      setIsLoading(true);
      try {
        const body = JSON.stringify({
          loginId,
          password,
          merchantId: merchantID,
          signature,
          merchantName: merchantName,
          paymentTokenid: _paymenttokenid,
        });

        const response = await axios.post(
          ACLEDA_BANK_API_CHECK_STATUS,
          body, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const decryptData = decrypt(response?.data?.result?.xTran?.purchaseDesc);
        const purchaseDesc = JSON.parse(decryptData);

        const confirmed = await addBook({
          bus_id,
          bus_type: purchaseDesc?.bus_type,
          fullname: purchaseDesc?.firstname,
          phoneNumber: mobile,
          departureDate: purchaseDesc?.travel_date,
          meta_value: purchaseDesc?.meta_value,
          price: response?.data?.result?.xTran?.purchaseAmount,
          route_id,
          seat_no: purchaseDesc?.seat_no,
          email: purchaseDesc?.email
        });

        setApiResponse(confirmed);
      } catch (err) {
        console.error('Error checking payment status:', err);
        setError(err);
      }
      setIsLoading(false);
    };

    checkPaymentStatus();
  }, [searchParams]);

  const addBook = async (bookData) => {
    const books = {
      ...bookData,
      email: "nareachkr@gmail.com",
      password: 123456,
      surname: bookData.fullname,
      remarks: 'I love giantibis'
    };

    const book = await fetchFromApi('add_booking', books);
    if (book) {
      return await fetchFromApi('confirm_Booking', {
        ref_code: book?.Booking_id,
      });
    }
  }

  if (isLoading) return <LoadingComponent />;
  if (error) return <div>Error: {error.message}</div>;
  
  return <TicketConfirmation />;
};

// Main page component with Suspense boundary
const Page = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <PaymentStatusChecker />
    </Suspense>
  );
};

export default Page;