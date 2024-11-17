import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import LoginSignup from './Components/loginSignup/LoginSignup';
import Home from './Components/home/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<LoginSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
