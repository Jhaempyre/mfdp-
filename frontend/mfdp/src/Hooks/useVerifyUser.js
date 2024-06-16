import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAdminStore from "../Zustand/adminStore";

const useVerifyUser = () => {
  const [loading, setLoading] = useState(false);
  const adminStore = useAdminStore();

  const verifyUser = async (email) => {
    setLoading(true);

    try {
      console.log("Connecting to backend for email verification and OTP generation");
      const response = await axios.post(
        "/api/v1/admin/forgetPassword",
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response);
      console.log('Data:', response.data);
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      const token = response.data.data.token;
      console.log(token);
      adminStore.TokenStatus(token);
      toast.success('Email sent successfully');
    } catch (error) {
      console.log(error);
      let errorMessage = error.message;
      // Extract error message before " at " keyword
      const atIndex = errorMessage.indexOf(" at ");
      if (atIndex !== -1) {
        errorMessage = errorMessage.substring(0, atIndex);
      }
      console.log(errorMessage)
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { verifyUser, loading };
};

export default useVerifyUser;
