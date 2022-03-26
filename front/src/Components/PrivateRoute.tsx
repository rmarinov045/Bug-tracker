import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { Navigate } from 'react-router-dom'

import { auth } from '../firebase'
import Spinner from './Utils/Spinner'

function PrivateRoute({ children }: any) {
  const [userAuth, setUserAuth] = useState(false)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {    
    auth.onAuthStateChanged(user => {
      if (user) {
        setUserAuth(true)
      }
      setLoading(false)
    })
  }, [dispatch])

  return (
    loading ? <Spinner /> : userAuth ? children : <Navigate to='/' />
  )

}

export default PrivateRoute