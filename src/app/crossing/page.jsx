import BorderCrossings from '@/components/pages/ border-crossings'
import React from 'react'
import { pageMetadata } from '@/app/layout';

export const metadata = pageMetadata.borderCrossing;
const page = () => {
  return (
    <div><BorderCrossings/></div>
  )
}

export default page