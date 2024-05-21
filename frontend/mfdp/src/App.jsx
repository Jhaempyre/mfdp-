import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FrontPage from './Components/FrontPage'
import './App.css'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import { Toaster } from 'react-hot-toast';
import Dashboard from './Components/DashBoard'
import useAdminStore from './Zustand/adminStore'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const adminData = useAdminStore((state) => state.adminData);
  const authStatus = useAdminStore((state) => state.authStats);
  console.log("bhai",adminData)
  console.log("raga",authStatus)
  useEffect(() => {
    const fetchUserData = async () => {
      if (authStatus) {
        console.log("User is already authenticated");
        setLoading(false);
      } else {
        try {
          console.log("Sending request to backend...");
          const response = await axios.get("/api/v1/admin/getUser", {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Response:', response);

          if (response.data.error) {
            throw new Error(response.data.error);
          }
          const adminData = response.data.data.Admin;
          adminData.loggedAdmin(adminData);
          console.log('Admin Data:', adminData);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while loading
  }

  return (
<main>
  <Outlet />
</main>
  );
}

export default App;

