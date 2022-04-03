import React from 'react'

import Task from './Task'
import TaskLoader from '../Utils/TaskLoader'

import '../../App.css'

function TasksContainer(props: any) {

  const tasks = props.tasks
  const tasksLoaded = props.tasksLoaded

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