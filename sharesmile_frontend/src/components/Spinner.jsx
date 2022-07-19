import React from 'react'
import { Circles } from 'react-loader-spinner';

const Spinner = ({ message }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full mt-20'>
        <Circles 
            type="Circles"
            color="#9ca3af"
            height={50}
            width={200}
            className='m-5'
        />

        <p className='text-lg text-center px-2 text-white mt-5'>{message}</p>
    </div>
  )
}

export default Spinner