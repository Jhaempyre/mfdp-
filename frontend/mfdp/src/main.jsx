import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUp from './Components/SignUp.jsx'
import LogIn from './Components/LogIn.jsx'
import AuthLayout from './Components/AuthLayout.jsx'
import Dashboard from './Components/DashBoard.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children : [
      {
        path : '/signup',
        element :(
          <AuthLayout authentication = {false}>
            <SignUp/>
          </AuthLayout>
        )
      },
      {
        path : '/login',
        element : (
          <AuthLayout authentication = {false}>
            <LogIn/>
          </AuthLayout>
        )
      },
      {
        path : '/dashboard/:username',
        element : (                           
                                   //<AuthLayout authentication = {true}>

                      <Dashboard/>
                                            // </AuthLayout>
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
