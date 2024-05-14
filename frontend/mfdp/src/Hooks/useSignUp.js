import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"

const useSignUp = ()=>{
    const [loading, setLoading] = useState(false);

    const signUp = async({
        schoolName,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        username,
        schoolAddress,
        schoolNumber,
        adminMobile,
        pincode,
        schoolProfile,
        adminProfile
    })=>{
     const success = handleInputErrors({
            schoolName,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            username,
            schoolAddress,
            schoolNumber,
            adminMobile,
            pincode,
            schoolProfile,
            adminProfile});
            if (!success) return;
            setLoading(true);    

            try {
                const res = await axios("/api/v1/admin/registerAdmin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        schoolName,
                        firstName,
                        lastName,
                        email,
                        password,
                        confirmPassword,
                        username,
                        schoolAddress,
                        schoolNumber,
                        adminMobile,
                        pincode,
                        schoolProfile,
                        adminProfile}),
                });

            const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
            toast.success("Registered Suceesfully , Please Login")
            }
            catch (error) {
                toast.error(error.message);
            }
            finally {
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
        schoolNumber,
        adminMobile,
        pincode,
        schoolProfile,
        adminProfile
    }){

        if (!schoolName||!firstName||!lastName||!email||!password||!confirmPassword||!username||!schoolAddress||!schoolNumber||!adminMobile||!pincode||!schoolProfile||!adminProfile) {
            toast.error("Please fill in all fields");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
    }

    return true;
    }    
    

