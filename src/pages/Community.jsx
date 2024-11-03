import React, { useState, useEffect } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import UserService from '../services/UserService';

const Community = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState(""); 
  const [location, setLocation] = useState(""); 
  const [share, setShare] = useState(false);
  const [loading, setLoading] = useState(true);

  const open = () => setShare(true);
  const close = () => setShare(false);

  const fetchCommunityItems = async () => {
    setLoading(true);
    try {
      const response = await UserService.FetchCommunityItems(); 
      const { items, title, location } = response.data;
      setItems(items); 
      setTitle(title); 
      setLocation(location); 
    } catch (error) {
      console.error("Error fetching community items:", error);
    } finally {
      setTimeout(() => setLoading(false), 4000); 
    }
  };

  useEffect(() => {
    fetchCommunityItems(); 
  }, []);

  return (
    <>
      <div className='flex justify-between mt-16'>
        <h2 className='text-2xl text-gray-100 font-bold items-start justify-start ml-6'>
          {title}
        </h2>
        <button onClick={open} className='items-end justify-end mr-6 w-28 h-10 rounded-lg text-black bg-[#e2dadb] outline-none hover:bg-[#beb0b2] hover:text-gray-100'>
          Share
        </button>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-200 text-xl">
          <p>Loading community...</p>
          <div className="loader mt-4"></div>
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='mt-6'>
            <p className='text-gray-300 ml-6'>{location}</p>
          </div>
          <div className='mt-6'>
            <h1 className='text-2xl font-normal ml-6 text-gray-100'>For You</h1>
          </div>
          <div className='grid grid-cols-4 mt-6 gap-4 px-4'>
            {items.map((item, index) => (
              <div key={index} className='flex flex-col items-center justify-center'>
                <img src={item.imageUrl} alt={item.name} className='w-64 h-64 rounded-lg' />
                <p className='items-center justify-center text-gray-100 text-sm mt-2'>
                  {item.name} | Expires {item.expiration}
                </p>
                <p className='text-sm text-gray-100 mt-1'>Username: {item.username}</p>
                <p className='text-sm text-gray-100 mt-1'>Contact: {item.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {share && (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col bg-gray-300 w-[500px] h-[350px] rounded-lg p-6'>
          <div className='fixed right-0 top-0'>
            <IoIosCloseCircle size={24} onClick={close} className='ml-56 hover:text-red-500 hover:cursor-pointer'/>
          </div>
          <div className='flex items-center justify-center -mt-3'>
            <h1 className='text-xl'>Share With The Community</h1>
          </div>
          <div className='flex mt-3'>
            <p className='mr-2 mt-1'>Food:</p>
            <input type="text" name='item' className='w-40 h-9 rounded-md bg-gray-100 outline-none p-3' />
          </div>
          <div className='flex mt-4'>
            <p className='mr-2 mt-1'>Expires:</p>
            <input type="text" name='expire' className='w-40 h-9 rounded-md bg-gray-100 outline-none p-3' />
          </div>
          <div className='flex mt-4'>
            <p>Food Image:</p>
            <input type="file" name='image' className='w-40 h-9 rounded-md bg-gray-100 outline-none p-3' />
          </div>
          <div className='flex mt-4'>
            <p className='mr-2 mt-1'>Contact Number:</p>
            <input type="text" name='contact' className='w-40 h-9 rounded-md bg-gray-100 outline-none p-3' />
          </div>
          <div className='flex items-center justify-center mt-14'>
            <button className='w-28 h-10 rounded-lg outline-none bg-green-600 text-gray-100 hover:bg-green-800'>Submit</button>
          </div>
        </div>
      )}

      {!loading && (
        <div className='flex items-center justify-center bg-gray-300 w-full h-[100px] mt-16'>
          <p>Created By Team Steam Sustain | © All Rights Reserved</p>
        </div>
      )}

      <style>
        {`
          .loader {
            border: 4px solid #f3f3f3; /* Light grey */
            border-top: 4px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default Community;
