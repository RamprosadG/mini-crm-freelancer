/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store/hook';
import { register } from '../../redux/features/auth/authSlice';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);
    const [errorMessage, setErrorMessage] = useState<string>("");
  
    const handleRegister = async (e: any) => {
      e.preventDefault();
      const data = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };
      try {
        await dispatch(register(data)).unwrap();
        setErrorMessage("");
      } catch(error) {
        console.log(error);
        setErrorMessage("Register Failed");
      }
    };
  
    return (
        <div className='min-h-screen flex justify-center items-center w-full p-4'>
          <form
            onSubmit={handleRegister}
            className="flex flex-col items-center text-md justify-center w-full md:max-w-md border border-gray-400 rounded-md p-5 shadow-md gap-5"        
          >
            <h2 className="text-xl font-bold text-black dark:text-white">
              Register
            </h2>
            <div className="w-full">
              <span className="text-secondary-color">{errorMessage}</span>
            </div>
            <div className="w-full  flex flex-col gap-2">
            <label>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                className="w-full py-2 px-2 border rounded-lg bg-white text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-color"
                required
              />
            </div>
            <div className="w-full  flex flex-col gap-2">
            <label className=''>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                className="w-full py-2 px-2 border rounded-lg bg-white text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-color"
                required
              />
            </div>
            <div className="w-full  flex flex-col gap-2">
            <label className=''>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="w-full py-2 px-2 border rounded-lg bg-white text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-color"
                required
              />
            </div>
            <div className="w-full mt-3">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-green-500 text-secondary-text py-2 rounded-lg transition duration-300 ${
                isLoading ? "cursor-not-allowed" : "hover:bg-green-600 cursor-pointer"
              }`}
            >
              {isLoading ? (
                  "Logining..."
              ) : (
                "Register"
              )}
            </button>
            </div>
            <div className="flex items-center text-xs space-x-1">
              <span className="text-black dark:text-white">Already have an account?</span>
              <Link 
                to={"/login"}
                className="text-blue-500 hover:underline hover:text-blue-700 focus:outline-none"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      );
};

export default Register;