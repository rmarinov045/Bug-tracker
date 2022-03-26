import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute';

import { store } from './store';
import { persistor } from './store';

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import LoginForm from './Components/Login/login-form'
import RegisterForm from './Components/Register/register-form'
import ConfirmEmail from './Components/Register/confirm-email'
import HomeMain from './Components/Dashboard/home-main'
import Completed from './Components/Completed-tasks/Completed';
import Profile from './Components/Profile/Profile';
import Spinner from './Components/Utils/Spinner';

// added router and store
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/register/*' element={<ConfirmEmail />} />
            <Route path='*' element={<Navigate to='/' />} />
            <Route path='/admin' element={<PrivateRoute component={<HomeMain />}><HomeMain /></PrivateRoute>} />
            <Route path='/completed' element={<PrivateRoute><Completed /></PrivateRoute>} />
            <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
