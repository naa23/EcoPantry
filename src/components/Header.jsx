import React, { useState } from 'react';
import logo from '../assets/logooo.png';
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Header = ({ user, logout }) => {
  const [nav, setNav] = useState(true);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex items-center justify-between px-4 mx-auto w-full h-16 shadow-md z-10 bg-[#d2cac5]'>
      <img src={logo} alt="logo" className='w-20 h-16 hover:cursor-pointer' onClick={() => navigate('/')} />
      
      <ul className='lg:flex md:flex hidden text-md text-nowrap'>
        {user ? (
          <>
            <li onClick={() => navigate('/')} className='p-4 hover:cursor-pointer border-b-2 border-[#d2cac5] hover:border-gray-500'>Home</li>
            <li onClick={() => navigate('/pantry')} className='p-4 hover:cursor-pointer border-b-2 border-[#d2cac5] hover:border-gray-500'>Pantry</li>
            <li onClick={() => navigate('/recipes')} className='p-4 hover:cursor-pointer border-b-2 border-[#d2cac5] hover:border-gray-500'>Recipes</li>
            <li onClick={() => navigate('/community')} className='p-4 hover:cursor-pointer border-b-2 border-[#d2cac5] hover:border-gray-500'>Community</li>
            <li onClick={() => navigate('/about')} className='p-4 mr-4 hover:cursor-pointer border-b-2 border-[#d2cac5] hover:border-gray-500'>About Us</li>
            <li onClick={logout} className='p-4 hover:cursor-pointer border-b-2 border-[#d2cac5] hover:border-gray-500'>Logout</li>
          </>
        ) : (
          <>
            <li onClick={() => navigate('/login')} className='p-4 hover:cursor-pointer border-b-2 border-[#d2cac5] hover:border-gray-500'>Log In</li>
            <li onClick={() => navigate('/signup')} className='w-28 h-9 mt-3 text-center py-1 rounded-lg border border-gray-500 text-md hover:bg-[#beaba0] hover:cursor-pointer outline-none hover:text-gray-200'>Sign Up</li>
          </>
        )}
      </ul>
      
      <div onClick={handleNav} className='lg:hidden md:hidden block hover:cursor-pointer'>
        {nav ? <HiOutlineMenuAlt1 size={24}/> : <IoMdClose size={24}/>}
      </div>
      <div className={!nav ? 'w-48 h-full bg-[#3c3c3c] md:hidden lg:hidden flex flex-col mx-auto px-4 duration-500 ease-in-out fixed top-16 right-0 z-10' : 'md:hidden lg:hidden duration-500 ease-in-out w-48 h-full fixed z-10 top-16 -right-64'}>
        <ul className='text-nowrap text-gray-300'>
          {user ? (
            <>
              <li onClick={() => navigate('/')} className='p-4 hover:cursor-pointer border-b-2 border-[#3c3c3c] hover:border-gray-500'>Home</li>
              <li onClick={() => navigate('/pantry')} className='p-4 hover:cursor-pointer border-b-2 border-[#3c3c3c] hover:border-gray-500'>Pantry</li>
              <li onClick={() => navigate('/recipes')} className='p-4 hover:cursor-pointer border-b-2 border-[#3c3c3c] hover:border-gray-500'>Recipes</li>
              <li onClick={() => navigate('/community')} className='p-4 hover:cursor-pointer border-b-2 border-[#3c3c3c] hover:border-gray-500'>Community</li>
              <li onClick={() => navigate('/about')} className='p-4 mr-4 hover:cursor-pointer border-b-2 border-[#3c3c3c] hover:border-gray-500'>About Us</li>
              <li onClick={logout} className='p-4 hover:cursor-pointer border-b-2 border-[#3c3c3c] hover:border-gray-500'>Logout</li>
            </>
          ) : (
            <>
              <li onClick={() => navigate('/login')} className='p-4 hover:cursor-pointer border-b-2 border-[#3c3c3c] hover:border-gray-500'>Log In</li>
              <li onClick={() => navigate('/signup')} className='w-28 h-9 mt-3 text-center py-1 rounded-lg border border-gray-500 text-md hover:bg-[#beaba0] hover:cursor-pointer outline-none hover:text-gray-200'>Sign Up</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
