import React from 'react'
import { assets } from '../assets/assets'
import { FaFacebookF, FaTwitter, FaGooglePlusG } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 px-4 lg:px-44 py-3 bg-[#191a17]'>
        <img src={assets.logo} alt="" width={150} />
        <p className="flex-1 border-gray-400 pl-4 text-sm text-white max-sm:hidden">
                 |&nbsp; © 2025 All Rights Reserved
</p>
            <div className="flex gap-4">
                <FaFacebookF width={50} className="text-white hover:text-blue-600 transition text-xl" />
                <FaTwitter width={50} className="text-white hover:text-blue-600 transition text-xl" />
                <FaGooglePlusG width={50} className="text-white hover:text-blue-600 transition text-xl" />
            </div>
        

    </div>
  )
}

export default Footer