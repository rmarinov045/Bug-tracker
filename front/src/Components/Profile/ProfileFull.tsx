import { updateUserById, User } from '../../features/userReducer'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

function ProfileFull(props :any) {
    const user :User = props.user
    const [userData, setUserData] = useState(user)

    const dispatch = useDispatch()

    const handleChange = (e :any) => {
        const inputValue = e.currentTarget.value
        
        setUserData(prevState => ({
            ...prevState, 
            [e.target.id]: inputValue
        }))
    }

    function handleUpdate(e :any) {
        e.preventDefault()
        
        dispatch(updateUserById(userData)) // add error handling
    }

    return (
        <div className='w-3/4 flex flex-col gap-10 border-2 border-slate-50 shadow-md p-2'>
            <div className='flex gap-7 items-center justify-center border-b-2 p-2 w-full focus-within:border-green-500 transition ease-in-out 150'>
                <label className='font-bold w-40' htmlFor="firstName">First Name</label>
                <input onChange={(e) => handleChange(e)} className='focus:outline-none text-slate-500 text-sm w-full' value={userData.firstName} type="text" name="firstName" id="firstName" />
            </div>
            <div className='flex gap-7 items-center justify-center border-b-2 p-2 focus-within:border-green-500 transition ease-in-out 150'>
                <label className='font-bold w-40' htmlFor="lastName">Last Name</label>
                <input onChange={(e) => handleChange(e)} className='focus:outline-none text-slate-500 text-sm w-full' value={userData.lastName} type="text" name="lastName" id="lastName" />
            </div>
            <div className='flex gap-7 items-center justify-center border-b-2 p-2 focus-within:border-green-500 transition ease-in-out 150'>
                <label className='font-bold w-40' htmlFor="company">Company</label>
                <input onChange={(e) => handleChange(e)} className='focus:outline-none text-slate-500 text-sm w-full' value={userData.company} type="text" name="company" id="company" />
            </div>
            <div className='flex gap-7 items-center justify-center border-b-2 p-2 focus-within:border-green-500 transition ease-in-out 150'>
                <label className='font-bold w-40' htmlFor="position">Position</label>
                <input onChange={(e) => handleChange(e)} className='focus:outline-none text-slate-500 text-sm w-full' value={userData.position} type="text" name="firstName" id="position" />
            </div>
            <div className='flex gap-7 items-center justify-center'>
                <button className='p-2 filte transform transition ease-in-out 150 hover:brightness-90 bg-blue-400 text-white font-bold rounded-md' onClick={(e) => handleUpdate(e)}>Update Profile</button>
                <button className='p-2 filte transform transition ease-in-out 150 hover:brightness-90 bg-red-400 text-white font-bold rounded-md'>Reset Password</button>
            </div>
        </div>
    )
}

export default ProfileFull