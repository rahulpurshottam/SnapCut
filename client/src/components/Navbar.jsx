import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CreditCard } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn]);

  return (
    <nav className="bg-[#191a17] flex justify-between items-center px-4 py-3 lg:px-44 shadow-sm ">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={assets.logo} alt="Logo" className="h-18 w-auto" />
      </Link>

      {/* Right Section */}
      {isSignedIn ? (
        <div className="flex items-center gap-2 sm:gap-3 ">
          <button
            onClick={() => navigate('/plans')}
            disabled={credit === null}
            className="flex items-center gap-2 bg-[#84b211] px-4 sm:px-2 py-1.5 rounded-full text-sm"
          >
            <CreditCard size={18} color='black' />
            <p className="text-xs sm:text-sm font-medium text-black ">
              Credits: {credit !== null ? credit : ''}
            </p>
          </button>
          <p className="text-white max-sm:hidden">Hi, {user?.fullName?.split(' ')[0]}</p>
<UserButton
  appearance={{
    elements: {
      userButtonAvatarBox: "border-3 border-white hover:border-[#84b211] transition",
    },
  }}
/>        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className="flex items-center gap-2 bg-[#84b211] text-black px-5 py-2.5 sm:px-8 sm:py-3 text-sm rounded-full border-2 border-black hover:bg-[#a2ba63] transition-colors duration-300 cursor-pointer"
        >
          Get Started <ArrowRight size={18} />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
