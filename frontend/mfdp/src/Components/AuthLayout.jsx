import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminStore from '../Zustand/adminStore';

function AuthLayout({ children}) {
    const isAuth = useAdminStore((state) => state.authStats);
    const adminData = useAdminStore((state) => state.adminData);
    const adminStore = useAdminStore();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (isAuth) {
            navigate(`/dashboard/${adminStore.currentPage}/${adminData.username}`);
        } else  {
            navigate("/login");
        }
        setLoader(false);
    }, [isAuth, navigate,  adminData.username]);

    return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
