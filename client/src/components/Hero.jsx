import React, { useContext, useState } from 'react';
import { Upload } from 'lucide-react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { removeBg, credit } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    setLoading(true);
    await removeBg(file);
    setLoading(false);
    navigate('/result');
  };

  return (
    <div className='relative'>
      {/* Spinner overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="border-8 border-[#84b211] rounded-full h-16 w-16 border-t-transparent animate-spin"></div>
        </div>
      )}

      <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>
        {/* Left side */}
        <div>
          <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[#191a17] leading-tight'>
            Remove{' '}
            <span className='bg-gradient-to-r from-[#84b211] to-[#4d621a] text-transparent bg-clip-text'>
              background
            </span>{' '}
            <br className='max-md:hidden' />
            from your <br className='max-md:hidden' />
            images in seconds —
            <br className='max-md:hidden' />
            for free
          </h1>

          <p className='my-6 text-[15px] text-gray-500'>
            Upload your image to remove its background with AI.
            Fast, easy, and free.
          </p>

          <div>
            <input
              onChange={e => handleUpload(e.target.files[0])}
              type="file"
              accept="image/*"
              id="upload1"
              hidden
            />

            <label
              htmlFor={credit > 0 ? 'upload1' : undefined}
              onClick={() => {
                if (credit === 0) navigate('/plans');
              }}
              className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-[#84b211] to-[#4d621a] hover:opacity-90 transition'
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
    </div>
  );
};

export default Hero;
