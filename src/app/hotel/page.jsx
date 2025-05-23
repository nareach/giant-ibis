import HotelListings from "@/components/pages/Hotel";
import React from "react";
import { pageMetadata } from '@/app/layout';

export const metadata = pageMetadata.hotels;
const page = () => {
  return <div >
    <HotelListings/>
  </div>;
};

export default page;
