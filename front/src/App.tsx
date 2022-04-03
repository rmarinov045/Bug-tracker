import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute';

import { store } from './store';
import { persistor } from './store';

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import LoginForm from './Components/Login/LoginForm'
import RegisterForm from './Components/Register/RegisterForm'
import ConfirmEmail from './Components/Register/ConfirmEmail'
import HomeMain from './Components/Dashboard/HomeMain'
import Completed from './Components/Completed-tasks/Completed';
import Profile from './Components/Profile/Profile';
import Spinner from './Components/Utils/Spinner';
import PublicRoute from './Components/PublicRoute';

// added router and store
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PublicRoute component={<LoginForm />} />} />
            <Route path='/register' element={<PublicRoute component={<RegisterForm />} />} />
            <Route path='/register/*' element={<PublicRoute component={<ConfirmEmail />} />} />
            <Route path='*' element={<Navigate to='/' />} />
            <Route path='/admin' element={<PrivateRoute component={<HomeMain />}></PrivateRoute>} />
            <Route path='/completed' element={<PrivateRoute component={<Completed />}></PrivateRoute>} />
            <Route path='/profile' element={<PrivateRoute component={<Profile />}></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
