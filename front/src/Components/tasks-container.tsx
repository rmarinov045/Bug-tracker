import React, { useState, useEffect } from 'react'
import { useSelector ,useDispatch, RootStateOrAny } from 'react-redux'

import { updateTasks } from '../features/tasksReducer'
import { taskData , getAllTasks } from '../utils/api'
import Task from './task'

function TasksContainer() {

    const [tasks, setTasks] = useState<taskData[]>([])
    const tasksList = useSelector((state :RootStateOrAny) => state.tasks.value) // not working
    
    const dispatch = useDispatch()

    useEffect(() => {
        async function getTasks() :Promise<any> {
            const tasksResponse = await getAllTasks()
            
            if (tasksResponse.data && Object.values(tasksResponse.data).length > tasks.length) {
                setTasks(() => Object.values(tasksResponse.data))
            }
        }  
        getTasks()
        // set tasks state
    }, [tasksList])

    

    if (tasks) {
      dispatch((state :RootStateOrAny) => tasks.forEach((task :any) => updateTasks(task)))
    }

  return (
    <div className='mt-4 w-2/3 flex flex-col gap-4'>
      {tasks.length > 0 ? tasks.map((task :any) => <Task key={task.id} taskName={task.taskName} taskType={task.taskType} taskPriority={task.taskPriority} taskDescription={task.taskDescription} taskAuthor={task.taskAuthor} id ={task.id}/>)
      : <p className='w-full text-center'> Such empty....</p>} {/* add style */}
    </div>
  )
}

export default TasksContainer