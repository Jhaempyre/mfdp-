import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../Zustand/adminStore";

const useLogOut = ()=>{
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const adminStore = useAdminStore(); 
    const logOut = async ()=>{
        setLoading(true);

        try {
            adminStore.authStatus(false)
            console.log("Sending Request to backend for Logout")
            const result = await axios.post("/api/v1/admin/logoutAdmin"
                , {}, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            console.log(result);
            if (result.data.error) {
                throw new Error(result.data.error);
            }
            console.log("DELHI")
            adminStore.logout()
            console.log("clientside")
            adminStore.authStatus(false)
            console.log("Cahndi")
            toast.success('Logged Out successfully!');
            navigate(`/login`);
            
        } catch (error) {
            toast.error(error.message)
        }finally {
            setLoading(false);
        }
        
    }
    return { loading, logOut };
}

export default useLogOut