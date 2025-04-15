import BusBooking from "@/components/pages/Book";
import React, { Suspense } from "react";
import { pageMetadata } from '@/app/layout';
import LoadingComponent from "@/components/layout/Loading";

export const metadata = pageMetadata.book;
const page = () => {

  return <Suspense fallback={<LoadingComponent/>}>
    <BusBooking />
  </Suspense>;
};

export default page;
