import React, { useEffect, useState } from 'react'
import { typeColors, priorityColors } from '../Dashboard/task'

function CompletedTask({ task } :any) {
  const [taskInfo, setTaskInfo] = useState(false)
  const [typeColor, setTypeColor] = useState('')
  const [priorityColor, setPriorityColor] = useState('')

  useEffect(() => {
    setTypeColor(typeColors[task.taskType])
    setPriorityColor(priorityColors[task.taskPriority])
  }, [task.taskType, task.taskPriority])

  return (
    <>
      <li onClick={() => setTaskInfo(!taskInfo)} className='hover:bg-slate-400 cursor-pointer transform transition ease-in-out 150 w-full text-xs bg-slate-200 flex pl-2 pr-2 p-1 items-center font-bold hover:text-slate-900'>{task.taskName}<svg xmlns="http://www.w3.org/2000/svg" tabIndex={0} className="h-6 w-6 ml-auto focus:outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg></li>
      {taskInfo ? <div className='flex flex-col gap-2 items-start justify-start w-full p-2 bg-slate-200 border-b-2 border-green-400'>
                      <div className='flex w-full justify-start gap-2'>
                      <li style={{backgroundColor: typeColor}} className='bg-orange-400 p-2 text-xs font-bold rounded-xl'>{task.taskType}</li>
                      <li style={{backgroundColor: priorityColor}} className='bg-red-400 p-2 text-xs font-bold rounded-xl'>{task.taskPriority}</li>
                      </div>
                      <li className='w-full text-xs border-2 border-slate-300 rounded-xl p-1'>{task.taskDescription}</li>
                      <li className='font-bold text-xs'>Created by: {task.taskAuthor}</li>
                  </div> : <></>}
    </>
  )
}

export default CompletedTask