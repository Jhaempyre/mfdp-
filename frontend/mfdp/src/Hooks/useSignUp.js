import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"

const useSignUp = () => {
    const [loading, setLoading] = useState(false);

    const signUp = async (formData) => {
        const success = handleInputErrors(formData);
        if (success) return;  //// will strictly chek here 

        setLoading(true);  

            try {
                console.log("Sending request to backend...");
                const res = await axios.post("/api/v1/admin/registerAdmin",formData,
                {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    }
                },);

                console.log('Response:', res);
        
                if (res.data.error) {
                    throw new Error(res.data.error);
                }
        
                toast.success("Registered Successfully, Please Login");
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }

        }
        return { loading, signUp }
    }

    export default useSignUp
// handle input errors

    function handleInputErrors({
        schoolName,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        username,
        schoolAddress,
        schoolMobile,
        adminMobile,
        pincode,
        schoolImage,
        profileImage
    }){

        if (!schoolName||!firstName||!lastName||!email||!password||!confirmPassword||!username||!schoolAddress||!schoolMobile||!adminMobile||!pincode||!schoolProfile||!adminProfile) {
            toast.error("Please fill in all fields");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }
        if (password.length < 8) {
            console.log("radha")
            toast.error("Password must be at least 8 characters");
    }

    return true;
    }    
    






