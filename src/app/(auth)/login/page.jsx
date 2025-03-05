
import LoginForm from '@/components/pages/Login'
import React from 'react'
import { pageMetadata } from '@/app/layout';

export const metadata = pageMetadata.login;
const page = () => {
  return (

    <div><LoginForm/></div>

  )
}

export default page