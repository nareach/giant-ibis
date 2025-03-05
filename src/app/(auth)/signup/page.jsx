
import RegistrationForm from '@/components/pages/Signup'
import React from 'react'
import { pageMetadata } from '@/app/layout';

export const metadata = pageMetadata.signup;
const page = () => {
  return (

    <div><RegistrationForm/></div>
  )
}

export default page