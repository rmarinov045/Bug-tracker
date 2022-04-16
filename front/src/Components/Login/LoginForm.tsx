import { getAuth, onAuthStateChanged, reload } from 'firebase/auth'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authenticate, getUserByEmail } from '../../features/userReducer'

import logo from '../../assets/logo-new.jpg'

import { login } from '../../auth/auth'
import ErrorField from '../Utils/Error'
import useTitle from '../../hooks/useTitle'

function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleLogin(email: string, password: string): Promise<undefined | void> {
        setIsLoading(true)

        if (!email || !password) {
            setError('Please fill all fields')
            setIsLoading(false)
            return
        }

        if (!email.includes('@')) {
            setIsLoading(false)
            setError('Please enter a valid email address')
            return
        }

        const response = await login(email, password)

        if ('errorCode' in response) {
            setIsLoading(false)
            return setError('Incorrect username or password')
        } else {
            dispatch(getUserByEmail(email))

            dispatch(authenticate(true))

            const auth = getAuth()

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    reload(user)
                }
            })
            setIsLoading(false)
            navigate('admin')
            return
        }

    }

    useTitle('signUM - Login')

    return (
        <>
            <div className='fixed items-center top-0 font-bold text-white text-xs lg:text-base flex flex-col gap-3 p-2 bg-blue-900 w-full'>
                <p>This is an educational project. You may use the following credentials to log in:</p>
                <p>Email: <span className='bg-black rounded text-orange-500 p-1'>admin@signum.com</span></p>
                <p>Password: <span className='bg-black rounded text-orange-500 p-1'>admin12345</span></p>
            </div>


            <div className="flex flex-col justify-center w-2/3 lg:w-1/3 m-auto h-screen">

                <div className="flex flex-col justify-center items-center">
                    <p className="font-extrabold text-3xl lg:text-4xl flex items-center gap-4">Log in to <img src={logo} className='h-26 w-28' alt='logo' /></p>
                    <hr className="mt-4 w-full" />

                    {error ? <ErrorField errorMessage={error} /> : ''}

                </div>
                <div className="flex flex-col mt-6 w-full md:mx-auto">
                    <form action="" className="flex flex-col gap-6 items-start">
                        <label className="pl-2 font-bold text-xl" htmlFor="email">Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} className="pl-2 pr-2 p-1 w-full border-b-2 bg-transparent border-black transform transition ease-in-out 150 focus:outline-none focus:border-green-500" name="email" type="email" placeholder="lorem@ipsum.com" />
                        <label className="pl-2 font-bold text-xl" htmlFor="password">Password:</label>
                        <input onChange={(e) => setPassword(e.target.value)} className="pl-2 pr-2 p-1 w-full bg-transparent border-b-2 border-black transform transition ease-in-out 150 focus:outline-none focus:border-green-500" name="password" type="password" placeholder="**********" />
                    </form>
                    <div className="flex flex-col gap-8 w-full justify-center items-center mt-10">
                        <button disabled={isLoading ? true : false} onClick={() => handleLogin(email, password)} className="bg-green-500 pl-2 pr-2 pt-2 pb-2 w-1/2 text-white font-bold rounded-xl transform transition ease-in-out 150 filter hover:brightness-90" type="submit">
                            {isLoading ? <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" className='h-6 w-6 m-auto'
                                viewBox="0 0 100 100" enableBackground="new 0 0 0 0">
                                <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                                    <animateTransform
                                        attributeName="transform"
                                        dur="1s"
                                        type="translate"
                                        values="0 15 ; 0 -15; 0 15"
                                        repeatCount="indefinite"
                                        begin="0.1" />
                                </circle>
                                <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
                                    <animateTransform
                                        attributeName="transform"
                                        dur="1s"
                                        type="translate"
                                        values="0 10 ; 0 -10; 0 10"
                                        repeatCount="indefinite"
                                        begin="0.2" />
                                </circle>
                                <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
                                    <animateTransform
                                        attributeName="transform"
                                        dur="1s"
                                        type="translate"
                                        values="0 5 ; 0 -5; 0 5"
                                        repeatCount="indefinite"
                                        begin="0.3" />
                                </circle>
                            </svg> : 'Login'}
                        </button>
                        <Link to="/register" className="text-sm cursor-pointer border-b-2 border-transparent hover:border-green-500 transform transition ease-in-out 150">Don't have an account yet? Sign up!</Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginForm
