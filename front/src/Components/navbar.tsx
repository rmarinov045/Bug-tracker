import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import logo from '../assets/logo-new.jpg'
import '../App.css'

import { authenticate, reset, setDarkMode } from '../features/userReducer'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { persistor, useAppDispatch } from '../store'

const root = document.getElementById('root')

function Navbar() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [error, setError] = useState('')    

    async function handleLogout(): Promise<any> {        
        try {            
            await signOut(auth)                                   
            dispatch(authenticate(false))
            dispatch(reset(null))
            await persistor.purge()
            navigate('/')
        } catch (err) {
            setError('Ooops... Something went wrong, please try again later')
        }
    }

    function handleDarkModeChange() {
        dispatch(setDarkMode(null))
        root?.classList.toggle('dark')
    }

    return (
        <nav id='navbar' className='flex-col h-full pt-2 pb-2 bg-green-500 items-center flex z-0 filter dark:bg-indigo-900'>

            <div className='w-full flex items-center justify-center pt-4'>
                <img src={logo} alt="logo" className='h-12 w-12 rounded-full' />
            </div>

            <div className='flex flex-col gap-2 pt-10 items-center w-full'>

                <NavLink to='/projects' className='cursor-pointer min-h-[3rem] mb-10 flex items-center transform transition ease-in-out 150 hover:text-white w-full dark:hover:text-green-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                </NavLink>

                <NavLink to='/admin' className='cursor-pointer min-h-[3rem] flex items-center transform transition ease-in-out 150 hover:text-white w-full dark:hover:text-green-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                </NavLink>

                <NavLink to='/completed' className='cursor-pointer min-h-[3rem] flex items-center transform transition ease-in-out 150 hover:text-white w-full dark:hover:text-green-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </NavLink>

                <NavLink to='/profile' className='cursor-pointer min-h-[3rem] flex items-center transform transition ease-in-out 150 hover:text-white w-full dark:hover:text-green-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </NavLink>

                <div data-testid='mode' onClick={() => handleDarkModeChange()} className='cursor-pointer min-h-[3rem] flex items-center transform transition ease-in-out 150 hover:fill-white hover:text-white w-full dark:hover:fill-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" fill="" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </div>


            </div>


            <div className='flex flex-col mt-auto pb-4 cursor-pointer transform transition ease-in-out 150 hover:text-white w-full items-center justify-center gap-7 dark:hover:text-green-500'>
                {error ? <p className='bg-red-500 absolute left-12 rounded-xl pl-2 pr-2 p-1 text-white font-bold text-center w-full'>{error}</p> : ''}
                <svg data-testid='logout' onClick={handleLogout} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </div>

        </nav>
    )
}
export default Navbar