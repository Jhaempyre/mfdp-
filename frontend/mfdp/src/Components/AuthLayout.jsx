import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import useAdminStore from "../Zustand/adminStore";

function AuthLayout({children, authentication = true}) {
    const adminStore = useAdminStore(); 
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const isAuth = adminStore((state) => state.authStatus)
    useEffect(() => {
        if(authentication && isAuth !== authentication){
            navigate("/login")
        } else if(!authentication && isAuth !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[isAuth, navigate, authentication]
)
  return loader ? <h1>Loading...</h1> : <>{children}</>
}


export default AuthLayout