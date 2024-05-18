import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useLogIn = () => {
    const [loading, setLoading] = useState(false);

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
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            toast.success("Logged in Successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logIn };
};

function handleInputErrors(email, password) {
    if (!email || !password) {
        toast.error("Please fill all the fields");
        return false;
    } else {
        return true;
    }
}

export default useLogIn;
