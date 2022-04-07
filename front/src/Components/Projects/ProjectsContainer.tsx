import React, { useState } from 'react'
import CreateProject from './CreateProject'
import ProjectCard from './ProjectCard'
import Modal from '../Utils/Modal'

function ProjectsContainer({ projects = [] }: any) {

    const [addMenu, setAddMenu] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [modalColor, setModalColor] = useState('')

    return (
        <>
        <Modal message={modalMessage} bgColor={modalColor} />
            <section className='w-full'>
                <div className='w-full p-2'>
                    <ul className='w-full'>
                        <div className='w-full min-h-[10rem] grid grid-cols-3 justify-items-center p-1 gap-1'>

                            {projects.map((x: any) => <ProjectCard key={x.id} setModalMessage={setModalMessage} setModalColor={setModalColor} project={x} />)}


                            <li onClick={() => setAddMenu(!addMenu)} className='w-full min-h-[10rem] rounded bg-slate-100 text-green-500 flex flex-col items-center justify-center font-bold text-xl text-center overflow-x-hidden cursor-pointer transition ease-in-out 200 hover:text-green-600'>
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