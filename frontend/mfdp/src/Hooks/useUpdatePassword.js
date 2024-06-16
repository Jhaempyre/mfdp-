import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAdminStore from "../Zustand/adminStore";
import { useNavigate } from "react-router-dom";

const useUpdatePassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const adminStore = useAdminStore();

    const updateCred = async (formData) => {
        setLoading(true);
        try {
            console.log("connecting to backend for Updating Password");
            const response = await axios.post(
                "/api/v1/admin/updatePassword",
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log("response", response.data); // Log the entire response data for debugging
            if (response.data.success) {
                toast.success("Password updated successfully");
                console.log(adminStore.adminData.username);
                navigate(`/dashboard/${adminStore.adminData.username}`);
            } else if (response.data.error) {
                throw new Error(response.data.error);
            } else {
                throw new Error("Unknown response from server");
            }
        } catch (error) {
            console.error("Error updating password:", error); // Log the error for debugging
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { updateCred, loading };
};

export default useUpdatePassword;
