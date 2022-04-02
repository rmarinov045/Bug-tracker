import { getAuth, onAuthStateChanged, reload } from 'firebase/auth'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authenticate, getUserByEmail } from '../../features/userReducer'

import { login } from '../../auth/auth'
import ErrorField from '../Utils/error'

function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleLogin(email: string, password: string): Promise<any> {
        setIsLoading(true)
        const response = await login(email, password) // can be user or error

        if (response.errorCode) {
            setIsLoading(false)
            return setError('Incorrect username or password')
        } else {
            dispatch(getUserByEmail(email))

            dispatch(authenticate(true))

            const auth = getAuth()  // Reloads user into local storage => may need to be in another function module

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

    return (
        <div className="flex flex-col justify-center w-2/3 lg:w-1/2 m-auto h-screen">
            <div className="flex flex-col justify-center items-center">
                <p className="font-extrabold text-2xl lg:text-4xl">Log in to SIGNUM</p>
                <hr className="mt-4 w-full" />

                {error ? <ErrorField errorMessage={error} /> : ''}

            </div>
            <div className="flex flex-col mt-6">
                <form action="" className="flex flex-col gap-6 items-start">
                    <label className="pl-2 font-bold text-xl" htmlFor="email">Email:</label>
                    <input onChange={(e) => setEmail(e.target.value)} className="pl-2 pr-2 p-1 w-full border-b-2 border-black transform transition ease-in-out 150 focus:outline-none focus:border-green-500" name="email" type="email" placeholder="lorem@ipsum.com" />
                    <label className="pl-2 font-bold text-xl" htmlFor="password">Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} className="pl-2 pr-2 p-1 w-full border-b-2 border-black transform transition ease-in-out 150 focus:outline-none focus:border-green-500" name="password" type="password" placeholder="**********" />
                </form>
                <div className="flex flex-col gap-8 w-full justify-center items-center mt-10">
                    <button onClick={() => handleLogin(email, password)} className="bg-green-500 pl-2 pr-2 pt-2 pb-2 w-1/2 text-white font-bold rounded-xl transform transition ease-in-out 150 filter hover:brightness-90" type="submit">
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
    )
}

export default LoginForm
