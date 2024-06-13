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
import NavBar from './Components/Header/NavBar'

function App() {
  const [loading, setLoading] = useState(true);
  const adminData = useAdminStore((state) => state.adminData);
  const authStatus = useAdminStore((state) => state.authStats);
  const navigate = useNavigate();
  console.log("bhai",adminData)
  console.log("raga",authStatus)
  useEffect(() => {
    const fetchUserData = async () => {
     try {
       console.log("connecting to backend for , health chek ")
       const serverHealthcheck = await axios.get("/api/healthchek/servercheck",{
 
         headers: {
           'Content-Type': 'application/json',
           },
       });
       console.log("serverHealthcheck",serverHealthcheck)
       if (serverHealthcheck.data.error) {
         throw new Error(serverHealthcheck.data.error);
       }
       toast.success("server is connected .")
     } catch (error) {
      console.log(error.message);
      toast.error(error.message);
     }
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
          console.log(error.message);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  if (authStatus) {
    return (
    <div>
    <NavBar/>
    <main>
    <Toaster/>
    <Outlet />
  </main>
  </div>
    )
  }
else{
  return (
<main>
  <Toaster/>
  <Outlet />
</main>
  );
}
}

export default App;

