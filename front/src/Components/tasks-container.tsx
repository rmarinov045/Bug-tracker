import React, { useState, useEffect } from 'react'
import { useDispatch, RootStateOrAny } from 'react-redux'
import { updateTasks } from '../features/tasksReducer'
import { taskData , getAllTasks } from '../utils/api'
import Task from './task'

function TasksContainer() {
    const [tasks, setTasks] = useState<taskData[]>([])
    const dispatch = useDispatch()

    useEffect(() => {
        async function getTasks() :Promise<any> {
            const tasksResponse = await getAllTasks()
            if (tasksResponse.data) {
                setTasks(() => Object.values(tasksResponse.data))
            }
        }  
        getTasks()
        // set tasks state
    }, [tasks])

    if (tasks) {
      dispatch((state :RootStateOrAny) => tasks.forEach(task => updateTasks(task)))
    }

  return (
    <div className='mt-4 w-2/3 flex flex-col gap-4'>
      {tasks ? tasks.map((task) => <Task key={task.id} taskName={task.taskName} taskType={task.taskType} taskPriority={task.taskPriority} taskDescription={task.taskDescription} taskAuthor={task.taskAuthor} id ={task.id}/>)
      : <li className=''> Such empty....</li>} {/* add style */}
    </div>
  )
}

export default TasksContainer