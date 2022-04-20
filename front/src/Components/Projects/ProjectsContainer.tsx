import React, { useState } from 'react'
import CreateProject from './CreateProject'
import ProjectCard from './ProjectCard'
import { Project } from '../../types'
import Modal from '../utils/Modal'
import { useAppDispatch } from '../../store'
import { openProject } from '../../features/userReducer'
import { useNavigate } from 'react-router-dom'
import { RootStateOrAny, useSelector } from 'react-redux'
import SmallSpinner from '../utils/SmallSpinner'

function ProjectsContainer({ projects = [], loaded }: { projects: Project[], loaded: boolean }) {

    const [addMenu, setAddMenu] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [modalColor, setModalColor] = useState('')

    const currentProject = useSelector((state: RootStateOrAny) => state.user.currentProject)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    async function handleOpen(projectName: string, projectId: string) {
        const res = dispatch(openProject({ name: projectName, id: projectId }))

        if (res) {
            navigate('/admin')
        } else {
            setModalMessage('Could not open project. Please try again later!')
            setModalColor('#16a34a')
            setTimeout(() => setModalMessage(''), 4000)
        }
    }

    return (
        <>
            <Modal message={modalMessage} bgColor={modalColor} />
            <section className='w-full xl:w-2/3 xl:m-auto'>
                <div className='w-full p-2'>
                    <ul className='w-full'>
                        <div className='w-full min-h-[10rem] flex flex-col md:grid md:grid-cols-3 justify-items-center p-1 gap-1'>

                            <li className='w-full min-h-[10rem] rounded bg-amber-200 flex flex-col items-center justify-center font-bold text-xl text-center overflow-x-hidden dark:bg-dark-secondary'>
                                <p className='w-full text-ellipsis overflow-x-hidden p-2'>Default</p>
                                {currentProject.id === 'default' ? <p className='text-xs'>(Currently opened)</p> : <></>}
                                <div className='container flex w-full items-center justify-center gap-10 mt-5'>
                                    {currentProject.id === 'default' ? <></> : <svg onClick={() => handleOpen('default', 'default')} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 hover:text-white transition ease-in-out 250 cursor-pointer dark:hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>}
                                </div>
                            </li>

                            {loaded ? projects.map((x: any) => <ProjectCard currentProject={currentProject} handleOpen={handleOpen} key={x.id} setModalMessage={setModalMessage} setModalColor={setModalColor} project={x} />) : <SmallSpinner />}

                            <li onClick={() => setAddMenu(!addMenu)} className='w-full min-h-[10rem] rounded bg-slate-100 text-green-500 flex flex-col items-center justify-center font-bold text-xl text-center overflow-x-hidden cursor-pointer transition ease-in-out 200 hover:text-green-600 dark:text-dark-primary'>
                                <div className='container flex w-full items-center justify-center gap-10'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>

                {addMenu ? <CreateProject visible={setAddMenu} setModalMessage={setModalMessage} setModalColor={setModalColor} /> : <></>}

            </section>
        </>
    )
}

export default ProjectsContainer