import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAdminStore from "../Zustand/adminStore.js";



const useOneTimePayment = ()=>{
    const [loading,setLoading]= useState('false')
    const adminData = useAdminStore((state) => state.adminData);

    const oneTimePayment = async(amount)=>{
        setLoading(true)
        try {
            console.log("sending request to backend for craeating an order and payment")
            const response = await axios.post(
                "/api/v3/raz_pay/payCheckOut",
            {
                amount
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log("payment response",response)
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            toast.success("Order Created Sucessfully");
            console.log(response.data)
            const order = response.data.data
            console.log(order)
            console.log(window)
            console.log("sending request to get key")
            const resp =await axios.get("/api/getkey")
            console.log(resp)
            const key = resp.data.data.key
            console.log(key)
            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "JhaEmpire",
                description: "Payment for 1 month at EduTech",
                image: adminData.schoolImage,
                order_id: order.id,
                callback_url: "http://localhost:8000/api/v3/raz_pay/paymentVerify",
                prefill: {
                    name: adminData.schoolName,
                    email: adminData.email,
                    contact: adminData.schoolMobile
                },
                notes: [{
                    "address": "572, Agrawaal towers , Netaji Subhash Palace",
                    "amount":order.amount,
                }],
                theme: {
                    "color": "#121212"
                }
            };
            console.log(options)
            const razor = new window.Razorpay(options);
            razor.open();
            toast.success("payment was Successfull")
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {oneTimePayment,loading}
}

export default useOneTimePayment