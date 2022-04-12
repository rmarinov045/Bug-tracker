import { getUserProfilePic } from '../../features/userReducer'
import React, { useCallback, useEffect, useState } from 'react'
import { UserData } from '../../types'

import defaultProfileImage from '../../assets/profile.jpeg'
import { uploadImage } from '../../api/userService'
import { RootStateOrAny, useSelector } from 'react-redux'
import { useAppDispatch } from '../../store'
import SmallSpinner from '../Utils/SmallSpinner'
import { updateUserImage } from '../../api/userService'

function ProfileCard(props: { updateModal: Function, user: UserData }) {
    const user: UserData = props.user

    const [hover, setHover] = useState(false)
    const [loading, setLoading] = useState(true)
    const [updateImg, setUpdateImg] = useState(false)

    const imageUrl = useSelector((state: RootStateOrAny) => state.user.imageUrl)

    const dispatch = useAppDispatch()

    async function handleFileUpload(e: any) {
        e.preventDefault()

        const file = e.target.files[0]

        try {
            const uploadResponse = await uploadImage(file)

            if (uploadResponse) {
                await updateUserImage(uploadResponse)
            }

            props.updateModal('Profile picture updated!', '#16a34a')
            setUpdateImg(!updateImg)
        } catch (err) {
            props.updateModal('Could not update picture!', '#dc2626')
        }
    }

    const getImage = useCallback(
        async () => {
            const res = await dispatch(getUserProfilePic())
            if (res) {
                setLoading(false)
            }
        },
        [dispatch],
    )


    useEffect(() => {
        getImage()

        return () => {
            setLoading(false)
        }

    }, [getImage, updateImg])

    return (

        <div className='w-3/5 xl:w-1/3'>
            <div className='bg-slate-50 p-2 pt-10 items-center justify-start flex flex-col shadow-md gap-5 min-w-full self-start dark:bg-dark-primary'>
                <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='w-32 h-32 relative cursor-pointer rounded-full flex items-center justify-center'>
                    {loading ? <SmallSpinner /> : <img src={imageUrl || defaultProfileImage} className='rounded-full min-w-full min-h-full z-0' alt="Profile" />}

                    <form onInput={(e) => handleFileUpload(e)} className='h-32 w-32 absolute text-slate-500 rounded-full z-10 cursor-pointer'>

                        <label className='h-full w-full flex items-center justify-center cursor-pointer' htmlFor="upload-avatar">
                            <svg style={hover ? { display: 'block' } : { display: 'none' }} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer h-12 w-12 text-green-500 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </label>
                        <input className='hidden' accept='image/*' type="file" name="uploadAvatar" id="upload-avatar" />

                    </form>
                </div>
                <p className='w-full flex justify-center font-bold text-xl dark:text-white'>{user.firstName} {user.lastName}</p>
                <p className='w-full flex justify-center font-bold text-slate-500 dark:text-gray-400'>{user.position}</p>
                <p className='w-full flex justify-center font-bold text-slate-500 dark:text-gray-400'>@{user.company}</p>
            </div>
        </div>

    )
}

export default ProfileCard