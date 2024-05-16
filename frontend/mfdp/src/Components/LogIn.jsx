import React from 'react'

const LogIn = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-500">
    <div className="bg-white  p-8  shadow-lg rounded-lg" style={{ maxWidth: '600px' }}>
    <h2 className="text-center text-2xl font-bold leading-tight">Login to your <span style={{ color: 'red' }}>Dashboard</span></h2>
    <p className="mt-2 text-center text-base text-black/60">
           Don't Have an Account?&nbsp;
            <a
                to="www.gl.com"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign Up
            </a>
        </p>

    </div>
    
    </div>
  )
}

export default LogIn