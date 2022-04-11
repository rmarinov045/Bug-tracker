import React, { useState } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import useTitle from '../../hooks/useTitle'

import { UserData } from '../../types'

import Navbar from '../Navbar'
import Modal from '../Utils/Modal'
import ProfileCard from './ProfileCard'
import ProfileFull from './ProfileFull'

function Profile() {
    const user: UserData = useSelector((state: RootStateOrAny) => state.user.value)

    const [modalMessage, setModalMessage] = useState('')
    const [modalColor, setModalColor] = useState('')

    function updateModal(message: string, color: string) {
        setModalMessage(message)
        setModalColor(color)

        setTimeout(() => setModalMessage(''), 4000)
    }

    useTitle('signUM - Profile')

    return (
        <>
            <Modal message={modalMessage} bgColor={modalColor} />
            <div className='flex h-screen w-full overflow-x-hidden dark:bg-dark-background'>
                <Navbar />
                <main id='profile-container' className='w-full p-4 overflow-y-scroll'>
                    <div className='flex flex-col items-center gap-10'>
                        <ProfileCard updateModal={updateModal} user={user} />
                        <ProfileFull updateModal={updateModal} user={user} />
                    </div>
                </main>
            </div>
        </>
    )
}

export default Profile