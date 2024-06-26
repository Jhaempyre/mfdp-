import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAdminStore from "../Zustand/adminStore";
import { useNavigate } from "react-router-dom";
import useUpdateStore from "../Zustand/updateStore";

const useAddUpdate = ()=>{
    const navigate = useNavigate();
    const updateStore = useUpdateStore()
    const updatedData = useUpdateStore((state)=>state.updates)
    const [loading,setLoading] = useState(false)

    const addUpdate = async(newUpdate)=>{
        setLoading(true)
        try {
            console.log("Requesting backend for the add new update")
            const response = await axios.post(
                "/api/v2/update/addUpdate",
                newUpdate,
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
            toast.success("Update Updated  Successfully");
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    };

    return {loading,addUpdate}
}

export default useAddUpdate ;
