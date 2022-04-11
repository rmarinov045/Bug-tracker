import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import 'react-calendar/dist/Calendar.css'
import ProjectsContainer from './ProjectsContainer'
import { useAppDispatch } from '../../store'
import { getProjects } from '../../features/projectReducer'
import { RootStateOrAny, useSelector } from 'react-redux'
import useTitle from '../../hooks/useTitle'


function Projects() {

    const projects = useSelector((state :RootStateOrAny) => state.projects.list)
    const projectsLoaded = useSelector((state: RootStateOrAny) => state.projects.loaded)

    const dispatch = useAppDispatch()

    useEffect(() => {
        async function fetchProjects() {
            await dispatch(getProjects())
        }
        fetchProjects()
        return () => { }
    }, [dispatch])

    useTitle('signUM - Projects')

    return (
        <div className='flex w-full h-screen dark:bg-dark-background dark:text-white'>
            <Navbar />
            <main className='flex flex-col space-y-6 w-full p-2 pt-4'>
                <section className='border-b-2 pb-2'>
                    <div className='flex-col flex gap-5 items-center justify-center w-full m-auto text-center'>
                        <h2 className='text-3xl font-bold'>Projects:</h2>
                        <p className='font-bold text-xs w-2/3'>Each project has it's own board and set of tasks</p>
                    </div>
                </section>

                <ProjectsContainer projects={Object.values(projects)} loaded={projectsLoaded} />

            </main>


        </div>
    )
}

export default Projects