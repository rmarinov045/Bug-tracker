import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { taskData, deleteTask, completeTask } from '../../utils/api'

import { auth } from '../../firebase'

import { deleteTaskById } from '../../features/tasksReducer'
import { generateTaskId } from '../../utils/util'

import EditTask from './EditTask'
import Modal from '../Utils/Modal'

export const typeColors: { [char: string]: string } = {
  "Visual bug": '#fb923c',
  'Minor bug': '#a3e635',
  'Major bug': '#991b1b'
}

export const priorityColors: { [char: string]: string } = {
  'Low': '#34d399',
  'Medium': '#fbbf24',
  'High': '#ea580c',
  'Urgent': '#dc2626'
}

function Task(props: taskData) {
  const { taskName, taskType, taskPriority, taskDescription, taskAuthor, id, authorId } = props

  const [error, setError] = useState('')

  const [taskMenuOpened, setTaskMenuOpened] = useState(false)
  const [edit, setEdit] = useState(false)
  
  const [typeColor, setTypeColor] = useState('')
  const [priorityColor, setPriorityColor] = useState('')
  const [modalColor, setModalColor] = useState('#dc2626')

  const dispatch = useDispatch()

  function toggleEdit() :void {
    setEdit(!edit)
  }
  // export to ext file (task functionalities)
  async function handleDelete(id: string) {

    const response = dispatch(deleteTaskById(id))

    if (typeof response === 'string') {
      setError(response)
    }

    setError('Issue resolved successfully!')
    setModalColor('#dc2626')
    setTimeout(() => setError(''), 2000)

  }

  async function handleComplete() {
    const currentUserId = auth.currentUser?.uid

    const updateDBResponse = await completeTask({ taskName, taskType, taskPriority, taskDescription, taskAuthor, id, 'completedBy': currentUserId, "completedOn": generateTaskId(), authorId })

    const response = await deleteTask(id)

    if (updateDBResponse.status !== 'ok' || response.status !== 'ok') {
      setError(updateDBResponse.message)
      setTimeout(() => {
        setError('')
      }, 5000)
    }

    const res = dispatch(deleteTaskById(id))

    if (typeof res === 'string') {
      setError(res)
    }

    setError('Issue resolved successfully!')
    setModalColor('#16a34a')

    setTimeout(() => setError(''), 5000)

  }

  useEffect(() => {
    setTypeColor(typeColors[taskType])
    setPriorityColor(priorityColors[taskPriority])
  }, [taskType, taskPriority])

  // fix styling for large screens

  // add success edit modal

  return (

    <>
      <Modal message={error} bgColor={modalColor} />
    <div className='flex flex-col'>
      <div className='bg-gray-200 rounded-xl p-2 transform transition ease-in-out 150 min-w-full'>
        <div className='flex w-full items-center border-b-2 border-black pb-4'>
          <p className='font-bold text-sm whitespace-nowrap text-ellipsis w-2/3 overflow-hidden'>{taskName}</p>
          <div className='flex gap-2 w-full justify-end'>
            <p style={{ backgroundColor: typeColor }} className='bg-orange-400 font-bold rounded-xl text-xs p-2 text-center flex items-center'>{taskType}</p>
            <p style={{ backgroundColor: priorityColor }} className='bg-red-400 font-bold rounded-xl text-xs p-2 text-center flex items-center'>{taskPriority}</p>
          </div>
        </div>
        <div className='mt-2 w-full'>
          <p className='text-sm whitespace-nowrap text-ellipsis w-2/3 overflow-hidden'>{taskDescription}</p>
          <br />
        </div>
        <div className='flex items-center justify-between'>
          <p className='font-bold inline text-sm whitespace-nowrap text-ellipsis w-2/3 overflow-hidden'>Created by: {taskAuthor}</p>
          <div className='flex self-end gap-3'>
            <svg onClick={() => setTaskMenuOpened(!taskMenuOpened)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer hover:text-green-500 transform transition ease-in-out 150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
        </div>
      </div>

      {edit ? <EditTask task={props} visible={toggleEdit} /> : <></>}

      {taskMenuOpened ?
        <div className='relative rounded-xl w-full mt-2 flex p-1 pr-2 pl-2 items-center justify-center transform transition ease-in-out 150'>

          <div onClick={() => handleComplete()} className='w-1/3 min-h-fit flex justify-center bg-green-500 rounded-l-xl p-1 hover:text-white cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 cursor-pointer transform transition ease-in-out 150" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>

          <div onClick={() => toggleEdit()} className='w-1/3 flex justify-center bg-orange-500 p-1 hover:text-white cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
          </div>

          <div onClick={() => handleDelete(id)} className='w-1/3 flex justify-center bg-red-500 rounded-r-xl p-1 hover:text-white cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 cursor-pointer transform transition ease-in-out 150 hover:text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>

        </div>
        : <></>}

    </div>

    </>
  )
}

export default Task