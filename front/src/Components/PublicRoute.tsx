import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import Spinner from './Utils/Spinner'

function PublicRoute({ component } :any) {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                navigate('/admin')
                setLoading(false)
            }
        })
        return () => {}
    }, [navigate])

    return (
        loading ? <Spinner /> : <>{component}</> 
    )
}

export default PublicRoute