import React from 'react';
import {Link ,useNavigate} from 'react-router-dom'
const SignUp = () => {
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
                Sign In
            </a>
        </p>


      <form>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-gray-800">School Name</span>
        </div>
        <input type="text" placeholder="Enter Your School Name" className="input input-bordered w-full max-w-xs" />
        <div className="label"></div>
      </label>

      <div className="flex items-center">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">First Name</span>
          </div>
          <input type="text" placeholder="Enter your First name" className="input input-bordered w-full max-w-xs" />
          <div className="label"></div>
        </label>

        <div className="mx-4"></div> {/* Add space between fields */}

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">Last Name</span>
          </div>
          <input type="text" placeholder="Enter your Last Name" className="input input-bordered w-full max-w-xs" />
          <div className="label"></div>
        </label>
      </div>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-gray-800">Email</span>
        </div>
        <input type="email" placeholder="some@any.com" className="input input-bordered w-full max-w-xs" />
        <div className="label"></div>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-gray-800">Username</span>
        </div>
        <input type="text" placeholder="Enter Username" className="input input-bordered w-full max-w-xs" />
        <div className="label"></div>
      </label>

      <div className="flex items-center">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">Password</span>
          </div>
          <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
          <div className="label"></div>
        </label>

        <div className="mx-4"></div> {/* Add space between fields */}

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">Confirm Password</span>
          </div>
          <input type="password" placeholder="Confirm Password" className="input input-bordered w-full max-w-xs" />
          <div className="label"></div>
        </label>
      </div>

      <div>Enter your School Postal Adress</div>
      <input type="text" placeholder="Enter your School Adresss " className="input  w-full max-w-xs" />

      <div className="flex items-center">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">School number</span>
          </div>
          <input type="Number" placeholder="School mobile" className="input input-bordered w-full max-w-xs" />
          <div className="label"></div>
        </label>

        <div className="mx-4"></div> {/* Add space between fields */}

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">Admin Mobile</span>
          </div>
          <input type="Number" placeholder="Admin MObile" className="input input-bordered w-full max-w-xs" />
          <div className="label"></div>
        </label>
      </div>

      <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">Pincode</span>
          </div>
          <input type="Number" placeholder="Pincode" className="input input-bordered w-full max-w-xs" />
          <div className="label"></div>
        </label>

        <div className="flex items-center">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">School profile</span>
          </div>
          <input type="file" placeholder="Please select profile picture" className="input input-bordered w-full max-w-xs" />
          <div className="label"></div>
        </label>

        <div className="mx-4"></div> {/* Add space between fields */}

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-800">Admin profile picture</span>
          </div>
          <input type="file" placeholder="select admin profile pic" className="input input-bordered w-full max-w-xs" />
          <div className="label"></div>
        </label>
      </div>
      <div className="mt-4 flex items-center">
        <input type="checkbox" className="form-checkbox"  />
        <label className="ml-2 text-gray-800">I agree to the terms and conditions</label>
      </div>
      <button className="btn btn-active btn-primary">Sign Up</button>
       </form>
     </div>
     </div>
    </>
  );
};

export default SignUp;
