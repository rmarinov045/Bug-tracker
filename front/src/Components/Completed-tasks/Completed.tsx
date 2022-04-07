import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import Navbar from '../Navbar'
import ProjectModal from '../Utils/ProjectModal'
import CompletedContainer from './CompletedContainer'

function Completed() {
  const project = useSelector((state :RootStateOrAny) => state.user.currentProject)

  return (
    <div className='flex w-full h-screen'>
      <Navbar />

      <ProjectModal project={project} />

      <CompletedContainer />
    </div>

  )
}

export default Completed