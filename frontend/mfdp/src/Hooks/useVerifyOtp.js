import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAdminStore from "../Zustand/adminStore";


const useVerifyOtp = ()=>{
    const [loadin, setLoading] = useState(false);
    const adminStore = useAdminStore();
    const verifyOtp = async(otp)=>{
        try {
            console.log("Requesting to backend to verify OTP sent on mail")
            const response = await axios.post(
                "/api/v1/admin/ValidatedOtp" ,
                 {otp},{
                    headers: {
                      'Content-Type': 'application/json',
                      },
                     });
            console.log('Response:', response);
            console.log('Data:', response.data);
            if (response.data.error) {
                throw new Error(response.data.error);
              }
            adminStore.otpverify(true)
        } catch (error) {
            toast.error("Invalid OTP , Try again ")
        }finally {
            setLoading(false);
          }
    }

    return {loadin,verifyOtp}

} ; 

export default useVerifyOtp