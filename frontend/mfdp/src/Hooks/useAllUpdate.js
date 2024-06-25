/*import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAdminStore from "../Zustand/adminStore";
import { useNavigate } from "react-router-dom";
import useUpdateStore from "../Zustand/updateStore";

const useAllUpdate = () =>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const updateStore = useUpdateStore()

    const getUpdate = async()=>{
        setLoading(true)
        try {
            console.log("Sending request to backend for getting updates")
            const response = await axios.get("/api/v2/update/viewUpdates", {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              console.log('Response:', response);
              console.log('Data',response.data)
              if (response.data.error) {
                  throw new Error(response.data.error);
              }
              toast.success('Got All Your Updates.');
              updateStore.getUpdate(response.data)
            
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    };
    return {getUpdate,loading};
}

export default useAllUpdate ;*/