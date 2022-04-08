import React, { useEffect, useState } from 'react'

import Navbar from '../Navbar'
import TasksContainer from './TaskContainer'

import '../../App.css'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import Filter from '../Utils/Filter'
import Modal from '../Utils/Modal'
import { getTasks, searchTasks } from '../../features/tasksReducer'
import SearchField from '../Utils/SearchField'
import ProjectModal from '../Utils/ProjectModal'

function HomeMain() {
    const userFirstName = useSelector((state: RootStateOrAny) => state.user.value.firstName)
    const project = useSelector((state :RootStateOrAny) => state.user.currentProject)

    const [error, setError] = useState('')
    const [modalColor, setModalColor] = useState('#dc2626')
    const [filtered, setFiltered] = useState(false)

    const tasks = useSelector((state: RootStateOrAny) => state.tasks.tasks)
    const tasksLoaded = useSelector((state: RootStateOrAny) => state.tasks.loaded)
    const filteredTasks = useSelector((state :RootStateOrAny) => state.tasks.filtered)

    function updateModalMessage(message: string) {
        setError(message)
    }

    function updateModalColor(bgColor: string) {
        setModalColor(bgColor)
    }

    function handleSearch(search: string) {
        dispatch(searchTasks(search.toLowerCase()))
        setFiltered(true)

        if (!search) {
            dispatch(getTasks(project.id))
            setFiltered(false)
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasks(project.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

        <div className='flex h-screen w-full'>

            <Modal message={error} bgColor={modalColor} />

            <Navbar />

            <div id='home-admin' className='flex h-screen w-full filter overflow-x-hidden'>

                <ProjectModal project={project} />

                <div className="w-full flex flex-col pt-10 items-center">

                    <p className='font-bold text-2xl md:text-3xl border-b-2 w-5/6 text-center pb-2'>Greetings {userFirstName}!</p>

                    <Filter updateModalMessage={updateModalMessage} updateModalColor={updateModalColor} />

                    <div className='flex w-full p-2 mt-3 items-center justify-center'>

                        <div className='flex-col w-full'>
                            <SearchField handleSearch={handleSearch} />
                            <h1 className='font-bold text-center text-xl lg:text-2xl'>Current issues:</h1>
                        </div>

                    </div>

                    <TasksContainer tasks={filtered ? filteredTasks : tasks} tasksLoaded={tasksLoaded} updateModalMessage={updateModalMessage} updateModalColor={updateModalColor} />

                </div>
            </div>


        </div>

    )
}

export default HomeMain