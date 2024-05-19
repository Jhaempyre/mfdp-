import React from 'react';
import useAdminStore from '../Zustand/adminStore.js';

const Dashboard = () => {
  const adminData = useAdminStore((state) => state.adminData);
  const authStatus = useAdminStore((state) => state.authStatus);

  return (
    <div>
      <h1>Dashboard</h1>
      {authStatus ? (
        <pre>{JSON.stringify(adminData, null, 2)}</pre>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Dashboard;