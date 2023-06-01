import React from 'react'
import logo from '../logo/logo.png';
import Login from './Login';
import Signup from './Signup';
import Fpage from './Fpage';
import Error from './Error';
import Home from './Home';
import Profile from './Profile';
import PasswordReset from './PasswordReset';
import ForgotPassword from './ForgotPassword';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dash from './Dash';
import Chatbot from './Chatbot';
import Chat from './Chat';
const Navbar = () => {
  return (

    <nav>
      <BrowserRouter>
        <div className='main-nav'>
          <img src={logo} alt="logo" className='logo_image' />
          <h2 className='heading'>
            <b>360-BAZAR</b>
          </h2>
          <ul className='list'>
            <li><Link to='/home' className='menu'>Home</Link></li>
            <li><Link to='/fpage' className='menu'>AffiliateProgram</Link></li>
            <li><Link to='/signup' className='menu'>Signup</Link></li>
            <li><Link to='/login' className='menu'>Login</Link></li>
          </ul>
        </div>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/fpage' element={<Fpage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dash' element={<Dash />} />
          <Route path='*' element={<Error />} />
          <Route path='/password-reset' element={<PasswordReset />} />
          <Route path='/forgot-password/:id/:token' element={<ForgotPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/chatbot' element={<Chatbot />} />

          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </nav>
  );
};
export default Navbar;
