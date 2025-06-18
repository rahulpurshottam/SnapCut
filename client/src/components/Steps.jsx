import React from 'react';
import { Upload, ImageOff, Download } from 'lucide-react';

const steps = [
  {
    title: 'Upload Image',
    description: 'Choose an image from your device or drag & drop it here instantly.',
    icon: <Upload color='white' />,
  },
  {
    title: 'Remove Background',
    description: 'Our AI instantly removes the background with clean, high-quality results.',
    icon: <ImageOff color='white' />,
  },
  {
    title: 'Download Image',
    description: 'Download your image with a transparent background in just one click.',
    icon: <Download color='white' />,
  },
];

const Steps = () => {
  return (
    <div className='mx-4 lg:mx-44 py-20 xl:py-40 bg-gray-50'>
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent'>
        Steps to remove background <br /> from an image in seconds
      </h1>

      <div className='flex flex-wrap justify-center gap-8 mt-16 xl:mt-24'>
        {steps.map((step, idx) => (
          <div
            key={idx}
            className='flex items-start gap-4 bg-white drop-shadow-md p-6 sm:p-7 rounded-xl hover:scale-105 transition-transform duration-500 max-w-sm'
          >
            <div className='bg-gradient-to-r from-[#84b211] to-[#4d621a] p-2 rounded'>
              {step.icon}
            </div>
            <div>
              <p className='text-xl font-semibold'>{step.title}</p>
              <p className='text-sm text-neutral-600 mt-2 leading-relaxed'>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
