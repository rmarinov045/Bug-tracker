import React, { SyntheticEvent, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

import ErrorField from '../utils/Error'
import { createTask } from '../../api/taskService'
import { generateTaskId } from '../../utils/util'
import { addTask } from '../../features/tasksReducer'
import { taskSettings } from '../../types'


export const taskTypes: taskSettings[] = [{ value: 'Major Bug', id: 1 }, { value: 'Minor bug', id: 2 }, { value: 'Visual bug', id: 3 }]
export const taskPriorities: taskSettings[] = [{ value: 'Urgent', id: 1 }, { value: 'High', id: 2 }, { value: 'Medium', id: 3 }, { value: 'Low', id: 4 }]

function AddTask(props: { visible: Function, updateModalMessage: Function, updateModalColor: Function }) {

    const dispatch = useDispatch()

    const user = useSelector((state: RootStateOrAny) => state.user.value)
    const project = useSelector((state: RootStateOrAny) => state.user.currentProject)
    const userId = user.userId

    const { visible, updateModalMessage, updateModalColor } = props

    const [taskType, setTaskType] = useState('')
    const [taskPriority, setTaskPriority] = useState('')
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e: SyntheticEvent): Promise<void> {
        e.preventDefault()

        if (!taskName || !taskPriority || !taskType) {
            setError('Please enter a name, priority and type')
            return
        }

        const data = { taskName, taskType, taskPriority, taskAuthor: user.firstName, taskDescription, id: generateTaskId(), authorId: userId, project: project.id }    // add created on for sorting
        const createResponse = await createTask(data)

        if (!createResponse) {
            setError('Failed to create a task. Please try again later')
            return
        }
        
        dispatch(addTask(data))
        updateModalMessage('Task created successfully!')
        updateModalColor('#16a34a')

        setTimeout(() => updateModalMessage(''), 4000)

        visible(false)
    }

    function handleDropdownFocus(elementId: string, arrowType: string): void {
        const dropdown: HTMLElement | null = document.getElementById(elementId)
        dropdown?.classList.toggle('hidden')
        document.getElementById(arrowType)?.classList.toggle('rotate-180')
    }

    return (

        <section className='fixed w-9/12 left-1/2 ml-2  xl:w-1/2 -translate-x-1/2 transform z-10'>
            <div className='w-full bg-white font-bold m-auto rounded-xl shadow-2xl min-h-fit p-2 border-2 border-green-500 dark:bg-dark-primary dark:border-dark-secondary'>
                <div className='flex items-center'>
                    <h1 className='text-3xl text-center font-bold m-auto'>Create a new issue..</h1>
                    <div id='close-add-task' onClick={() => visible(false)} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" className="transform transition ease-in-out 150 hover:brightness-75 h-10 w-10 text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg></div>
                </div>
                <form aria-label='add-task' onSubmit={handleSubmit} className='flex flex-col p-2 gap-2'>
                    <label htmlFor="issueName" className=''>Issue name</label>
                    <input onChange={(e) => setTaskName(e.target.value)} className='transform transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:outline-none focus:border-green-500 dark:text-black' type="text" name="issueName" />
                    <label className=''>Issue type</label>
                    <div onClick={() => handleDropdownFocus('drop-down-type', 'arrow-type')} tabIndex={0} className='focus:outline-none dark:bg-white transform cursor-pointer transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:border-green-500 focus:text-green-500'>
                        <span className='flex items-center dark:text-black'>{taskType} <svg id='arrow-type' xmlns="http://www.w3.org/2000/svg" className="transform transition ease-in-out 150 h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg></span>
                        <div id='drop-down-type' className='cursor-default hidden relative mt-1 border-t-2 pt-4 border-gray-700'>
                            <ul className='grid grid-cols-3 gap-2'>
                                {taskTypes.map(x => {
                                    return (<li key={x.id} onClick={() => setTaskType(x.value)} className='transform transition ease-in-out 150 hover:bg-gray-700 text-center bg-black p-2 cursor-pointer text-white rounded-lg'>{x.value}</li>)
                                })}
                            </ul>
                        </div>

                    </div>
                    <label className=''>Issue priority</label>
                    <div onClick={() => handleDropdownFocus('drop-down-priority', 'arrow-priority')} tabIndex={0} className='dark:bg-white focus:outline-none transform cursor-pointer transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:border-green-500 focus:text-green-500'>
                        <span className='flex items-center dark:text-black'>{taskPriority} <svg id='arrow-priority' xmlns="http://www.w3.org/2000/svg" className="transform transition ease-in-out 150 h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg></span>
                        <div id='drop-down-priority' className='cursor-default hidden relative mt-1 border-t-2 pt-4 border-gray-700'>
                            <ul className='grid grid-cols-3 gap-2'>
                                {taskPriorities.map(x => {
                                    return (<li key={x.id} onClick={() => setTaskPriority(x.value)} className='transform transition ease-in-out 150 hover:bg-gray-700 text-center bg-black p-2 cursor-pointer text-white rounded-lg'>{x.value}</li>)
                                })}
                            </ul>
                        </div>

                    </div>

                    <label htmlFor="issueDescription" className=''>Description</label>
                    <textarea onChange={(e) => setTaskDescription(e.target.value)} className='transform transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:outline-none focus:border-green-500 dark:text-black' name="issueDescription"></textarea>


                    <button type='submit' className='mt-2 bg-black text-white font-bold rounded-xl pl-2 pr-2 p-1 shadow-xl w-1/2 self-center transition ease-in-out 150 hover:text-green-500 '>Create</button>

                    {error ? <ErrorField errorMessage={error} /> : <></>}

                </form>
            </div>
        </section>
    )
}


export default AddTask