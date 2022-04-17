import React from 'react'

import Task from './Task'
import TaskLoader from '../utils/TaskLoader'

import '../../App.css'
import { taskData } from '../../types'

function TasksContainer(props: { tasks: taskData[], tasksLoaded: boolean, updateModalMessage: Function, updateModalColor: Function }) {

  const tasks = props.tasks
  const tasksLoaded = props.tasksLoaded

  return (
    tasksLoaded ?
      <div id='task-container' className='mt-4 w-2/3 flex flex-col p-1 pr-2 mb-2 gap-4 overflow-y-scroll xl:grid grid-cols-3 xl:w-3/4'>
        {tasks.length > 0 ? tasks.map((task: taskData) => <Task key={task.id} setError={props.updateModalMessage} setModalColor={props.updateModalColor} task={task} />)
          : <p className='w-full text-center'> Such empty....</p>}
      </div>
      : <TaskLoader />
  )
}

export default TasksContainer