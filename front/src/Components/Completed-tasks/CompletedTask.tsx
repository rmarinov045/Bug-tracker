import React, { useEffect, useState } from 'react'
import { downloadUserImageById } from '../../api/userService'
import { convertToDate } from '../../utils/util'
import { typeColors, priorityColors } from '../Dashboard/Task'

import defaultProfileImage from '../../assets/profile.jpeg'

function CompletedTask({ task }: any) {
  const [taskInfo, setTaskInfo] = useState(false)
  const [typeColor, setTypeColor] = useState('')
  const [priorityColor, setPriorityColor] = useState('')
  const [profileImage, setProfileImage] = useState('')



  useEffect(() => {
    setTypeColor(typeColors[task.taskType])
    setPriorityColor(priorityColors[task.taskPriority])

    async function getImages() {
      try {
        try {
          const response = await downloadUserImageById(task.authorId || '')        
          setProfileImage(response)
        } catch (err :any) {
          throw new Error(err.message)
        }
     } catch (err) {
        return null
     }
    }
    getImages()

  }, [task.taskType, task.taskPriority, task.authorId])

  return (
    <>
      <div style={taskInfo ? { backgroundColor: "#d4d4d8" } : { backgroundColor: '#e2e8f0' }} className='w-full mt-1'>
        <li onClick={() => setTaskInfo(!taskInfo)} className='hover:bg-slate-400 cursor-pointer transform transition ease-in-out 150 w-full text-xs flex pl-2 pr-2 p-1 items-center font-bold hover:text-slate-900'>{task.taskName}<svg xmlns="http://www.w3.org/2000/svg" tabIndex={0} className="h-6 w-6 ml-auto focus:outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg></li>
        {taskInfo ? <div className='flex flex-col gap-2 items-start justify-start w-full p-2'>
          <div className='flex w-full justify-start gap-2'>
            <li style={{ backgroundColor: typeColor }} className='bg-orange-400 p-2 text-xs font-bold rounded-xl'>{task.taskType}</li>
            <li style={{ backgroundColor: priorityColor }} className='bg-red-400 p-2 text-xs font-bold rounded-xl'>{task.taskPriority}</li>
          </div>
          <li className='w-full text-xs border-2 border-slate-600 bg-white rounded min-h-[10rem] p-1'>{task.taskDescription}</li>
          <li className='font-bold text-xs flex w-full justify-between items-center gap-2'>Creator: <img className='h-6 w-6 rounded-full mr-auto' src={profileImage || defaultProfileImage} alt='Creator' /><p className=''>Completed on: {convertToDate(task.completedOn)}</p></li>
        </div> : <></>}
      </div>
    </>
  )
}

export default CompletedTask