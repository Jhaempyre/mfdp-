// PaymentSuccess.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminStore from '../Zustand/adminStore';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { paymentStatus, pageStatus, adminData } = useAdminStore();
  const [username, setUsername] = useState('');

  useEffect(() => {
    paymentStatus(true);
    pageStatus("Latest_Update");
    
    if (adminData && adminData.username) {
      setUsername(adminData.username);
    }
  }, []);

  useEffect(() => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const redirectAfterDelay = async () => {
      try {
        console.log("ram");
        await delay(5000);
        if (username) {
          navigate(`/dashboard/Latest_Update/${username}`);
        } else {
          console.error("Username is undefined");
          // Navigate to a fallback route
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Error in redirect:", error);
      }
    };

    redirectAfterDelay();
  }, [navigate, username]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Payment Successful!</h1>
      <p>Redirecting to home page in 5 seconds...</p>
    </div>
  );
};

export default PaymentSuccessPage;