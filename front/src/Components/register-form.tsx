import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import ErrorField from './error'
import { register } from '../features/userReducer'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../utils/auth'
import axios from 'axios'
import { updateUser }  from '../utils//auth'
import { auth } from '../firebase'
import { postUser } from '../utils/api'

export interface userData {
    firstName: string,
    lastName: string,
    company: string,
    position: string,
    email: string,
    userId?: string
}

function RegisterForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [company, setCompany] = useState('')
    const [position, setPosition] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [error, setError] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    function updateState(userData :userData) {
        dispatch(register(userData))
    }

    async function handleSubmit(e :any) :Promise<any> {     // check type here
        e.preventDefault()

        if(password.length < 6) {
            return setError('Password should be at least 6 symbols')
        }

        if (password !== confirmPass) {
            return setError('Passwords do not match!')
        }

        if(!email.includes('@')) {
            return setError('Please enter a valid email!')
        }

        try {
            const response = await registerUser(email, password)
            // response.uid => user ID from Firebase ID 

            const updateUserName = await updateUser(auth.currentUser, firstName) // update current logged in User's name

            const userId = response.uid

            const user = { firstName, lastName, company, position, email, userId }
            
            // post to Firebase DB
            const dbRes = postUser(user)

            if (!dbRes) {
                setError('Failed to register. Please try again.')
            } 
            
            updateState(user)
            navigate('/register/confirm-email')
            return
        } catch(err :any) {
            if(err.message.includes('email-already-in-use'))
            return setError('Email is already in use!')
        }
        
        
    }

    return (
        <div className='h-screen w-full flex justify-center lg:items-center items-start pt-10 bg-gradient-to-br from-teal-200 via-teal-100 to-white'>

            <div className='flex flex-col md:w-2/3 lg:w-1/3 lg:min-w-fit bg-white rounded-xl shadow-xl p-3'>

                <div className='border-b-2 pb-2'>
                    <h1 className='lg:text-4xl text-3xl font-bold break-words'>Sign up to /placeholder/</h1>
                </div>

                {error ? <ErrorField errorMessage={error || ''} /> : ''}

                <div className='mt-4'>
                    <form action="" className='flex flex-col gap-4' onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="firstName">First Name<span className='text-red-400 pl-1'>*</span></label>
                        <input onChange={(e) => setFirstName(e.target.value)} type="text" name="firstName" className='pl-2 p-1 pr-2 border-2 rounded-xl focus:outline-none focus:border-green-500 transform transition ease-in-out 150' />

                        <label htmlFor="lastName">Last Name<span className='text-red-400 pl-1'>*</span></label>
                        <input onChange={(e) => setLastName(e.target.value)} type="text" name="lastName" className='pl-2 p-1 border-2 rounded-xl focus:outline-none focus:border-green-500 transform transition ease-in-out 150' />

                        <label htmlFor="company">Company<span className='text-red-400 pl-1'>*</span></label>
                        <input onChange={(e) => setCompany(e.target.value)} type="text" name="company" className='pl-2 p-1 border-2 rounded-xl focus:outline-none focus:border-green-500 transform transition ease-in-out 150' />

                        <label htmlFor="position">Position<span className='text-red-400 pl-1'>*</span></label>
                        <input onChange={(e) => setPosition(e.target.value)} type="text" name="position" className='pl-2 p-1 border-2 rounded-xl focus:outline-none focus:border-green-500 transform transition ease-in-out 150' />

                        <label htmlFor="email">Email<span className='text-red-400 pl-1'>*</span></label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" className='pl-2 p-1 border-2 rounded-xl focus:outline-none focus:border-green-500 transform transition ease-in-out 150' />

                        <label htmlFor="password">Password<span className='text-red-400 pl-1'>*</span></label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" className='pl-2 p-1 border-2 rounded-xl focus:outline-none focus:border-green-500 transform transition ease-in-out 150' />

                        <label htmlFor="confirm-password">Confirm Password<span className='text-red-400 pl-1'>*</span></label>
                        <input onChange={(e) => setConfirmPass(e.target.value)} type="password" name="confirm-password" className='pl-2 p-1 border-2 rounded-xl focus:outline-none focus:border-green-500 transform transition ease-in-out 150' />

                        <button type='submit' className='bg-green-500 mt-4 w-1/2 rounded-xl m-auto p-2 text-white font-bold filter hover:brightness-90 transition ease-in-out 150'>Register</button>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default RegisterForm
