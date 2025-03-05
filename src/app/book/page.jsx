import BusBooking from "@/components/pages/Book";
import React from "react";
import { pageMetadata } from '@/app/layout';

export const metadata = pageMetadata.book;
const page = () => {
  return <div><BusBooking/></div>;
};

export default page;
