import React from 'react'
import { deleteProjectById } from '../../features/projectReducer'
import { useAppDispatch } from '../../store'
import { Project } from '../../types'

function ProjectCard({ currentProject, handleOpen, project, setModalMessage, setModalColor }: { currentProject: Project, handleOpen: Function, project: Project, setModalMessage: Function, setModalColor: Function }) {

    const dispatch = useAppDispatch()

    async function handleDelete() {
        const res = await dispatch(deleteProjectById(project.id))

        if (!res) {
            setModalMessage('Failed to delete project. Please try again later.')
            setModalColor('#dc2626')
            setTimeout(() => setModalMessage(''), 4000)
            return
        }

        setModalMessage('Project deleted!')
        setModalColor('#16a34a')
        setTimeout(() => setModalMessage(''), 4000)
    }

    return (
        <>
            <li className='w-full min-h-[10rem] rounded bg-amber-200 flex flex-col items-center justify-center font-bold text-xl text-center overflow-x-hidden dark:bg-dark-secondary'>
                <p className='w-full text-ellipsis overflow-x-hidden p-2'>{project.name}</p>
                {currentProject.id === project.id ? <p className='text-xs'>(Currently opened)</p> : <></>}
                <div className='container flex w-full items-center justify-center gap-10 mt-5'>
                    {currentProject.id === project.id ? <></> : <svg onClick={() => { handleOpen(project.name, project.id) }} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 hover:text-white transition ease-in-out 250 cursor-pointer dark:hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>}
                    <svg onClick={() => handleDelete()} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 hover:text-white transition ease-in-out 250 cursor-pointer dark:hover:text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
            </li>
        </>
    )
}

export default ProjectCard