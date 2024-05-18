import React from 'react'
import ForgotPassword from './ForgotPassword'
import { useState } from 'react'
import useLogIn from "../Hooks/useLogin.js"

const LogIn = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password : "",
  })

  const { loading, logIn } = useLogIn() ;

  const handleSubmit =  async(e)=>{
    e.preventDefault();
    const formData = new FormData();
        for (const key in inputs) {
            formData.append(key, inputs[key]);
        }
        console.log('FormData:', formData);
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }  
		   await logIn(formData);

  }

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
        <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-gray-800">Email</span>
        </div>
        <input 
        type="email" 
        placeholder="any@domain.com" 
        className="input input-bordered w-full max-w-xs"
        value={inputs.email}
        onChange = {(e) => setInputs({...inputs,email:e.target.value})}  />
        <div className="label"></div>
      </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">Password</span>
          </div>
          <input 
          type="password" 
          placeholder="Password" 
          className="input input-bordered w-full max-w-xs"
          value={inputs.password}
          onChange = {(e) => setInputs({...inputs,password:e.target.value})} />
          <div className="label"></div>
        </label> 
        <ForgotPassword/>
        <button type="submit" className="btn btn-success mt-2" >Log in </button>         
          </form>  

    </div>
    
    </div>
  )
}

export default LogIn