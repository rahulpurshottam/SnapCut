import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const BuyCredit = () => {
  const { backendUrl, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credit Purchase',
      order_id: order.id,
      handler: async (response) => {
        console.log('Payment Response:', response);
        const token=await getToken()
        try {
          const {data}=await axios.post(backendUrl+'/api/user/verify-payment',response,{headers:{token}})
          if (data.success) {
            loadCreditsData()
            navigate('/')
            toast.success("Credit Added")
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
          
        }
        await loadCreditsData();
        navigate('/');
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentrazorpay = async (planId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-razorpay`,
        { planId },
        { headers: { token } }
      );

      if (data.success && data.order) {
        initPay(data.order);
      } else {
        toast.error(data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error(error?.response?.data?.message || error.message || 'Payment initiation failed');
    }
  };

  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10">
      <h1 className="text-2xl font-semibold mb-10">
        Choose the plan that's right for you
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left">
  {plans.map((item) => (
    <div key={item.id} className="flip-card w-full sm:w-72 h-[400px]">
      <div className="flip-inner w-full h-full">

        {/* Front Side */}
        <div className="flip-front bg-white shadow rounded-lg py-10 px-8 w-full h-full flex flex-col justify-between">
          <div>
            <img width={40} src={assets.logo1} alt="" />
            <p className="mt-4 font-semibold text-lg">{item.name}</p>
            <ul className="mt-3 list-disc list-inside text-sm text-gray-600 space-y-1">
              {item.features.map((feature, index) => (
                <li key={`${item.id}-feature-${index}`}>{feature}</li>
              ))}
            </ul>
            <p className="mt-6 text-gray-800">
              <span className="text-3xl font-medium">{item.price}</span>
              <span className="text-sm"> / {item.credits} credits</span>
            </p>
          </div>
        </div>

        {/* Back Side */}
        <div className="flip-back bg-[#f5f5f5] shadow rounded-lg py-10 px-8 w-full h-full flex flex-col justify-between">
          <div className="text-center">
            <p className="text-lg font-semibold mb-4">Ready to go?</p>
            <p className="text-sm text-gray-600 mb-6">
              Click below to purchase the <strong>{item.name}</strong> plan and get started!
            </p>
          </div>
          <button
            onClick={() => paymentrazorpay(item.id)}
            className="bg-gradient-to-r from-[#84b211] to-[#4d621a] text-white py-2 rounded-full transition"
          >
            Get Started
          </button>
        </div>

      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default BuyCredit;
