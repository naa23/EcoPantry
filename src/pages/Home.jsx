import React, { useState } from 'react';
import ai from '../assets/ai.png';
import { IoMdSend } from "react-icons/io";
import upload from '../assets/upload.png';
import uploadd from '../assets/upload2.png';
import ban from '../assets/bann.png';
import handle from '../assets/handle.png';
import sleep from '../assets/sleep.png';
import UserService from "../services/UserService";

const Home = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [chatbotAwake, setChatbotAwake] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false); 
  const [isThinking, setIsThinking] = useState(false); 
  const [userInput, setUserInput] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("File selected:", e.target.files[0]);
  };

  const simulateResponse = (text, delay, onComplete) => {
    setTimeout(() => {
      setChatHistory((prevHistory) => [...prevHistory, { sender: "bot", text }]);
      if (onComplete) onComplete();
    }, delay);
  };

  const sendMessageToAI = async (message) => {
    setIsThinking(true); 
    try {
      const response = await UserService.ChatbotResponse(message);
      const botReply = response.data.response;
      setChatHistory((prevHistory) => [...prevHistory, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "bot", text: "Oops! Something went wrong." }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSendClick = () => {
    if (userInput.trim()) {
      setChatHistory((prevHistory) => [...prevHistory, { sender: "user", text: userInput }]);
      const currentUserInput = userInput;
      setUserInput('');
      
      setIsThinking(true);
      setTimeout(() => {
        sendMessageToAI(currentUserInput);
      }, 5000);
    }
  };

  const wakeUpGreenie = () => {
    if (!selectedFile) return;
    setChatbotAwake(true);
    setIsAnalyzing(true);

    simulateResponse("Hey there! I've analyzed your receipt. How can I help you?", 5000, () => {
      setIsAnalyzing(false); 
    });
  };

  return (
    <div className='flex flex-col items-center relative'>
      {user && (
        <div className='absolute top-4 right-4 text-gray-700 font-semibold'>
          <span className='text-gray-100 mr-1 font-light'>Hello,</span>
          <span className='font-bold text-white'>{user.username}!</span>
        </div>
      )}
      <div className='flex mt-2 items-center justify-center'>
        <div className='flex flex-col w-[300px] h-[600px] bg-gray-300 rounded-lg mr-2'>
          <div className='flex flex-col w-[260px] h-[570px] border-2 border-gray-700 rounded-2xl mx-auto mt-4'>
            {/* Chat Header with Bot Image */}
            <div className='flex items-center border-b border-gray-500 p-4'>
              <img src={chatbotAwake ? ai : sleep} alt="bot" className='w-16 h-16 mr-2' />
              <h1 className='text-green-600 text-2xl font-light'>Greenie</h1>
            </div>
            <div className='absolute left-[678px] top-[168px]'>
              <img src={handle} alt="handle" className='w-12' />
            </div>
            {/* Chat History - Messages Start from Top */}
            <div className='flex flex-col flex-grow overflow-y-auto px-4 py-2'>
              {chatHistory.map((entry, index) => (
                <div key={index} className={`flex ${entry.sender === "bot" ? "justify-start" : "justify-end"} mb-2`}>
                  {entry.sender === "bot" ? (
                    <div
                      className={`rounded-lg p-2 bg-blue-100 text-black max-w-xs`}
                      dangerouslySetInnerHTML={{ __html: entry.text }}
                    />
                  ) : (
                    <div className={`rounded-lg p-2 bg-green-100 text-black max-w-xs`}>
                      {entry.text}
                    </div>
                  )}
                </div>
              ))}

              {isAnalyzing && (
                <div className='flex justify-start mb-2'>
                  <div className='animate-pulse bg-blue-100 text-black rounded-lg p-2 max-w-xs'>
                    Analyzing receipt...
                  </div>
                </div>
              )}
              {isThinking && !isAnalyzing && (
                <div className='flex justify-start mb-2'>
                  <div className='animate-pulse bg-blue-100 text-black rounded-lg p-2 max-w-xs'>
                    Thinking...
                  </div>
                </div>
              )}
            </div>
            <div className='flex items-center p-3 border-t border-gray-500'>
              <input
                type="text"
                placeholder='Chat With Greenie'
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className='flex-grow h-10 placeholder:text-gray-400 placeholder:text-sm rounded-lg bg-transparent outline-none p-3 text-sm'
              />
              <IoMdSend size={20} onClick={handleSendClick} className='ml-2 cursor-pointer hover:text-blue-600'/>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-[300px] h-[600px] bg-gray-300 rounded-lg relative'>
          <div className='flex flex-col w-[260px] h-[570px] border-2 border-gray-700 rounded-2xl mx-auto mt-4'>
            <div className='relative top-5 mx-auto py-3'>
              <img src={ban} alt="banner" className='w-32' />
            </div>
            <div className='absolute left-[-10px] top-[160px]'>
              <img src={handle} alt="handle" className='w-12' />
            </div>
            <div className='absolute left-[60px] top-[250px]'>
              <label
                htmlFor="fileInput"
                className='cursor-pointer'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={isHovered ? uploadd : upload}
                  alt="upload button"
                  className='w-32 relative top-[-70px] left-[25px]'
                />
              </label>
              <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div className='flex items-center justify-center mt-48'>
              <button
                onClick={wakeUpGreenie}
                disabled={!selectedFile}
                className={`w-36 h-10 rounded-lg relative top-[150px] bg-green-500 text-sm outline-none ${!selectedFile ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-400'}`}
              >
                Wake Greenie
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center bg-gray-300 h-[100px] w-full mt-5'>
        <p>Created By Team Steam Sustain | © All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Home;
