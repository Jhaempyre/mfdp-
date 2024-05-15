import React from 'react';
import {Link ,useNavigate} from 'react-router-dom'
import useSignUp from '../Hooks/useSignUp';
import { useState } from 'react';
const SignUp = () => {

  const [inputs, setInputs] = useState({
    firstName : "",
    schoolName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword : "",
    username : "",
    schoolAddress : "",
    schoolNumber : "",
    adminMobile : "",
    pincode : "",
    schoolImage: null, // Change to match multer field name
    profileImage: null  // Change to match multer field name
	});

  const [isChecked, setIsChecked] = useState(false);

  const { loading, signUp } = useSignUp();
  //const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setInputs({ ...inputs, [name]: files[0] });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    const fullName = `${inputs.firstName} ${inputs.lastName}`;
  formData.append('fullName', fullName);

  // Convert schoolNumber and adminMobile to integers
  formData.append('schoolNumber', parseInt(inputs.schoolNumber, 10));
  formData.append('adminMobile', parseInt(inputs.adminMobile, 10));
        for (const key in inputs) {
            formData.append(key, inputs[key]);
        }
        console.log('FormData:', formData);
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }  
		   await signUp(formData);

  }

  return (
    <>
     <div className="min-h-screen flex justify-center items-center bg-blue-500">
      <div className="bg-white  p-8  shadow-lg rounded-lg" style={{ maxWidth: '600px' }}>
      <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
      <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <a
                to="www.gl.com"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Log in
            </a>
        </p>


      <form onSubmit={handleSubmit}>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-gray-800">School Name</span>
        </div>
        <input 
        type="text" 
        placeholder="Enter Your School Name" 
        className="input input-bordered w-full max-w-xs"
        value={inputs.schoolName}
        onChange = {(e) => setInputs({...inputs,schoolName:e.target.value})} />
        <div className="label"></div>
      </label>

      <div className="flex items-center">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">First Name</span>
          </div>
          <input 
          type="text"
          placeholder="Enter your First name"
          className="input input-bordered w-full max-w-xs"
          value={inputs.firstName}
					onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })}/>
          <div className="label"></div>
        </label>

        <div className="mx-4"></div> {/* Add space between fields */}

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">Last Name</span>
          </div>
          <input 
          type="text" 
          placeholder="Enter your Last Name" 
          className="input input-bordered w-full max-w-xs"
          value={inputs.lastName}
					onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
           />
          <div className="label"></div>
        </label>
      </div>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-gray-800">Email</span>
        </div>
        <input 
        type="email" 
        placeholder="any@domain.com" 
        className="input input-bordered w-full max-w-xs"
        value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
        <div className="label"></div>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-gray-800">Username</span>
        </div>
        <input 
        type="text" 
        placeholder="Enter Username" 
        className="input input-bordered w-full max-w-xs"
        value={inputs.username}
				onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
        <div className="label"></div>
      </label>

      <div className="flex items-center">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">Password</span>
          </div>
          <input 
          type="password" 
          placeholder="Password" 
          className="input input-bordered w-full max-w-xs"
          value={inputs.password}
				 onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
          <div className="label"></div>
        </label>

        <div className="mx-4"></div> {/* Add space between fields */}

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">Confirm Password</span>
          </div>
          <input 
          type="password" 
          placeholder="Confirm Password" 
          className="input input-bordered w-full max-w-xs"
          value={inputs.confirmPassword}
				onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} />
          <div className="label"></div>
        </label>
      </div>

      <div>Enter your School Postal Address</div>
      <input 
      type="Address" 
      placeholder="Enter your School Addresss " 
      className="input  w-full max-w-xs"
      value={inputs.schoolAddress}
			onChange={(e) => setInputs({ ...inputs, schoolAddress: e.target.value })} />

      <div className="flex items-center">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">School number</span>
          </div>
          <input 
          type="Number" 
          placeholder="School mobile" 
          className="input input-bordered w-full max-w-xs"
          value={inputs.schoolNumber}
				 onChange={(e) => setInputs({ ...inputs, schoolNumber: e.target.value })} />
          <div className="label"></div>
        </label>

        <div className="mx-4"></div> {/* Add space between fields */}

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">Admin Mobile</span>
          </div>
          <input 
          type="Number" 
          placeholder="Admin MObile" 
          className="input input-bordered w-full max-w-xs"
          value={inputs.adminMobile}
				onChange={(e) => setInputs({ ...inputs, adminMobile: e.target.value })} />
          <div className="label"></div>
        </label>
      </div>

      <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">Pincode</span>
          </div>
          <input 
          type="Number" 
           placeholder="Pincode" 
           className="input input-bordered w-full max-w-xs"
           value={inputs.pincode}
				onChange={(e) => setInputs({ ...inputs, pincode: e.target.value })} />
          <div className="label"></div>
        </label>

        <div className="flex items-center">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">School profile</span>
          </div>
          <input 
          type="file" 
          name="schoolImage"
          placeholder="Please select profile picture" 
          className="input input-bordered w-full max-w-xs"
          onChange={handleFileChange} 
          accept="image/*" />
				
          <div className="label"></div>
        </label>

        <div className="mx-4"></div> {/* Add space between fields */}

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">Admin profile picture</span>
          </div>
          <input 
          type="file" 
          name="profileImage" 
          placeholder="select admin profile pic" 
          className="input input-bordered w-full max-w-xs"
          accept="image/*" 
          onChange={handleFileChange}  />
          <div className="label"></div>
        </label>
      </div>
      <div className="mt-4 flex items-center">
        <input 
        type="checkbox" 
        className="form-checkbox" 
        checked={isChecked} 
        onChange={handleCheckboxChange} />
        <label className="ml-2 text-gray-800">I agree to the terms and conditions</label>
      </div>
      <button type="submit" className="btn btn-success mt-2" disabled={!isChecked} >Sign Up</button>
       </form>
     </div>
     </div>
    </>
  );
};

export default SignUp;
