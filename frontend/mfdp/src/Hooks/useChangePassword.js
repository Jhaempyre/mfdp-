import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAdminStore from "../Zustand/adminStore";
import { useNavigate } from "react-router-dom";
const useChangePassword = ()=>{
    const [loadeng,setLoading] = useState(false)
    const adminStore = useAdminStore();
    const navigate = useNavigate();
    const useChange =  async(newPassword)=>{
        setLoading(true);

        try {
            console.log("Hitting an API to backend for change in password")
            const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            const response = await axios.post(
                "/api/v1/admin/changePassword",
                {
                    newPassword
                },{
                    headers:{
                        'Content-Type': 'application/json',
                    }
            }
            )
            console.log('Response:', response);
            console.log('Data:', response.data);
            if (response.data.error) {
                throw new Error(response.data.error);
              }
            if(response.data.success){
                toast.success("Password changed successfully");
            }
            toast.success("You will be redirected to Login page in 5 seconds")
            await delay(2000);
            adminStore.otpverify(false)
            console.log("Token removed")
            await delay(2000);
            adminStore.RemoveToken(),
            console.log("Temporarily logout done")
            navigate("/login")
            } catch (error) {
            toast.error(error.message)
        }finally {
            setLoading(false);
        }
    }

    return {loadeng,useChange}
}

export default useChangePassword