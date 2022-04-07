import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterTasks } from '../../features/tasksReducer'
import AddTask from '../Dashboard/AddTask'

function Filter(props :any) {
    const [addTaskFieldOpened, setAddTaskFieldOpened] = useState(false)
    const [filterOpened, setFilterOpened] = useState(false)

    const dispatch = useDispatch()

    return (
        <div className='w-1/12 min-w-fit z-20 fixed right-2 rounded-3xl top-28 bg-slate-600 flex flex-col items-center p-1 pt-3 pb-3 mt-2 ml-auto gap-5'>
            <div className='flex w-full h-fit items-center justify-center text-slate-200'>
                <svg onClick={() => setAddTaskFieldOpened(true)} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform transition ease-in-out 150 cursor-pointer hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div className='flex w-full h-fit items-center justify-center text-slate-200'>
                <svg onClick={() => setFilterOpened(!filterOpened)} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform transition ease-in-out 150 cursor-pointer hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
            </div>
            {filterOpened ?
                <div className='text-slate-200 rounded-b-full text-xs font-bold flex flex-col gap-2 -mt-2 text-center items-center'> {/* May need to change to component for reusability */}
                    <p onClick={(e) => dispatch(filterTasks(e.currentTarget.innerText))} className='hover:text-green-500 transform transition ease-in-out 150 cursor-pointer'>Priority</p>
                    <p onClick={(e) => dispatch(filterTasks(e.currentTarget.innerText))} className='hover:text-green-500 transform transition ease-in-out 150 cursor-pointer'>Type</p>
                    <svg onClick={() => dispatch(filterTasks(null))} xmlns="http://www.w3.org/2000/svg" className="w-4 hover:text-red-500 transform transition ease-in-out 150 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                : <></>}
                {addTaskFieldOpened ? <AddTask visible={setAddTaskFieldOpened} updateModalMessage={props.updateModalMessage} updateModalColor={props.updateModalColor} /> : <></>}
        </div>
    )
}

export default Filter