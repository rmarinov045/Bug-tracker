import React, { ReactChild, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import Spinner from './utils/Spinner'

function PublicRoute({ component }: { component: ReactChild }) {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user && user.emailVerified) {
                setLoading(false)
                navigate('/admin')
                return
            }
            setLoading(false)
        })
        return () => {
            setLoading(false)
            auth.currentUser?.reload()
        }
    }, [navigate])

    return (
        loading ? <Spinner /> : <>{component}</>
    )
}

export default PublicRoute