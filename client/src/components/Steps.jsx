import React from 'react';
import { Upload, ImageOff, Download } from 'lucide-react';

const Steps = () => {
  return (
    <div className='mx-4 lg:mx-44 py-20 xl:py-40'>
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent'>
        Steps to remove background <br /> from an image in seconds
      </h1>

      <div className='flex flex-wrap justify-center gap-6 mt-16 xl:mt-24'>

        {/* Step 1 */}
        <div className='flex items-start gap-4 bg-white  drop-shadow-md p-7 pb-10 rounded-md hover:scale-105 transition-all duration-500 max-w-sm'>
          <div className='bg-gradient-to-r from-green-700 to-teal-500 p-2 rounded'>
            <Upload color='white' />
          </div>
          <div>
            <p className='text-xl font-medium'>Upload Image</p>
            <p className='text-sm text-neutral-500 mt-1'>
              Choose an image from your device <br />
              or drag & drop it here instantly.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className='flex items-start gap-4 bg-white  drop-shadow-md p-7 pb-10 rounded-md hover:scale-105 transition-all duration-500 max-w-sm'>
          <div className='bg-gradient-to-r from-green-700 to-teal-500 p-2 rounded'>
            <ImageOff color='white' />
          </div>
          <div>
            <p className='text-xl font-medium'>Remove Background</p>
            <p className='text-sm text-neutral-500 mt-1'>
              Our AI instantly removes the background <br />
              with clean, high-quality results.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className='flex items-start gap-4 bg-white  drop-shadow-md p-7 pb-10 rounded-md hover:scale-105 transition-all duration-500 max-w-sm'>
          <div className='bg-gradient-to-r from-green-700 to-teal-500 p-2 rounded'>
            <Download color='white' />
          </div>
          <div>
            <p className='text-xl font-medium'>Download Image</p>
            <p className='text-sm text-neutral-500 mt-1'>
              Download your image with a transparent <br />
              background in just one click.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Steps;
