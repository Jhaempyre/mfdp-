import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUp from './Components/SignUp.jsx'
import LogIn from './Components/LogIn.jsx'
import AuthLayout from './Components/AuthLayout.jsx'
import Dashboard from './Components/DashBoard.jsx'
import { Toaster } from 'react-hot-toast'
import SignupPage from './Pages/SignupPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import DashboardPage from './Pages/DashboardPage.jsx'
import VerifyUserPage from './Pages/VerifyUserPage.jsx'
import SettingsPage from "./Pages/SettingsPage.jsx"
import LatestUpdateViewAndEditPage from './Pages/LatestUpdateViewAndEditPage.jsx'
import PaymentGatewayPage from './Pages/PaymentGatewayPage.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children : [
      {
        path : '/signup',
        element :(
            <SignupPage/>
        )
      },
      {
        path : '/login',
        element : (
          <AuthLayout >
            <LoginPage/>
          </AuthLayout>
        )
      },
      /*{
        path : '/dashboard/:username',
        element : (                           
          <AuthLayout >
                      <DashboardPage/>
           </AuthLayout>
        )
      }*/
      {
        path : '/dashboard/Latest_Update/:username',
        element : ( 
          <AuthLayout >                         
                <LatestUpdateViewAndEditPage/>
          </AuthLayout> 
          )
      },
      {
        path : '/dashboard/Payment_Gateway/:username',
        element : ( 
          <AuthLayout>                          
                <PaymentGatewayPage/>
          </AuthLayout>      
          )
      },
      {
        path : '/verifyUser',
        element :(
          <VerifyUserPage/>
        )
      },
      {
        path : '/set-settings',
        element:(
          <SettingsPage/>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
