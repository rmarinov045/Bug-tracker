import { sendPasswordResetEmail } from 'firebase/auth'
import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import Modal from '../utils/Modal'

function PasswordReset() {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [bgColor, setBgColor] = useState('')

    const navigate = useNavigate()

    async function handlePasswordReset(e: SyntheticEvent) {
        e.preventDefault()

        if (!email) {
            setMessage('Please enter a valid email')
            setBgColor('#dc2626')
            setTimeout(() => {
                setMessage('')
            }, 3000)
            return null
        }

        try {
            await sendPasswordResetEmail(auth, email)
            setMessage('Please check your inbox for more information. You will be redirected to login in 5 seconds.')
            setBgColor('#16a34a')
            setTimeout(() => {
                setMessage('')
                setBgColor('')
                navigate('/')
            }, 5000)
        } catch (err: any) {            
            setMessage('Email not found')
            setBgColor('#dc2626')

            setTimeout(() => {
                setMessage('')
            }, 3000);

            return null
        }

    }

    return (
        <main className='h-screen flex'>
            <Modal message={message} bgColor={bgColor} />
            <form className='w-full flex flex-col items-center justify-center gap-10'>
                <label htmlFor="email" className='font-bold'>Please enter your email</label>
                <input data-testid='email' onPaste={(e) => setEmail(e.clipboardData.getData('text/plain'))} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder='email@email.com' className='pl-2 pr-2 p-1 w-1/2 bg-transparent border-b-2 border-black transform transition ease-in-out 150 focus:outline-none focus:border-green-500' />
                <button onClick={(e) => handlePasswordReset(e)} className='p-2 w-36 transition ease-in-out 150 hover:brightness-90 bg-red-400 text-white font-bold rounded-md dark:hover:text-green-500 dark:bg-dark-background'>Reset Password</button>
            </form>
        </main>
    )
}

export default PasswordReset