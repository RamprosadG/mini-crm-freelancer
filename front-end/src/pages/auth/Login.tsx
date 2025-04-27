/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store/hook';
import { login } from '../../redux/features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();
  
    const handleLogin = async (e: any) => {
      e.preventDefault();
      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      try {
        await dispatch(login(data)).unwrap();
        setErrorMessage("");
        navigate("/");
      } catch(error) {
        console.log(error);
        setErrorMessage("Login Failed");
      }
    };
  
    return (
      <div className='min-h-screen flex justify-center items-center w-full p-4'>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center text-md justify-center w-full md:max-w-md border-2 border-gray-400 rounded-md p-5 shadow-md gap-5"        
        >
          <h2 className="text-xl font-bold text-black dark:text-white">
            Login
          </h2>
          <div className="w-full">
            <span className="text-red-500">{errorMessage}</span>
          </div>
          <div className="w-full  flex flex-col gap-2">
          <label className=''>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              className="w-full py-2 px-2 border rounded-lg bg-white text-primary-text focus:outline-none focus:ring-2 focus:ring-green-300"
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
              "Login"
            )}
          </button>
          </div>
          <div className="flex items-center text-xs space-x-1">
            <span className="text-black dark:text-white">Don&apos;t have an account?</span>
            <Link 
              to={"/register"}
              className="text-blue-500 underline hover:text-blue-700 focus:outline-none"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    );
};

export default Login;