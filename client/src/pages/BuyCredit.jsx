import React from 'react'
import { assets, plans } from '../assets/assets'

const BuyCredit = () => {
  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10">
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent sm:mb-10">
        Choose the plan that's right for you
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-10 px-8 w-full sm:w-[300px] md:w-[280px] lg:w-[320px] text-gray-700 hover:scale-105 transition-all duration-700 flex flex-col justify-between"
          >
            <div>
              <img width={40} src={assets.logo1} alt="" />
              <p className="mt-4 font-semibold text-lg">{item.name}</p>

              {/* Features List */}
              <ul className="mt-3 list-disc list-inside text-sm text-gray-600 space-y-1">
                {item.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              <p className="mt-6 text-gray-800">
                <span className="text-3xl font-medium">{item.price}</span>
                <span className="text-sm"> / {item.credits} credits</span>
              </p>
            </div>

            {/* Aligned Button */}
            <button className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyCredit
