import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAdminStore from "../Zustand/adminStore.js";
import { useNavigate } from "react-router-dom";
import useUpdateStore from "../Zustand/updateStore.js";

const useLogIn = () => {
    const [loading, setLoading] = useState(false);
    const adminStore = useAdminStore(); 
    const navigate = useNavigate();
   const updateStore = useUpdateStore();

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
            console.log("sending request to backend for getting all updates ")
            const getUpdate = await axios.get("/api/v2/update/viewUpdates",{
 
            headers: {
            'Content-Type': 'application/json',
            },
            });
            console.log('Response:', response);
            console.log('Data',response.data)
            console.log("updates",getUpdate);
            console.log("data",getUpdate.data.data)
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            if (getUpdate.data.error){
                console.log("error in getting updates",getUpdate.data.error);
                throw new Error(getUpdate.data.error)
              }
            const adminData = response.data.data.Admin;
            const zam = updateStore.getUpdate(getUpdate.data.data)
            console.log(adminData),
            console.log("zam",zam)
            adminStore.loggedAdmin(adminData);
            console.log('Admin Data:', adminData);
            adminStore.authStatus(true)
            toast.success('Logged in successfully!');
            navigate(`/dashboard/${adminStore.currentPage}/${adminData.username}`);
            toast.success("Logged in Successfully");
            toast.success("All Updates Received")
        } catch (error) {
            toast.error(error.message);
            console.log(error.message)
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
