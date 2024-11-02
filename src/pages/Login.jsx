import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lock from '../assets/lock.png';
import UserService from '../services/UserService';

const Login = ({ setUser }) => {
  const [login, setLogin] = useState({ key: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setLogin({ ...login, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.LogIn(login);
      setUser(response.data); 
      localStorage.setItem("user", JSON.stringify(response.data)); 
      navigate('/'); 
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid EcoKey. Please try again.");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center lg:mt-40 md:mt-44 mt-48 mx-auto'>
      <form onSubmit={handleSubmit} className='w-full max-w-sm'>
        <div className='flex items-center justify-center'>
          <img src={lock} alt="lock icon" className='w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40' />
        </div>
        <div className='relative mt-5 px-4'>
          <input 
            type="password" 
            required
            placeholder='Eco Key' 
            name='key' 
            value={login.key} 
            onChange={handleChange} 
            className='w-full h-10 rounded-xl placeholder-gray-200 text-sm p-3 bg-gray-400 outline-none'
          />
          <button 
            type='submit' 
            className='absolute right-4 top-1/2 transform -translate-y-1/2 w-20 h-10 rounded-xl bg-gray-300 hover:bg-gray-100 text-md font-light'
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
