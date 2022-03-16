import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AddTask from './add-task'
import Navbar from './navbar'
import TasksContainer from './tasks-container'

import { auth } from '../../firebase'
import '../../App.css'
import { useDispatch } from 'react-redux'
import { filterTasks } from '../../features/tasksReducer'

function HomeMain() {
    const navigate = useNavigate()
    const [addTaskFieldOpened, setAddTaskFieldOpened] = useState(false)
    const [currentUserName, setCurrentUserName] = useState('')
    const [filterOpened, setFilterOpened] = useState(false)

    const dispatch = useDispatch()

    // const user = useSelector((state :RootStateOrAny) => state.user.value)       
    function toggleAddTaskMenu() {
        setAddTaskFieldOpened(!addTaskFieldOpened)
    }

    useEffect(() => {

        auth.onAuthStateChanged((user) => {     // needs to be done since firebase runs async check to server to see if user is logged
            if (user) {
                setCurrentUserName(user.displayName || '')
            }
        })

    }, [currentUserName])


    // Add separate page for add task feature
    // remove add task menu on outside click
    return (

        <div className='flex h-screen w-full'>

            <Navbar />

            <div id='home-admin' className='flex h-screen w-full filter'>

                <div className="w-full flex flex-col pt-10 items-center">

                    <p className='font-bold text-xs md:text-base border-b-2 w-5/6 text-center pb-2'>Hi {currentUserName}, ready to let some magic happen?</p>

                    <div className='w-1/12 min-w-fit fixed right-2 rounded-3xl top-28 bg-slate-600 flex flex-col items-center p-1 pt-3 pb-3 mt-2 ml-auto gap-5'>
                        <div className='flex w-full h-fit items-center justify-center text-slate-200'>
                            <svg onClick={() => { toggleAddTaskMenu() }} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform transition ease-in-out 150 cursor-pointer hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className='flex w-full h-fit items-center justify-center text-slate-200'>
                            <svg onClick={() => setFilterOpened(!filterOpened)} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform transition ease-in-out 150 cursor-pointer hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </div>
                        {filterOpened ?
                            <div className='text-slate-200 rounded-b-full text-xs font-bold flex flex-col gap-2 -mt-2 text-center items-center'>
                                <p onClick={(e) => dispatch(filterTasks(e.currentTarget.innerText))} className='hover:text-green-500 transform transition ease-in-out 150 cursor-pointer'>Priority</p>
                                <p onClick={(e) => dispatch(filterTasks(e.currentTarget.innerText))} className='hover:text-green-500 transform transition ease-in-out 150 cursor-pointer'>Type</p>
                                <svg onClick={() => dispatch(filterTasks(null))} xmlns="http://www.w3.org/2000/svg" className="w-4 hover:text-red-500 transform transition ease-in-out 150 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            : ''}
                    </div>

                    {addTaskFieldOpened ? <AddTask visible={toggleAddTaskMenu} /> : ''}

                    <TasksContainer />

                </div>
            </div>


        </div>

    )
}

export default HomeMain

// Add task HTML

// <div className='absolute w-screen top-20 left-1/2 transform -translate-x-1/2 z-10'>
//             <div className='w-4/5 bg-white font-bold m-auto rounded-xl shadow-2xl min-h-fit p-2'>
//                 <h1 className='text-3xl text-center font-bold'>Create a new issue..</h1>
//                 <div className='flex flex-col p-2 gap-2'>
//                     <label htmlFor="issueName" className=''>Issue name</label>
//                     <input className='transform transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:outline-none focus:border-green-500' type="text" name="issueName" />
//                     <label className=''>Issue type</label>
//                     <div onClick={() => {
//                         const dropdown = document.getElementById('drop-down')
//                         dropdown?.classList.toggle('hidden')
//                         document.getElementById('arrow')?.classList.toggle('rotate-180')

//                     }} tabIndex={1} className='transform cursor-pointer transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:border-green-500 focus:text-green-500'>
//                         <span className='flex items-center'>{this.state.taskType} <svg id='arrow' xmlns="http://www.w3.org/2000/svg" className="transform transition ease-in-out 150 h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//                         </svg></span>
//                         <div id='drop-down' className='cursor-default hidden relative mt-1 border-t-2 pt-4 border-gray-700'>
//                             <ul className='grid grid-cols-3 gap-2'>
//                                 <li onClick={() => this.setState({ taskType: 'Bug' })} className='transform transition ease-in-out 150 hover:bg-gray-700 text-center bg-black p-2 cursor-pointer text-white rounded-lg'>Bug</li>
//                                 <li onClick={() => this.setState({ taskType: 'Test2' })} className='transform transition ease-in-out 150 hover:bg-gray-700 text-center bg-black p-2 cursor-pointer text-white rounded-lg'>Placeholder</li>
//                                 <li onClick={() => this.setState({ taskType: 'TEst3' })} className='transform transition ease-in-out 150 hover:bg-gray-700 text-center bg-black p-2 cursor-pointer text-white rounded-lg'>Placeholder</li>
//                                 <li onClick={() => this.setState({ taskType: 'Test4' })} className='transform transition ease-in-out 150 hover:bg-gray-700 text-center bg-black p-2 cursor-pointer text-white rounded-lg'>Placeholder</li>
//                                 <li onClick={() => this.setState({ taskType: 'Test5' })} className='transform transition ease-in-out 150 hover:bg-gray-700 text-center bg-black p-2 cursor-pointer text-white rounded-lg'>Placeholder</li>
//                             </ul>
//                         </div>
//                     </div>

//                 {/* Add additional fields and submit button, then edit state and make post request to firebase tasks section */}
//                 {/* Make sure to render tasks on load after post request to DB */}
//                 </div>
//             </div>
//         </div>

// Basic layout HTML

{/* <div className='flex h-screen w-full'>

<Navbar className="navbar" />

{this.state.createTask ? addTask : <div id='home-admin' className='flex h-screen w-full'>

    <div className="w-full flex flex-col pt-10 items-center">

        <p className='font-bold text-xs md:text-base border-b-2 w-5/6 text-center pb-2'>Hi //placeholder, ready to let some magic happen?</p>

        <div className='w-1/3 p-2 flex items-center justify-end pr-10 mt-2 ml-auto'>
            <svg onClick={() => {
                this.setState({ createTask: true })
                document.getElementById('home-admin')?.classList.add('filter', 'blur-sm')
                document.getElementById('navbar')?.classList.add('filter', 'blur-sm')
            }} xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 transform transition ease-in-out 150 cursor-pointer hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>

    </div>
</div>}

</div> */}