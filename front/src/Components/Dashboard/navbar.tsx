import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import testAvatar from '../../assets/logo192.png'
import '../../App.css'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'

function Navbar() {
    const navigate = useNavigate()
    const [error, setError] = useState('')

    async function handleLogout() :Promise<any> {        
        try {
            const response = await signOut(auth)
            navigate('/')
        } catch(err) {
            setError('Ooops... Something went wrong, please try again later')
        }
    }


    return (
        <div id='navbar' className='flex-col h-full pt-2 pb-2 bg-green-500 items-center flex z-0 filter'>

                <div className='w-full flex items-center justify-center pt-4'>
                    <img className='h-6 w-6 rounded-full' src={testAvatar} alt="user-avatar" />
                </div>

                <div className='flex flex-col gap-10 pt-10 items-center w-full'>

                    <Link to='/admin'>
                    <div className='cursor-pointer transform transition ease-in-out 150 hover:text-white w-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                    </div>
                    </Link>

                    <div className='cursor-pointer transform transition ease-in-out 150 hover:text-white w-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                    </div>

                    <div className='cursor-pointer transform transition ease-in-out 150 hover:text-white w-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className='cursor-pointer transform transition ease-in-out 150 hover:text-white w-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>

                </div>


                <div className='flex flex-col mt-auto pb-4 cursor-pointer transform transition ease-in-out 150 hover:text-white w-full items-center justify-center gap-7'>
                    {error ? <p className='bg-red-500 absolute left-12 rounded-xl pl-2 pr-2 p-1 text-white font-bold text-center w-full'>{error}</p> : ''}
                    <svg onClick={handleLogout}  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </div>

            </div>
    )
}
export default Navbar