import React from 'react'
import { testimonials } from '../assets/assets'

const Testimonials = () => {
  return (
<div className="py-16 bg-gray-50">
  <h1 className="mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
    Customer Testimonials
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto px-6">
    {testimonials.map((item, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-500"
      >
        <p className="text-5xl text-gray-600 leading-none">“</p>
        <p className="text-gray-600 text-base italic mt-2">{item.message}</p>

        <div className="flex items-center gap-4 mt-6">
          <img
            className="w-10 h-10 object-cover rounded-full border-2 border-gray-200"
            src={item.image}
            alt={item.name}
          />
          <div>
            <p className="font-semibold text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-500">{item.role}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default Testimonials