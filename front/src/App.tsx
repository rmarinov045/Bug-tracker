import React from 'react';
import './App.css';
import LoginForm from '../src/Components/login-form'
import RegisterForm from '../src/Components/register-form'
import ConfirmEmail from '../src/Components/confirm-email'
import HomeMain from '../src/Components/home-main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from './features/userReducer'

// configure redux store
const store = configureStore({
    reducer: {
      user: userReducer
    }
})
// added router and store
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<LoginForm />} />
    <Route path='/register' element={<RegisterForm />} />
    <Route path='/register/confirm-email' element={<ConfirmEmail />} />
    <Route path='/admin' element={<HomeMain />} />
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
