import CRS from '@/components/pages/Crs'
import React from 'react'
import { pageMetadata } from '@/app/layout';

export const metadata = pageMetadata.crs;
const page = () => {
  return (
    <div><CRS/></div>
  )
}

export default page