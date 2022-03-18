import React from 'react';
import './App.css';

import LoginForm from './Components/Login/login-form'
import RegisterForm from './Components/Register/register-form'
import ConfirmEmail from './Components/Register/confirm-email'
import HomeMain from './Components/Dashboard/home-main'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { configureStore } from '@reduxjs/toolkit'

import { Provider } from 'react-redux'

import userReducer from './features/userReducer'
import taskReducer from './features/taskReducer';
import tasksReducer from './features/tasksReducer';



// configure redux store
const store = configureStore({
    reducer: {
      user: userReducer,
      task: taskReducer,
      tasks: tasksReducer
    }
})

// added router and store
// add private route if to block users accessing dashboard if not logged in
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<LoginForm />} />
    <Route path='/register' element={<RegisterForm />} />
    <Route path='/register/*' element={<ConfirmEmail />} />
    <Route path='*' element={<Navigate to='/' />} />
    <Route path='/admin' element={<HomeMain />} />
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
