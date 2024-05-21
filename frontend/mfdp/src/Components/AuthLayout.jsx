import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminStore from '../Zustand/adminStore';

function AuthLayout({ children, authentication = true }) {
    const isAuth = useAdminStore((state) => state.authStatus.isAuth);
    const adminData = useAdminStore((state) => state.adminData);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (authentication && !isAuth) {
            navigate("/login");
        } else if (!authentication && isAuth) {
            navigate(`/dashboard/${adminData.username}`);
        }
        setLoader(false);
    }, [isAuth, navigate, authentication, adminData.username]);

    return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
