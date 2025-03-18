import BusBooking from "@/components/pages/Book";
import React from "react";
import { pageMetadata } from '@/app/layout';
import LoadingComponent from "@/components/layout/Loading";

export const metadata = pageMetadata.book;
const page = () => {

  return <div><BusBooking/></div>;
};

export default page;
