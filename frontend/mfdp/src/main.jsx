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
import StudentAdmissionPortalPage from './Pages/StudentAdmissionPortalPage.jsx'
import FeesStructurePage from './Pages/FeesStructurePage.jsx'
import StudentAttendanceManagementPage from './Pages/StudentAttendanceManagementPage.jsx'
import LibraryManagementPage from './Pages/LibraryManagementPage.jsx'
import ResultViewAndUpdatePage from './Pages/ResultViewAndUpdatePage.jsx'
import TeacherAndEmployeeAdmissionPortalPage from './Pages/TeacherAndEmployeeAdmissionPortalPage.jsx'
import TeacherAndEmployeeAttendancePage from './Pages/TeacherAndEmployeeAttendancePage.jsx'
import InventoryManagementPage from './Pages/InventoryManagementPage.jsx'
import EmployeeSalrieStructurePage from './Pages/EmployeeSalrieStructurePage.jsx'
import RoutineViewAndUpdatePage from './Pages/RoutineViewAndUpdatePage.jsx'


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
        path : '/dashboard/Student_Admission/:username',
        element : ( 
          <AuthLayout>                          
                <StudentAdmissionPortalPage/>
          </AuthLayout>      
          )
      },
      {
        path : '/dashboard/Fees_Structure/:username',
        element : ( 
          <AuthLayout>                          
               <FeesStructurePage/> 
          </AuthLayout>      
          )
      },
      {
        path : '/dashboard/Employee_Salrie_Structure/:username',
        element : ( 
          <AuthLayout>                          
                <EmployeeSalrieStructurePage/>
          </AuthLayout>      
          )
      },
      {
        path : '/dashboard/Routine_View_Update/:username',
        element : ( 
          <AuthLayout>                          
                <RoutineViewAndUpdatePage/>
          </AuthLayout>      
          )
      },
      {
        path : '/dashboard/Student_Attendance/:username',
        element : ( 
          <AuthLayout>                          
                <StudentAttendanceManagementPage/>
          </AuthLayout>      
          )
      },
      {
        path : '/dashboard/Library_Management/:username',
        element : ( 
          <AuthLayout>                          
                <LibraryManagementPage/>
          </AuthLayout>      
          )
      },
      {
        path : '/dashboard/Result_View_Update/:username',
        element : ( 
          <AuthLayout>                          
                <ResultViewAndUpdatePage/>
          </AuthLayout>      
          )
      },
      {
        path : '/dashboard/Employee_Admission_Portal/:username',
        element : ( 
          <AuthLayout>                          
                <TeacherAndEmployeeAdmissionPortalPage/>
          </AuthLayout>      
          )
      },
      {
        path : '/dashboard/Employee_Attendance/:username',
        element : ( 
          <AuthLayout>                          
                <TeacherAndEmployeeAttendancePage/>
          </AuthLayout>      
          )
      },
      {
        path : '/dashboard/Inventory_Management/:username',
        element : ( 
          <AuthLayout>                          
                <InventoryManagementPage/>
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
