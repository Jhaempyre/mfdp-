import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FrontPage from './Components/FrontPage'
//import './App.css'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import { Toaster } from 'react-hot-toast';
import Dashboard from './Components/DashBoard'

function App() {

  return (
    <div >
      <Dashboard/>
      <Toaster />
    </div>
  )
}

export default App
