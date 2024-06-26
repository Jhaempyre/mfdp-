import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useUpdateStore from "../Zustand/updateStore";

const useEditUpdate = ()=>{
    const updateStore = useUpdateStore()
    const updatedData = useUpdateStore((state)=>state.updates)
    const [loadin,setLoading] = useState(false)

    const editUpdate = async(Edits)=>{
        setLoading(true)
        try {
            console.log("Sendig request to backend for edit of Updates")
            const response = await axios.post(
                "/api/v2/update/editUpdate",
                Edits,
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
            toast.success("Update Edited Successfully");
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }finally{
            setLoading(false);
    }
    };
    return {editUpdate,loadin}

}
export default useEditUpdate;