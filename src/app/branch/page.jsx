import Branch from '@/components/pages/Branch'
import React from 'react'
import { pageMetadata } from '@/app/layout';

export const metadata = pageMetadata.branch;
const page = () => {
  return (
    <div><Branch/></div>
  )
}

export default page