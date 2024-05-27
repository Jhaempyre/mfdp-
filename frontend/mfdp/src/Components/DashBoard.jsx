import React from 'react';
import useAdminStore from '../Zustand/adminStore.js';
import NavBar from './Header/NavBar.jsx';
import DashboardLayout from './MainWorK/DashboardLayout.jsx';



const Dashboard = () => {
  const adminData = useAdminStore((state) => state.adminData);
  const authStatus = useAdminStore((state) => state.authStatus);

  return (
    <div>
    <DashboardLayout/>
      
    </div>
  );
};

export default Dashboard;