import { User } from '../../features/userReducer'
import React from 'react'

function ProfileCard(props :any) {
    const user :User = props.user

    return (

        <div className='w-3/5'>
            <div className='bg-slate-50 p-2 pt-10 items-center justify-start flex flex-col shadow-md gap-5 min-w-full self-start'>
                <div className='w-32 h-32 bg-blue-300 rounded-full flex items-center justify-center'>
                    <img src="rounded-full" alt="userProfileImage" />
                </div>
                <p className='w-full flex justify-center font-bold text-xl'>{user.firstName} {user.lastName}</p>
                <p className='w-full flex justify-center font-bold text-slate-500'>{user.position}</p>
                <p className='w-full flex justify-center font-bold text-slate-500'>@{user.company}</p>
            </div>
        </div>

    )
}

export default ProfileCard