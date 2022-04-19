import React, { useEffect } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';

import LoginForm from './components/login/LoginForm'
import RegisterForm from './components/register/RegisterForm'
import ConfirmEmail from './components/register/ConfirmEmail'
import HomeMain from './components/dashboard/HomeMain'
import Completed from './components/completed-tasks/Completed';
import Profile from './components/profile/Profile';
import PublicRoute from './components/PublicRoute';
import Projects from './components/projects/Projects';
import PasswordReset from './components/login/PasswordReset';

import { RootStateOrAny, useSelector } from 'react-redux';

function App() {

  const darkMode = useSelector((state: RootStateOrAny) => state.user.darkMode)
  const root = document.getElementById('root')

  useEffect(() => {
      darkMode ? root?.classList.add('dark') : root?.classList.remove('dark')
  }, [darkMode, root])

  return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PublicRoute component={<LoginForm />} />} />
            <Route path='/register' element={<PublicRoute component={<RegisterForm />} />} />
            <Route path='/register/confirm-email' element={<PublicRoute component={<ConfirmEmail />} />} />
            <Route path='*' element={<PublicRoute component={<LoginForm />} />} />
            <Route path='/projects' element={<PrivateRoute component={<Projects />} />} />
            <Route path='/admin' element={<PrivateRoute component={<HomeMain />}></PrivateRoute>} />
            <Route path='/completed' element={<PrivateRoute component={<Completed />}></PrivateRoute>} />
            <Route path='/profile' element={<PrivateRoute component={<Profile />}></PrivateRoute>} />
            <Route path='/reset-password' element={<PublicRoute component={<PasswordReset />}></PublicRoute>} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
