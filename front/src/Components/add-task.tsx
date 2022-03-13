import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RootStateOrAny, useDispatch } from 'react-redux'

import ErrorField from './error'
import { createTask } from '../utils/api' 
import { generateTaskId } from '../utils/api'
import { updateTasks } from '../features/tasksReducer'

export const taskTypes: string[] = ['Major Bug', 'Minor Bug', 'Visual Bug', 'test1', 'test2']
export const taskPriorities :string[] = ['Urgent', 'High', 'Medium', 'Low']

function AddTask(props :any) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const { visible } = props

    const [taskType, setTaskType] = useState('')
    const [taskPriority, setTaskPriority] = useState('')
    const [taskName, setTaskName] = useState('')
    const [taskAuthor, setTaskAuthor] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e :any) :Promise<any> {
        e.preventDefault()
        const data = { taskName, taskType, taskPriority, taskAuthor, taskDescription, id: generateTaskId() }
        const createResponse = await createTask(data)

        if(!createResponse) {
            setError('Failed to create a task. Please try again with valid input')
        }
        dispatch((state :RootStateOrAny) => updateTasks(data))  // not working
        visible()
    }   
    // add keys to list items
        return (
        
            <div className='absolute w-screen top-32 left-1/2 transform -translate-x-1/2 z-10'>
                <div className='w-4/5 bg-white font-bold m-auto rounded-xl shadow-2xl min-h-fit p-2 border-2 border-green-500'>
                    <h1 className='text-3xl text-center font-bold'>Create a new issue..</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col p-2 gap-2'>
                        <label htmlFor="issueName" className=''>Issue name</label>
                        <input onChange={(e) => setTaskName(e.target.value)} className='transform transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:outline-none focus:border-green-500' type="text" name="issueName" />
                        <label className=''>Issue type</label>
                        <div onClick={() => {
                            const dropdown: HTMLElement | null = document.getElementById('drop-down-type')
                            dropdown?.classList.toggle('hidden')
                            document.getElementById('arrow-type')?.classList.toggle('rotate-180')
                        }} tabIndex={1} className='transform cursor-pointer transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:border-green-500 focus:text-green-500'>
                            <span className='flex items-center'>{taskType} <svg id='arrow-type' xmlns="http://www.w3.org/2000/svg" className="transform transition ease-in-out 150 h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg></span>
                            <div id='drop-down-type' className='cursor-default hidden relative mt-1 border-t-2 pt-4 border-gray-700'>
                                <ul className='grid grid-cols-3 gap-2'>
                                    {taskTypes.map(x => {
                                        return (<li onClick={() => setTaskType(x)} className='transform transition ease-in-out 150 hover:bg-gray-700 text-center bg-black p-2 cursor-pointer text-white rounded-lg'>{x}</li>)
                                    })}
                                </ul>
                            </div>
    
                        </div>
                        <label className=''>Issue priority</label>
                        <div onClick={() => {
                            const dropdown: HTMLElement | null = document.getElementById('drop-down-priority')
                            dropdown?.classList.toggle('hidden')
                            document.getElementById('arrow-priority')?.classList.toggle('rotate-180')
                        }} tabIndex={1} className='transform cursor-pointer transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:border-green-500 focus:text-green-500'>
                            <span className='flex items-center'>{taskPriority} <svg id='arrow-priority' xmlns="http://www.w3.org/2000/svg" className="transform transition ease-in-out 150 h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg></span>
                            <div id='drop-down-priority' className='cursor-default hidden relative mt-1 border-t-2 pt-4 border-gray-700'>
                                <ul className='grid grid-cols-3 gap-2'>
                                    {taskPriorities.map(x => {
                                        return (<li onClick={() => setTaskPriority(x)} className='transform transition ease-in-out 150 hover:bg-gray-700 text-center bg-black p-2 cursor-pointer text-white rounded-lg'>{x}</li>)
                                    })}
                                </ul>
                            </div>
    
                        </div>
    
                        <label htmlFor="issueName" className=''>Author</label>
                        <input onChange={(e) => setTaskAuthor(e.target.value)} className='transform transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:outline-none focus:border-green-500' type="text" name="issueName" />
                        
                        <label htmlFor="issueDescription" className=''>Description</label>
                        <textarea onChange={(e) => setTaskDescription(e.target.value)} className='transform transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:outline-none focus:border-green-500' name="issueDescription"></textarea>
    
    
                        <button type='submit' className='mt-2 bg-black text-white font-bold rounded-xl pl-2 pr-2 p-1 shadow-xl w-1/2 self-center transition ease-in-out 150 hover:text-green-500 '>Create</button>
                        {/* Add additional fields and submit button, then edit state and make post request to firebase tasks section */}
                        {/* Make sure to render tasks on load after post request to DB */}
    
                        {error ? <ErrorField errorMessage={error} /> : '' }
    
                    </form>
                </div>
            </div>
        )
    } 


export default AddTask