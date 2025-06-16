import React from 'react'
import { assets } from '../assets/assets'

const Result = () => {
  return (
    <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]'>
      <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>
        <div className='flex flex-col sm:grid grid-cols-2 gap-8'>

          {/* Original Image */}
          <div className='h-[400px] w-full'>
            <p className='font-semibold text-gray-600 mb-2'>Original</p>
            <div className='h-full w-full rounded-md border overflow-hidden'>
              <img className='h-full w-full object-contain' src={assets.img_wb} alt="" />
            </div>
          </div>

          {/* Background Removed Image */}
          <div className='h-[433px] w-full flex flex-col'>
            <p className='font-semibold text-gray-600 mb-2'>Background Removed</p>
            <div className='rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden'>
              {/* <img src={assets.img_wo} alt="" className="h-full w-full object-contain" /> */}
              {/* <div className='absolute right-1/2 bottom-1/2 transform translate -x-1/2 translate-y-1/2'>
                <div className='border-8 border-green-600 rounded-full h-12 w-12 border-t-transparent animate-spin'></div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
          <button className='px-8 py-2.5 text-green-600 text-sm border border-green-600 rounded-full hover:scale-105 transition-all duration-700'>
            Another Image
          </button>
          <a
            className='px-8 py-2.5 text-white text-sm border bg-gradient-to-r from-green-600 to-green-800 rounded-full hover:scale-105 transition-all duration-700'
            href="Download Image"
          >
            Download Image
          </a>
        </div>
      </div>
    </div>
  )
}

export default Result
