import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAdminStore from "../Zustand/adminStore";
import { useNavigate } from "react-router-dom";

const useLogIn = () => {
    const [loading, setLoading] = useState(false);
    const adminStore = useAdminStore(); 
    const navigate = useNavigate();
   

    const logIn = async (formData) => {
        const success = handleInputErrors(formData);
        if (success) return;

        setLoading(true);

        try {
            console.log("Sending request to backend...");
            const response = await axios.post(
                "/api/v1/admin/adminLogin",
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Response:', response);
            console.log('Data',response.data)
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            const adminData = response.data.data.Admin;
            console.log(adminData),
            adminStore.loggedAdmin(adminData);
            console.log('Admin Data:', adminData);
            adminStore.authStatus(true)
            toast.success('Logged in successfully!');
            navigate(`/dashboard/${adminData.username}`);
            toast.success("Logged in Successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logIn };
};
//Do some debugging with formData here it's needed 
function handleInputErrors(email, password) {
    if (!email || !password) {
        toast.error("Please fill all the fields");
        return false;
    } else {
        return true;
    }
}

export default useLogIn;
