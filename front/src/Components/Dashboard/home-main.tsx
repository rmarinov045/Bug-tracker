import React, { useEffect, useState } from 'react'

import Navbar from '../navbar'
import TasksContainer from './tasks-container'

import '../../App.css'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import Filter from '../Utils/Filter'
import Modal from '../Utils/Modal'
import { getTasks, searchTasks } from '../../features/tasksReducer'

function HomeMain() {
    const userFirstName = useSelector((state: RootStateOrAny) => state.user.value.firstName)

    const [error, setError] = useState('')
    const [modalColor, setModalColor] = useState('#dc2626')

    const tasks = useSelector((state: RootStateOrAny) => state.tasks.tasks)
    const tasksLoaded = useSelector((state: RootStateOrAny) => state.tasks.loaded)

    function updateModalMessage(message: string) {
        setError(message)
    }

    function updateModalColor(bgColor: string) {
        setModalColor(bgColor)
    }

    function handleSearch(search :string) {        
        dispatch(searchTasks(search.toLowerCase()))

        if (!search) {
            dispatch(getTasks())
        }
    }

    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(getTasks())
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // remove add task menu on outside click
    return (

        <div className='flex h-screen w-full'>

            <Modal message={error} bgColor={modalColor} />

            <Navbar />

            <div id='home-admin' className='flex h-screen w-full filter'>

                <div className="w-full flex flex-col pt-10 items-center">

                    <p className='font-bold text-2xl md:text-3xl border-b-2 w-5/6 text-center pb-2'>Greetings {userFirstName}!</p>

                    <Filter updateModalMessage={updateModalMessage} updateModalColor={updateModalColor} />

                    <div className='flex w-full p-2 mt-3 items-center justify-center'>

                        <div className='flex absolute left-20 gap-2 w-1/4 items-center justify-center'>
                            <input onChange={(e) => handleSearch(e.target.value)} className='border-b-2 w-32 border-slate-200 transition ease-in-out 150 focus:border-green-500 focus:outline-none p-1 pl-2 text-sm bg-transparent' placeholder='Search issues....' type="text" name="search" id="search" />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <div>
                            <h1 className='font-bold text-xl'>Current issues:</h1>
                        </div>

                    </div>

                    <TasksContainer tasks={tasks} tasksLoaded={tasksLoaded} updateModalMessage={updateModalMessage} updateModalColor={updateModalColor} />

                </div>
            </div>


        </div>

    )
}

export default HomeMain