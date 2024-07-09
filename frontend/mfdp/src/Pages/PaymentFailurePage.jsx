// PaymentFailurePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminStore from '../Zustand/adminStore';

const PaymentFailurePage = () => {
  const navigate = useNavigate();
  const { paymentStatus, pageStatus, adminData } = useAdminStore();
  const [username, setUsername] = useState('');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    paymentStatus(false);
    pageStatus("Payment_Gateway");
    
    if (adminData && adminData.username) {
      setUsername(adminData.username);
    }
  }, []);

  useEffect(() => {
    const redirectTimer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectAfterDelay = setTimeout(() => {
      clearInterval(redirectTimer);
      if (username) {
        navigate(`/dashboard/Payment_Gateway/${username}`);
      } else {
        console.error("Username is undefined");
        navigate('/dashboard');
      }
    }, 5000);

    return () => {
      clearTimeout(redirectAfterDelay);
      clearInterval(redirectTimer);
    };
  }, [navigate, username]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="mx-auto w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Failed</h1>
        <p className="text-gray-600 mb-6">We're sorry, but your payment couldn't be processed.</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${(countdown / 5) * 100}%` }}></div>
        </div>
        <p className="text-sm text-gray-500">
          Redirecting to payment gateway in {countdown} seconds...
        </p>
      </div>
    </div>
  );
};

export default PaymentFailurePage;