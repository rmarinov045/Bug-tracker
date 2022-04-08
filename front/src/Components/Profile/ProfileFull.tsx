import { deleteUserProfilePic, updateUserById, User } from '../../features/userReducer'
import React, { useState } from 'react'
import { useAppDispatch } from '../../store'
import { RootStateOrAny, useSelector } from 'react-redux'
import { resetPassword } from '../../auth/auth'

function ProfileFull(props: any) {
    const user: User = props.user
    const [userData, setUserData] = useState(user)
    const [loading, setLoading] = useState(false)

    const userProfileImage = useSelector((state: RootStateOrAny) => state.user.imageUrl)

    const dispatch = useAppDispatch()

    const handleChange = (e: any) => {
        const inputValue = e.currentTarget.value

        setUserData(prevState => ({
            ...prevState,
            [e.target.id]: inputValue
        }))
    }

    async function handleUpdate(e: any) {
        e.preventDefault()
        setLoading(true)

        // add error handling to reducers and here

        const updateAction = await dispatch(updateUserById(userData)).unwrap()

        if (updateAction) {
            setLoading(false)
        }

        props.updateModal('Profile updated', '#16a34a')
    }

    async function handleImageDelete(e: any) {
        e.preventDefault()

        const deleteAction = await dispatch(deleteUserProfilePic())
        
        if (deleteAction) {
            props.updateModal('Profile image removed successfully!', '#16a34a')
        }
    }

    async function handlePasswordReset(e :any) {
        e.preventDefault()

        const res : Error | any = await resetPassword()
        
        if (res.code) {
            props.updateModal('Failed to reset password. Please try again later.', '#dc2626')
            return
        }

        props.updateModal('Please check your inbox for a confirmation email.', '#16a34a')
    }

    return (
        <form onSubmit={(e) => handleUpdate(e)} className='w-3/4 xl:w-1/2 flex flex-col gap-10 border-2 border-slate-50 shadow-md p-2 bg-white'>
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
            <div>
                {userProfileImage ? <button onClick={(e) => handleImageDelete(e)} className='font-bold text-xs text-red-600 hover:underline transition ease-in-out 150'>Remove profile picture</button> : <></>}
            </div>
            <div className='flex gap-7 items-center justify-center'>
                <button className='p-2 w-36 transition ease-in-out 150 hover:brightness-90 bg-blue-400 text-white font-bold rounded-md'>{loading ? <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" className='h-6 w-6 m-auto'
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
                </svg> : 'Update Profile'}</button>
                <button onClick={(e) => handlePasswordReset(e)} className='p-2 w-36 transition ease-in-out 150 hover:brightness-90 bg-red-400 text-white font-bold rounded-md'>Reset Password</button>
            </div>
        </form>
    )

}

export default ProfileFull