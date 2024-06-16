import React, { useState } from 'react';
import useAdminStore from '../Zustand/adminStore.js';
import toast, { Toaster } from 'react-hot-toast';
import useVerifyUser from '../Hooks/useVerifyUser.js';
import useVerifyOtp from '../Hooks/useVerifyOtp.js';

function VerifyUser() {
  const [inputs, setInputs] = useState({
    email: "",
    otp: ""
  });

  const { verifyUser, loading } = useVerifyUser();
  const {verifyOtp,loadin} = useVerifyOtp();
  const adminStore = useAdminStore();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    await verifyUser(inputs.email);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    await verifyOtp(inputs.otp);
    toast.success('OTP verified successfully');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-500">
      <Toaster /> {/* Add this line to enable toasts */}
      <div className="flex space-x-4">
        {/* Verification message box */}
        <div className="bg-white p-8 shadow-lg rounded-lg max-w-sm" style={{ maxWidth: '600px' }}>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Please verify <span style={{ color: 'green' }}>Yourself</span>
          </h2>
          <hr />
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-gray-800">Please Enter Your registered Email address.</span>
            </div>
            <input
              type="email"
              placeholder="any@domain.com"
              className="input input-bordered w-full max-w-xs"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <div className="label"></div>
          </label>
          <button onClick={handleEmailSubmit} className="btn btn-success mt-1">
            {loading ? 'Verifying...' : 'Verify and Send OTP'}
          </button>
        </div>

        {/* OTP verification box */}
        {adminStore.passwordtoken && (
          <div className="bg-white p-8 shadow-lg rounded-lg max-w-sm" style={{ maxWidth: '600px' }}>
            <h2 className="text-center text-2xl font-bold leading-tight">
              Enter OTP <span style={{ color: 'blue' }}>sent to your email</span>
            </h2>
            <hr />
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-gray-800">Please Enter OTP</span>
              </div>
              <input
                type="text"
                placeholder="OTP"
                className="input input-bordered w-full max-w-xs"
                value={inputs.otp}
                onChange={(e) => setInputs({ ...inputs, otp: e.target.value })}
              />
              <div className="label"></div>
            </label>
            <button onClick={handleOtpSubmit} className="btn btn-primary mt-1">
              Verify OTP
            </button>
          </div>
        )}

        {/* Password change box */}
        {adminStore.otpVerified && (<div className="bg-white p-8 shadow-lg rounded-lg max-w-sm" style={{ maxWidth: '600px' }}>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Please change your <span style={{ color: 'red' }}>Password</span>
          </h2>
          <hr />
        </div>)}
      </div>
    </div>
  );
}

export default VerifyUser;
