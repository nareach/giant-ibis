import About from '@/components/pages/About'
import React from 'react'
import { pageMetadata } from '@/app/layout';

export const metadata = pageMetadata.about;
const page = () => {
  return (
    <div><About/></div>
  )
}

export default page