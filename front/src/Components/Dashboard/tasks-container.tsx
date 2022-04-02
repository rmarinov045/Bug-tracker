import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { getTasks } from '../../features/tasksReducer'
import Task from './task'
import TaskLoader from '../Utils/task-loader'

import '../../App.css'

function TasksContainer(props: any) {

  const tasks = useSelector((state: RootStateOrAny) => state.tasks.tasks)
  const [tasksLoaded, setTasksLoaded] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setTasksLoaded(true)

    dispatch(getTasks())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
      tasksLoaded ?
      <div id='task-container' className='mt-4 w-2/3 flex flex-col p-1 pr-2 mb-2 gap-4 overflow-y-scroll'>
        {tasks.length > 0 ? tasks.map((task: any) => <Task key={task.id} setError={props.updateModalMessage} setModalColor={props.updateModalColor} taskName={task.taskName} taskType={task.taskType} taskPriority={task.taskPriority} taskDescription={task.taskDescription} taskAuthor={task.taskAuthor} authorId={task.authorId} id={task.id} />)
          : <p className='w-full text-center'> Such empty....</p>}
      </div>
      : <TaskLoader />
  )
}

export default TasksContainer