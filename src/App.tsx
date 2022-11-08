import React, {ReactElement} from 'react';
import logo from './logo.svg';
import Navbar from './components/Navbar/index';
import Home from './pages/home';
import Login from './pages/login';
import Help from './pages/help';
import User from './pages/UserProfile';
import SignUp from './pages/signup';
import Group from './pages/group';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate}
    from 'react-router-dom';
import Invite from './pages/invite';
import AuthService from './services/authenticator';

const App = ()=> (
  <Router>
    <Navbar />
  <div className='content'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/help' element={<Help />} />
      <Route path='/user/:user_id' element= {
      <ProtectedRoute user={AuthService.getCurrentUser()}>
        <User />
      </ProtectedRoute>
      } />
      <Route path='/group' element={
      <ProtectedRoute user={AuthService.getCurrentUser()}>
        <Group />
      </ProtectedRoute>
      } />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/group/invite/:group_id' element={
      <ProtectedRoute user={AuthService.getCurrentUser()}>
        <Invite />
      </ProtectedRoute>
      }
      />
    </Routes>
  </div>
  </Router>
  
);

const ProtectedRoute = ({ user, children }: {user:string, children: ReactElement}) => {
  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default App;