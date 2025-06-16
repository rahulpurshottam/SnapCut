import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const {isSignedIn,user} = useUser();

  return (
    <nav className="flex justify-between items-center px-4 py-3 lg:px-44 shadow-sm">
      <Link to="/" className="flex items-center">
        <img
          src={assets.logo}
          alt="Logo"
          className="h-10 w-auto"
        />
      </Link>
{
  isSignedIn
  ?<div>
    <UserButton/>
  </div>
  : <button
        onClick={() => openSignIn({})}
        className="flex items-center gap-2 bg-black text-white px-5 py-2.5 sm:px-8 sm:py-3 text-sm rounded-full border-2 border-black hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
      >
        Get Started <ArrowRight size={18} />
      </button>
}
     
    </nav>
  );
};

export default Navbar;
