import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
function ForgotPassword() {
  return (
    <div>
      <Link
        to="/verifyUser"
        className="font-medium text-primary transition-all duration-200 hover:underline" >
         Forgot Password?
      </Link>
    </div>        
  )
}

export default ForgotPassword