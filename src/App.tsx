import React from 'react';
import logo from './logo.svg';
import Navbar from './components/Navbar/index';
import Home from './pages/home';
import Login from './pages/login';
import Help from './pages/help';
import User from './pages/UserProfile';
import SignUp from './pages/signup';
import Group from './pages/group';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Invite from './pages/invite';

const App = ()=> (
  <Router>
    <Navbar />
  <div className='content'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/help' element={<Help />} />
      <Route path='/user/:user_id' element={<User />} />
      <Route path='/group' element={<Group />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/group/invite/:group_id' element={<Invite />} />
    </Routes>
  </div>
  </Router>
  
);

export default App;