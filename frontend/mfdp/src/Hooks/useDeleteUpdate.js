import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAdminStore from "../Zustand/adminStore";

const useDeleteUpdate = ()=>{
    const [loadeng,setLoading] = useState(false)


    const deleteUpdate = async(del)=>{
        setLoading(true)
        try {
            console.log("Sendig request to backend for Deleting the update")
            const response = await axios.post(
                "/api/v2/update/deleteUpdate",
                del,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            console.log('Response:', response);
            console.log('Data',response.data)
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            toast.success("Update Deleted Successfully");
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }finally{
            setLoading(false);
    }
    };
    return {deleteUpdate,loadeng}

}
export default useDeleteUpdate;