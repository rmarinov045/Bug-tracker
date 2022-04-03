import React from 'react'
import Navbar from '../Navbar'
import CompletedContainer from './CompletedContainer'

function Completed() {
  return (
    <div className='flex w-full h-screen'>
      <Navbar />

      <CompletedContainer />
    </div>

  )
}

export default Completed