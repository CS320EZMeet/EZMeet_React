import React from 'react';
import logo from './logo.svg';
import Navbar from './components/Navbar/index.tsx';
import Home from './pages/home.tsx';
import Login from './pages/login/index.tsx';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';


const App = ()=> (
  <Router>
    <Navbar />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
  </Routes>
  </Router>
);


export default App;