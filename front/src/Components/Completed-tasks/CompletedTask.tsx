import React, { useState } from 'react'

function CompletedTask({ task } :any) {
  const [taskInfo, setTaskInfo] = useState(false)

  return (
    <>
      <li className='w-full text-xs bg-slate-200 flex pl-2 pr-2 p-1 items-center font-bold'>{task.taskName}<svg onClick={() => setTaskInfo(!taskInfo)} xmlns="http://www.w3.org/2000/svg" tabIndex={0} className="h-6 w-6 ml-auto cursor-pointer hover:text-green-500 transform transition ease-in-out 150 focus:outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg></li>
      {taskInfo ? <div className='flex flex-col gap-2 items-start justify-start w-full p-2 bg-slate-200 border-b-2 border-green-400'>
                      <div className='flex w-full justify-start gap-2'>
                      <li className='bg-orange-400 p-1 text-xs font-bold rounded-xl'>{task.taskType}</li>
                      <li className='bg-red-400 p-1 text-xs font-bold rounded-xl'>{task.taskPriority}</li>
                      </div>
                      <li className='w-full text-xs border-2 border-slate-300 rounded-xl p-1'>{task.taskDescription}</li>
                      <li className='font-bold text-xs'>Created by: {task.taskAuthor}</li>
                  </div> : <></>}
    </>
  )
}

export default CompletedTask