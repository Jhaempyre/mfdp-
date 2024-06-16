import React, { useState } from 'react'
import useUpdatePassword from '../../Hooks/useUpdatePassword';

const Settings = () => {
  const {loading,updateCred} = useUpdatePassword()
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    for (const key in inputs) {
        formData.append(key, inputs[key]);
    }
    console.log('FormData:', formData);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    await updateCred(formData)
    console.log("Submit button clicked");
  }
  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword : "",
  })
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-500">
    <div className="bg-white  p-8  shadow-lg rounded-lg" style={{ maxWidth: '600px' }}>
    <h2 className="text-center text-2xl font-bold leading-tight">Update Your <span style={{ color: 'red' }}>Password</span></h2>
        <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-gray-800">Old Password</span>
        </div>
        <input 
        type="password" 
        placeholder="Enter your current Password" 
        className="input input-bordered w-full max-w-xs"
        value={inputs.oldPassword}
        onChange = {(e) => setInputs({...inputs,oldPassword:e.target.value})}  />
        <div className="label"></div>
      </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">New Password</span>
          </div>
          <input 
          type="password" 
          placeholder="Enter your New Password" 
          className="input input-bordered w-full max-w-xs"
          value={inputs.newPassword}
          onChange = {(e) => setInputs({...inputs,newPassword:e.target.value})} />
          <div className="label"></div>
        </label> 
        <button type="submit" className="btn btn-success mt-2" >Update</button>         
          </form>  

    </div> 
    </div>
  )
}

export default Settings