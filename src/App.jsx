import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import Community from './pages/Community';
import Home from './pages/Home';
import Login from './pages/Login';
import Pantry from './pages/Pantry';
import Recipes from './pages/Recipes';
import Signup from './pages/Signup';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    setUser(null); 
    localStorage.removeItem('user');
  };

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Header user={user} logout={logout} />
      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
        <Route path='/community' element={<Community />} />

        <Route path='/' element={<ProtectedRoute><Home user={user} /></ProtectedRoute>} />
        <Route path='/pantry' element={<ProtectedRoute><Pantry /></ProtectedRoute>} />
        <Route path='/recipes' element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
