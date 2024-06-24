import React from 'react';
import useAdminStore from '../Zustand/adminStore.js';
import NavBar from './Header/NavBar.jsx';
import DashboardLayout from './MainWorK/DashboardLayout.jsx';
import LatestUpdateViewAndEditPage from '../Pages/LatestUpdateViewAndEditPage.jsx';



const Dashboard = () => {
  //const adminData = useAdminStore((state) => state.adminData);
  //const authStatus = useAdminStore((state) => state.authStatus);

  return (
    <div>
    <LatestUpdateViewAndEditPage/>
      
    </div>
  );
};

export default Dashboard;