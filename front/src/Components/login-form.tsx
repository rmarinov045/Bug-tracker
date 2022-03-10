import React, { useState } from 'react'
import { RootStateOrAny, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../utils/auth'
import ErrorField from './error'

function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleLogin(email: string, password: string): Promise<any> {
        const response = await login(email, password) // can be user or error

        if (response.errorCode) {
            return setError('Incorrect username or password')
        } else {
            dispatch((state :RootStateOrAny) => state.auth = true)    // update state that user is logged in
            navigate('admin')   // update user state with data from DB
            return
        }

    }

    return (
        <div className="flex flex-col justify-center w-2/3 lg:w-1/2 m-auto h-screen">
            <div className="flex flex-col justify-center items-center">
                <p className="font-extrabold text-2xl lg:text-4xl">Log in to /placeholder/</p>
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
                    <button onClick={() => handleLogin(email, password)} className="bg-green-500 pl-2 pr-2 pt-2 pb-2 w-1/2 text-white font-bold rounded-xl transform transition ease-in-out 150 filter hover:brightness-90" type="submit">Login</button>
                    <Link to="/register" className="text-sm cursor-pointer border-b-2 border-transparent hover:border-green-500 transform transition ease-in-out 150">Don't have an account yet? Sign up!</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
