import React from 'react';
import { Upload } from 'lucide-react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>
      {/* Left side */}
      <div>
        <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>
          Remove  {' '}
<span className='bg-gradient-to-r from-green-700 to-teal-500 text-transparent bg-clip-text'>
  background
</span>{' '}
<br className='max-md:hidden' />from your <br className='max-md:hidden' />images 
in seconds —<br className='max-md:hidden' /> for free

        </h1>

        <p className='my-6 text-[15px] text-gray-500'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          
          Magni odit eius omnis aperiam voluptas <br className='max-sm:hidden' />laboriosam ipsum nam! A nam architecto ipsa nemo
          
          labore dignissimos <br className='max-sm:hidden' />dicta inventore vero, porro aperiam sed.
        </p>

        <div>
          <input type="file" id='upload1' hidden />
          <label
            htmlFor="upload1"
            className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-green-700 to-teal-500 hover:opacity-90 transition'
          >
            <Upload size={20} color='white' />
            <p className='text-white text-sm'>Upload image</p>
          </label>
        </div>
      </div>

      {/* Right side */}
      <div className='w-full max-w-md'>
        <img src={assets.hero2} alt="Hero" className='w-full' />
      </div>
    </div>
  );
};

export default Hero;
