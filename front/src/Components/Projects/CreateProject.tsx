import React, { SyntheticEvent, useState } from 'react'
import { createProject } from '../../features/projectReducer'
import { useAppDispatch } from '../../store'

function CreateProject({ visible, setModalMessage, setModalColor }: { visible: Function, setModalMessage: Function, setModalColor: Function }) {

    const [projectName, setProjectName] = useState('')
    const [loaded, setLoaded] = useState(false)

    const dispatch = useAppDispatch()

    async function handleCreate(e: SyntheticEvent) {
        e.preventDefault()
        setLoaded(true)

        if (!projectName) {
            setModalMessage('Please enter a project name.')
            setModalColor('#dc2626')

            setLoaded(false)

            setTimeout(() => setModalMessage(''), 4000)

            return
        }

        const res = await dispatch(createProject(projectName)).unwrap()

        if (typeof res === 'string') {
            setModalMessage('Failed to create project. Please try again later.')
            setModalColor('#dc2626')

            setLoaded(false)
            setTimeout(() => setModalMessage(''), 4000)

            return
        }

        setModalMessage('Project created!')
        setModalColor('#16a34a')

        setTimeout(() => setModalMessage(''), 4000)

        visible(false)

    }

    return (
        <div className='fixed w-9/12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform z-10'>
            <div className='w-full bg-white font-bold m-auto rounded-xl shadow-2xl min-h-fit p-2 border-2 border-black dark:bg-dark-primary'>
                <div className='flex items-center'>
                    <h1 className='text-3xl text-center font-bold m-auto'>Create a new project..</h1>
                    <div onClick={() => visible(false)} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" className="transform transition ease-in-out 150 hover:brightness-75 h-10 w-10 text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg></div>
                </div>
                <form onSubmit={(e) => handleCreate(e)} className='flex flex-col p-2 gap-2'>
                    <label htmlFor="issueName" className=''>Project name</label>
                    <input onChange={(e) => setProjectName(e.target.value)} value={projectName} className='transform transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:outline-none focus:border-green-500 dark:text-black' type="text" name="issueName" />
                    <button type='submit' className='mt-2 bg-black text-white font-bold rounded-xl pl-2 pr-2 p-1 shadow-xl w-1/2 self-center transition ease-in-out 150 hover:text-green-500 '>{loaded ?
                        <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" className='h-6 w-6 m-auto'
                            viewBox="0 0 100 100" enableBackground="new 0 0 0 0">
                            <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                                <animateTransform
                                    attributeName="transform"
                                    dur="1s"
                                    type="translate"
                                    values="0 15 ; 0 -15; 0 15"
                                    repeatCount="indefinite"
                                    begin="0.1" />
                            </circle>
                            <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
                                <animateTransform
                                    attributeName="transform"
                                    dur="1s"
                                    type="translate"
                                    values="0 10 ; 0 -10; 0 10"
                                    repeatCount="indefinite"
                                    begin="0.2" />
                            </circle>
                            <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
                                <animateTransform
                                    attributeName="transform"
                                    dur="1s"
                                    type="translate"
                                    values="0 5 ; 0 -5; 0 5"
                                    repeatCount="indefinite"
                                    begin="0.3" />
                            </circle>
                        </svg>
                        : 'Create'}</button>
                </form>
            </div>
        </div>
    )
}

export default CreateProject