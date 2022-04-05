import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { auth } from '../firebase'
import Spinner from './Utils/Spinner'

function PrivateRoute({ component }: any) {
  const [userAuth, setUserAuth] = useState(false)

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  // add cleanup function
  useEffect(() => {    
    auth.onAuthStateChanged(user => {
      if (user) {
        setUserAuth(true)
        setLoading(false)
      } else {
        navigate('/')
      }
    })

    return () => {
      auth.currentUser?.reload()
    }
  }, [navigate])
  
  return loading ? <Spinner /> : userAuth ? <>{component}</> : null
  
}

export default PrivateRoute