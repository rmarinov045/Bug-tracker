import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import useTitle from '../../hooks/useTitle'
import Navbar from '../Navbar'
import ProjectModal from '../utils/ProjectModal'
import CompletedContainer from './CompletedContainer'

function Completed() {
  const project = useSelector((state :RootStateOrAny) => state.user.currentProject)

  useTitle('signUM - Resolved issues')

  return (
    <main className='flex w-full h-screen dark:bg-dark-background dark:text-white'>
      <Navbar />

      <ProjectModal project={project} />

      <CompletedContainer project={project} />
    </main>

  )
}

export default Completed