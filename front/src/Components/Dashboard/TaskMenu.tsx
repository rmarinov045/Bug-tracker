import React from 'react'

function TaskMenu({handleComplete, toggleEdit, handleDelete, id} : {handleComplete: Function, toggleEdit: Function, handleDelete: Function, id: string}) {
    return (
        <div className='relative rounded-xl w-full mt-2 flex p-1 pr-2 pl-2 items-center justify-center transform transition ease-in-out 150'>

            <div id='complete-task' onClick={() => handleComplete()} className='w-1/3 min-h-fit flex justify-center bg-green-500 rounded-l-xl p-1 hover:text-white cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 cursor-pointer transform transition ease-in-out 150" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </div>

            <div id='task-edit' onClick={() => toggleEdit()} className='w-1/3 flex justify-center bg-orange-500 p-1 hover:text-white cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
            </div>

            <div id='task-delete' onClick={() => handleDelete(id)} className='w-1/3 flex justify-center bg-red-500 rounded-r-xl p-1 hover:text-white cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 cursor-pointer transform transition ease-in-out 150 hover:text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </div>

        </div>
    )
}

export default TaskMenu