import React, { useState, useEffect } from 'react';
import * as Icons from "react-icons/gi";
import UserService from '../services/UserService';

const Pantry = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLoadingOnHover, setShowLoadingOnHover] = useState(false);

  const fetchPantryItems = async () => {
    setLoading(true);
    try {
      const response = await UserService.FetchPantryItems();
      const itemsData = response.data.items.map((item) => ({
        ...item,
        icon: Icons[item.icon] ? Icons[item.icon] : null 
      }));
      setItems(itemsData);
    } catch (error) {
      console.error("Error fetching pantry items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPantryItems();
  }, []);

  const handleMouseEnter = () => {
    setShowLoadingOnHover(true); 
    setTimeout(() => {
      setShowLoadingOnHover(false); 
    }, 5000);
  };

  return (
    <div className='flex mt-2 items-center justify-center'>
      <div className='flex w-[300px] h-[600px] bg-gray-300 rounded-lg mr-2'>
        <div 
          className='relative w-[260px] h-[570px] border-2 border-gray-700 ml-5 mt-4 group'
          onMouseEnter={handleMouseEnter}
        >
          
          <div className='flex items-center justify-center mt-3'>
            <div className={`w-full flex flex-col justify-center`}>
              {(loading || showLoadingOnHover) ? (
                <div className="flex flex-col ml-5 items-center justify-center mt-52">
                  <p className='text-sm whitespace-nowrap mr-4'>Gathering ingredients from Greenie...</p>
                  <div className="loader mt-2 items-center justify-center"></div> {/* Spinner */}
                </div>
              ) : (
                items.reduce((acc, item, index) => {
                  if (index % 5 === 0) acc.push([]);
                  acc[acc.length - 1].push(item);
                  return acc;
                }, []).map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex flex-row justify-center border-b-2 border-gray-400 p-2"
                  >
                    {row.map((item) => (
                      <div
                        key={item.id}
                        className="relative m-2"
                        onMouseEnter={() => setHoveredItem(item)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {item.icon ? React.createElement(item.icon, { size: 30, className: 'hover:cursor-pointer hover:text-gray-400' }) : null}
                        
                        {hoveredItem && hoveredItem.id === item.id && (
                          <div className="absolute top-[-100px] left-8 bg-white text-black p-3 border border-gray-400 rounded shadow-lg w-[200px] z-10">
                            <h3 className="font-bold">{item.name}</h3>
                            <p>Expiration: {item.expiration}</p>
                            <p>{item.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>

          <div
            id="left-door"
            className="absolute top-0 left-0 h-full w-1/2 bg-gray-400 border-r border-black flex flex-col justify-around items-center transition-transform duration-500"
            style={{
              transformOrigin: 'left',
              transition: 'transform 0.5s', 
            }}
          >
            <div className="border-[4px] border-black w-[100px] h-[130px]"></div>
            <div className="border-[4px] border-black w-[100px] h-[130px]"></div>
            <div className="w-[10px] h-[50px] bg-yellow-200 absolute top-1/2 -translate-y-1/2 right-2"></div>
          </div>

          <div
            id="right-door"
            className="absolute top-0 right-0 h-full w-1/2 bg-gray-400 border-l border-black flex flex-col justify-around items-center transition-transform duration-500"
            style={{
              transformOrigin: 'right',
              transition: 'transform 0.5s',
            }}
          >
            <div className="border-[4px] border-black w-[100px] h-[130px]"></div>
            <div className="border-[4px] border-black w-[100px] h-[130px]"></div>
            <div className="w-[10px] h-[50px] bg-yellow-200 absolute top-1/2 -translate-y-1/2 left-2"></div>
          </div>
          
        </div>
      </div>

      <style>
        {`
          .group:hover #left-door {
            transform: rotateY(-140deg);
          }
          .group:hover #right-door {
            transform: rotateY(140deg);
          }
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
    </div>
  );
};

export default Pantry;
