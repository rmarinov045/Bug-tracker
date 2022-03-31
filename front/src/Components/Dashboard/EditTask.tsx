import React, { useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { editTaskById } from '../../features/tasksReducer'
import { taskTypes, taskPriorities } from './add-task'

function reducer(state :any, action :any) {
    switch (action.type) {
        case 'setTaskName':
            return {...state, taskName: action.payload}
        case 'setTaskType':
            return {...state, taskType: action.payload}
        case 'setTaskPriority':
            return {...state, taskPriority: action.payload}
        case 'setTaskDescription':
            return {...state, taskDescription: action.payload}
        default: 
            return null
    }
}

function EditTask(props :any) {

    const initialState = props.task

    const [state, dispatch] = useReducer(reducer, initialState)

    const dispatchAction = useDispatch()

    function handleDropdownFocus(elementId: string, arrowType: string): void {
        const dropdown: HTMLElement | null = document.getElementById(elementId)
        dropdown?.classList.toggle('hidden')
        document.getElementById(arrowType)?.classList.toggle('rotate-180')
    }

    async function handleSubmit(e :any) {
        e.preventDefault()
        dispatchAction(editTaskById(state))
        props.visible()
    }

    return (

        <div className='fixed w-9/12 left-1/2 -translate-x-1/2 transform z-10'>
            <div className='w-full bg-white font-bold m-auto rounded-xl shadow-2xl min-h-fit p-2 border-2 border-green-500'>
                <div className='flex items-center'>
                    <h1 className='text-3xl text-center font-bold m-auto'>Edit issue..</h1>
                    <div onClick={() => props.visible()} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" className="transform transition ease-in-out 150 hover:brightness-75 h-10 w-10 text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg></div>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col p-2 gap-2'>
                    <label htmlFor="issueName" className=''>Issue name</label>
                    <input onChange={(e) => dispatch({type: 'setTaskName', payload: e.target.value})} value={state.taskName} className='transform transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:outline-none focus:border-green-500' type="text" name="issueName" />
                    <label className=''>Issue type</label>
                    <div onClick={() => handleDropdownFocus('drop-down-type', 'arrow-type')} tabIndex={0} className='transform cursor-pointer transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:border-green-500 focus:text-green-500'>
                        <span className='flex items-center'>{state.taskType}<svg id='arrow-type' xmlns="http://www.w3.org/2000/svg" className="transform transition ease-in-out 150 h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg></span>
                        <div id='drop-down-type' className='cursor-default hidden relative mt-1 border-t-2 pt-4 border-gray-700'>
                            <ul className='grid grid-cols-3 gap-2'>
                                {taskTypes.map(x => {
                                    return (<li key={x.id} onClick={() => dispatch({type: 'setTaskType', payload: x.value})} className='transform transition ease-in-out 150 hover:bg-gray-700 text-center bg-black p-2 cursor-pointer text-white rounded-lg'>{x.value}</li>)
                                })}
                            </ul>
                        </div>

                    </div>
                    <label className=''>Issue priority</label>
                    <div onClick={() => handleDropdownFocus('drop-down-priority', 'arrow-priority')} tabIndex={0} className='transform cursor-pointer transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:border-green-500 focus:text-green-500'>
                        <span className='flex items-center'>{state.taskPriority}<svg id='arrow-priority' xmlns="http://www.w3.org/2000/svg" className="transform transition ease-in-out 150 h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg></span>
                        <div id='drop-down-priority' className='cursor-default hidden relative mt-1 border-t-2 pt-4 border-gray-700'>
                            <ul className='grid grid-cols-3 gap-2'>
                                {taskPriorities.map(x => {
                                    return (<li key={x.id} onClick={() => dispatch({type: 'setTaskPriority', payload: x.value})} className='transform transition ease-in-out 150 hover:bg-gray-700 text-center bg-black p-2 cursor-pointer text-white rounded-lg'>{x.value}</li>)
                                })}
                            </ul>
                        </div>

                    </div>

                    <label htmlFor="issueDescription" className=''>Description</label>
                    <textarea onChange={(e) => dispatch({type: 'setTaskDescription', payload: e.target.value})} value={state.taskDescription} className='transform transition ease-in-out 150 border-2 border-black pr-2 pl-2 p-1 rounded-xl focus:outline-none focus:border-green-500' name="issueDescription"></textarea>


                    <button type='submit' className='mt-2 bg-black text-white font-bold rounded-xl pl-2 pr-2 p-1 shadow-xl w-1/2 self-center transition ease-in-out 150 hover:text-green-500 '>Confirm</button>

                </form>
            </div>
        </div>
    )
}

export default EditTask