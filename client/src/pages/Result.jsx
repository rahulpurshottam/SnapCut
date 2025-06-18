import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const {
    resultImage,
    image,
    setImage,
    setResultImage,
  } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (image && typeof image !== 'string') {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  useEffect(() => {
    if (!image || !resultImage) {
      navigate('/');
    }
  }, [image, resultImage, navigate]);

  return (
    <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]'>
      <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>
        <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
          {/* Original Image */}
          <div className='h-[400px] w-full'>
            <p className='font-semibold text-gray-600 mb-2'>Original</p>
            <div className='h-full w-full rounded-md border overflow-hidden'>
              {image && (
                <img
                  className='h-full w-full object-contain'
                  src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                  alt="Original"
                />
              )}
            </div>
          </div>

          {/* Background Removed Image */}
          <div className='h-[433px] w-full flex flex-col'>
            <p className='font-semibold text-gray-600 mb-2'>Background Removed</p>
            <div className='rounded-md border border-gray-300 h-full bg-layer overflow-hidden'>
              {resultImage && (
                <img
                  src={resultImage}
                  alt="Background Removed"
                  className="h-full w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {resultImage && (
          <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
            <button
              className='px-8 py-2.5 text-[#4d621a] text-sm border border-[#84b211] rounded-full hover:scale-105 transition-all duration-700'
              onClick={() => {
                setImage(null);
                setResultImage(null);
                navigate('/');
              }}
            >
              Another Image
            </button>
            <a
              download
              href={resultImage}
              className='px-8 py-2.5 text-white text-sm border bg-gradient-to-r from-[#84b211] to-[#4d621a] rounded-full hover:scale-105 transition-all duration-700'
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
