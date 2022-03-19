import React from 'react'
import Navbar from '../navbar'
import CompletedContainer from './completed-container'

function Completed() {
  return (
    <div className='flex w-full h-screen'>
      <Navbar />

      <CompletedContainer />
    </div>

  )
}

export default Completed