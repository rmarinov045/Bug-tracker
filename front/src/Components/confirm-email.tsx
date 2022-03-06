import React from 'react'
import { Link } from 'react-router-dom'

function confirmEmail() {
    return (
        <div className='w-full h-screen flex items-center justify-center flex-col'>

            <div className='flex flex-col gap-10 items-center w-3/4 text-center p-4 bg-green-500 rounded-xl shadow-xl text-gray-100'>
                <h1 className='font-bold text-3xl'>Thank you for taking part!</h1>
                <h1 className='font-bold'>Please check your inbox for more instructions on how to confirm your email</h1>
            </div>

            <Link to='/' className='mt-10 font-bold flex gap-2'><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>Go back to login page</Link>

        </div>
    )
}

export default confirmEmail

