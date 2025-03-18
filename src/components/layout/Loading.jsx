import React from 'react'

export default function LoadingComponent() {
  return (
    <div className='fixed top-0 left-0 bg-white opacity-80 w-full h-full z-50 flex justify-center items-center'>
        <img src="/assets/icons/spinner.svg" alt="" />
    </div>
  )
}
