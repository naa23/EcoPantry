import React, { useState } from 'react';
import signup from '../assets/signup.png';
import UserService from '../services/UserService';

const Signup = () => {
  const [user, setUser] = useState({
    username: ""
  });
  
  const [ecoKey, setEcoKey] = useState(null); 
  const [error, setError] = useState(null);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.SignUp(user);
      setEcoKey(response.data.ecokey); 
      setError(null); 
    } catch (err) {
      setError("Signup failed: " + (err.response?.data?.error || "An error occurred."));
      setEcoKey(null); 
    }
  };

  return (
    <div className='flex flex-col items-center justify-center lg:mt-20 md:mt-24 mt-32 mx-auto'>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center justify-center'>
          <img src={signup} alt="Signup Icon" className='w-36 h-36 md:w-40 md:h-40 lg:w-52 lg:h-52' />
        </div>
        
        <div>
          <input 
            required
            type="text"
            name='username'
            placeholder='Username'
            value={user.username}
            onChange={handleChange}
            className='w-96 h-10 rounded-xl bg-gray-400 outline-none p-3 placeholder:text-gray-200 text-white text-sm' 
          />
        </div>
        
        <div className='flex items-start justify-start mt-6'>
          <p className='mr-2 text-gray-300'>Household Size: </p>
          <select className='outline-none w-20 h-7 rounded-sm font-light text-sm bg-gray-300'>
            <option className='text-center'>1</option>
            <option className='text-center'>2</option>
            <option className='text-center'>3+</option>
          </select>
        </div>
        
        <div className='flex items-start justify-start mt-6'>
          <p className='text-gray-300 mr-2'>Dietary Restrictions: </p>
          <select className='outline-none w-20 h-7 rounded-sm font-light text-sm bg-gray-300'>
            <option className='text-center'>None</option>
            <option className='text-center'>Halal</option>
            <option className='text-center'>Kosher</option>
            <option className='text-center'>Vegan</option>
          </select>
        </div>
        
        <div className='flex items-start justify-start mt-6'>
          <input type="checkbox" required className='outline-none mt-1' />
          <p className='text-gray-300 ml-1 text-sm'>I have read and agreed to the</p>
          <a href="#" className='text-gray-300 underline ml-1 text-sm'>Terms and Conditions</a>
        </div>
        
        <div className='flex items-center justify-center mt-5'>
          <button type='submit' className='w-48 h-10 rounded-xl bg-gray-300 hover:bg-gray-100'>Submit</button>
        </div>
        
        {ecoKey && (
          <div className='mt-4 p-2 bg-green-100 text-green-800 rounded'>
            Your EcoKey: <strong>{ecoKey}</strong>
          </div>
        )}
        
        {error && (
          <div className='mt-4 p-2 bg-red-100 text-red-800 rounded'>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
