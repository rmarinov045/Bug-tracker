import React, { ReactChild, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { auth } from '../firebase'
import Spinner from './Utils/Spinner'

function PrivateRoute({ component }: { component: ReactChild }) {
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
        return
      }
    })

    return () => {
      setUserAuth(false)
      setLoading(false)
    }
  }, [navigate])

  return loading ? <Spinner /> : userAuth ? <>{component}</> : null

}

export default PrivateRoute