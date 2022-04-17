import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { deleteTask, completeTask } from '../../api/taskService'
import { taskData } from '../../types'

import { auth } from '../../firebase'

import { downloadUserImageById } from '../../api/userService'

import { deleteTaskById } from '../../features/tasksReducer'
import { generateTaskId } from '../../utils/util'

import EditTask from './EditTask'

import defaultUserImage from '../../assets/profile.jpeg'
import TaskMenu from './TaskMenu'

export const typeColors: { [char: string]: string } = {
  'Visual bug': '#fb923c',
  'Minor bug': '#a3e635',
  'Major Bug': '#ef4444'
}

export const priorityColors: { [char: string]: string } = {
  'Low': '#34d399',
  'Medium': '#fbbf24',
  'High': '#ea580c',
  'Urgent': '#dc2626'
}

function Task(props: { task: taskData, setError: Function, setModalColor: Function }) {
  const { taskName, taskType, taskPriority, taskDescription, taskAuthor, id, authorId, project } = props.task

  const error = props.setError
  const modalColor = props.setModalColor

  const [taskMenuOpened, setTaskMenuOpened] = useState(false)
  const [edit, setEdit] = useState(false)

  const [typeColor, setTypeColor] = useState('')
  const [priorityColor, setPriorityColor] = useState('')

  const [authorImage, setAuthorImage] = useState('')

  const dispatch = useDispatch()

  function toggleEdit(): void {
    setEdit(!edit)
  }

  async function handleDelete(id: string) {

    const response = dispatch(deleteTaskById(id))

    if (typeof response === 'string') {
      error(response)
    }

    error('Issue deleted')
    modalColor('#dc2626')
    setTimeout(() => error(''), 4000)

  }

  async function handleComplete() {
    const currentUserId = auth.currentUser?.uid

    const updateDBResponse = await completeTask({ taskName, taskType, taskPriority, taskDescription, taskAuthor, id, 'completedBy': currentUserId, "completedOn": generateTaskId(), authorId, project })

    const response = await deleteTask(id)

    if (updateDBResponse.status !== 'ok' || response.status !== 'ok') {
      error(updateDBResponse.message)
      setTimeout(() => {
        error('')
      }, 4000)
      return null
    }

    const res = dispatch(deleteTaskById(id))

    if (typeof res === 'string') {
      error(res)
      return null
    }

    error('Issue resolved successfully!')
    modalColor('#16a34a')

    setTimeout(() => error(''), 4000)

  }

  const getImages = useCallback(
    async () => {
      try {
        const imageUrl = await downloadUserImageById(authorId)
        setAuthorImage(imageUrl)
      } catch (err) {
        return
      }
    },
    [authorId],
  )


  useEffect(() => {
    setTypeColor(typeColors[taskType])
    setPriorityColor(priorityColors[taskPriority])
    getImages()

    return () => {
      setTypeColor('')
      setPriorityColor('')
    }

  }, [taskType, taskPriority, authorId, getImages])

  return (

    <div className='flex flex-col text-xs md:text-sm dark:text-black'>
      <div className='bg-indigo-50 rounded-xl p-2 transform transition ease-in-out 150 min-w-full'>
        <div className='flex w-full items-center border-b-2 border-black pb-4'>
          <p className='font-bold whitespace-nowrap w-full text-ellipsis overflow-x-hidden'>{taskName}</p>
          <div className='flex gap-2 w-full justify-end'>
            <p style={{ backgroundColor: typeColor }} className='font-bold min-w-[5rem] rounded-xl text-xs p-2 text-center flex items-center'>{taskType}</p>
            <p style={{ backgroundColor: priorityColor }} className='font-bold rounded-xl text-xs p-2 text-center flex items-center'>{taskPriority}</p>
          </div>
        </div>
        <div className='mt-2 w-full'>
          <div className='whitespace-pre-wrap w-full p-2 bg-indigo-100 rounded min-h-[2rem]'>{taskDescription}</div>
          <br />
        </div>
        <div className='flex items-center justify-between'>
          <div className='font-bold whitespace-nowrap text-ellipsis w-2/3 overflow-hidden'><p className='flex items-center gap-2'>Creator: <img src={authorImage || defaultUserImage} title={taskAuthor} className='h-8 w-8 xl:w-10 xl:h-10 rounded-full' alt='Assignee' /></p></div>
          <div className='flex self-end gap-3'>
            <svg id='task-menu' onClick={() => setTaskMenuOpened(!taskMenuOpened)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer hover:text-green-500 transform transition ease-in-out 150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
        </div>
      </div>

      {edit ? <EditTask task={props.task} visible={toggleEdit} /> : <></>}

      {taskMenuOpened ? <TaskMenu handleComplete={handleComplete} toggleEdit={toggleEdit} handleDelete={handleDelete} id={id} /> : <></>}

    </div>

  )
}

export default Task