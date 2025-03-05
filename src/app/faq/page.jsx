import FAQ from '@/components/pages/Faq'
import React from 'react'
import { pageMetadata } from '@/app/layout';

export const metadata = pageMetadata.faq;
const page = () => {
  return (
    <div><FAQ/></div>
  )
}

export default page