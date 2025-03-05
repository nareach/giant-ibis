import BlogListing from "@/components/pages/Blog";
import React from "react";
import { pageMetadata } from '@/app/layout';

export const metadata = pageMetadata.blog;
const page = () => {
  return <div>
    <BlogListing/>

  </div>;
};

export default page;
