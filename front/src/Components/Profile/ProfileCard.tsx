import { getUserProfilePic, User } from '../../features/userReducer'
import React, { useEffect, useState } from 'react'

import defaultProfileImage from '../../assets/profile.jpeg'
import { uploadImage } from '../../firebase'
import { RootStateOrAny, useSelector } from 'react-redux'
import { useAppDispatch } from '../../store'
import SmallSpinner from '../Utils/SmallSpinner'
import { updateUserImage } from '../../api/userService'

function ProfileCard(props: any) {
    const user: User = props.user

    const [hover, setHover] = useState(false)
    const [loading, setLoading] = useState(true)
    const [updateImg, setUpdateImg] = useState(false)

    const imageUrl = useSelector((state :RootStateOrAny) => state.user.imageUrl)

    const dispatch = useAppDispatch()

    async function handleFileUpload(e :any) {
        e.preventDefault()
        
        const file = e.target.files[0]
        
        try {
            const uploadResponse = await uploadImage(file)
            
            await updateUserImage(uploadResponse)

            await dispatch(getUserProfilePic())

            props.updateModal('Profile picture updated!', '#16a34a')
            setUpdateImg(!updateImg)
        } catch (err) {
            props.updateModal('Could not update picture!', '#dc2626')
        }
    }

    useEffect(() => {
        async function getImage() {
            const res = await dispatch(getUserProfilePic())
            if (res) {
                setLoading(false)
            }
        }
        getImage()
        
    }, [dispatch, updateImg])

    return (

        <div className='w-3/5'>
            <div className='bg-slate-50 p-2 pt-10 items-center justify-start flex flex-col shadow-md gap-5 min-w-full self-start'>
                <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='w-32 h-32 cursor-pointer rounded-full flex items-center justify-center'>
                    {loading ? <SmallSpinner /> : <img src={imageUrl || defaultProfileImage} className='rounded-full min-w-full min-h-full' alt="Profile" />}

                    <form onChange={(e) => handleFileUpload(e)} className='h-32 w-32 absolute text-slate-500 rounded-full z-10 cursor-pointer'>

                    <label className='h-full w-full flex items-center justify-center cursor-pointer' htmlFor="upload-avatar">
                        <svg style={hover ? { display: 'block' } : { display: 'none' }} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer absolute h-1/3 w-1/3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </label>
                    <input className='hidden' accept='image/*' type="file" name="uploadAvatar" id="upload-avatar" />

                    </form>
                </div>
                <p className='w-full flex justify-center font-bold text-xl'>{user.firstName} {user.lastName}</p>
                <p className='w-full flex justify-center font-bold text-slate-500'>{user.position}</p>
                <p className='w-full flex justify-center font-bold text-slate-500'>@{user.company}</p>
            </div>
        </div>

    )
}

export default ProfileCard