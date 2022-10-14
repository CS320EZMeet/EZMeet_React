import React from 'react';
import logo from './logo.svg';
import Navbar from './components/Navbar/index';
import Home from './pages/home';
import Login from './pages/login';
import Help from './pages/help';
import User from './pages/user';
import SignUp from './pages/signup';
import Group from './pages/group';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';


const App = ()=> (
  <Router>
    <Navbar />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/help' element={<Help />} />
    <Route path='/user' element={<User />} />
    <Route path='/group' element={<Group />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<SignUp />} />
  </Routes>
  </Router>
);


export default App;