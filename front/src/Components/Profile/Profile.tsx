import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'

import { User } from '../../features/userReducer'

import Navbar from '../navbar'
import ProfileCard from './ProfileCard'
import ProfileFull from './ProfileFull'

function Profile() {
    const user: User = useSelector((state: RootStateOrAny) => state.user.value)

    return (
        <div className='flex h-screen w-full'>
            <Navbar />
            <main className='w-full p-4'>
                <div className='flex w-full gap-10'>
                    <ProfileCard user={user} />
                    <ProfileFull user={user} />
                </div>
            </main>
        </div>
    )
}

export default Profile