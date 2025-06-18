import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';

const Slider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="pb-10 md:py-20 mx-2 ">
      <h1 className="mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
        Remove Background with <br /> high quality and accuracy
      </h1>

      {/* Image Wrapper */}
      <div
        className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl"
        
      >

        {/* Visible image (Before) */}
        <img
          src={assets.img_wb}
          alt="With Background"
          style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
        />

        {/* Visible image (After) */}
        <img
          className="absolute top-[-5px] sm:top-[-10px] left-0 w-full h-full"
          src={assets.img_wo}
          alt="Without Background"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        />
      {/* Slider */}
 <input
    type="range"
    min={0}
    max={100}
    value={sliderPosition}
    onChange={handleSliderChange}
    className="slider absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-full w-full z-10"
    
  />
  </div>
    </div>
  )
};

export default Slider;
