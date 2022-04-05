import React, { useEffect } from 'react'

import { User } from '../../features/userReducer'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getCompletedTasksByUserId } from '../../features/completedTasksReducer'

import CompletedTask from './CompletedTask'

import Chart from '../Charts/Chart'
import ChartByType from '../Charts/ChartByType'
import TaskLoader from '../Utils/TaskLoader'
import SmallSpinner from '../Utils/SmallSpinner'

// change persisted Reducer upon rename or migration !!!!

function CompletedContainer() {
  const currentUser: User = useSelector((state: RootStateOrAny) => state.user.value) 
  const completedTasks = useSelector((state: RootStateOrAny) => state.completedTasks.completed)

  const loaded = useSelector((state :RootStateOrAny) => state.completedTasks.loaded)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCompletedTasksByUserId(currentUser.userId))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // make sure to style for big screens as well
  return ( 

    <div className='w-full overflow-x-hidden'>

      <div className='flex items-center justify-center p-2 mt-3 border-b-2 w-2/3 m-auto border-slate-500'>

        <div className='font-bold flex flex-col items-center justify-center p-2 gap-4'>
          <p className='text-4xl text-green-500'>Resolved issues:</p>
          <p className='text-xs'>Here you can see more information about resolved issues and analytics</p>
        </div>

      </div>

      <div className='flex mt-2 p-2 gap-10 items-start pl-10 flex-row-reverse h-5/6'>

        {loaded ? completedTasks.length > 0 ? <main className='w-1/2 p-2 border-2 border-slate-100 shadow-sm flex h-full flex-col overflow-y-scroll'>
          {completedTasks.length ? <Chart tasks={completedTasks} /> : <></>}
          {completedTasks.length ? <ChartByType tasks={completedTasks} /> : <></>}
        </main> : <></> : <SmallSpinner />}

        <aside id='completed-task-container' className='w-1/2 p-2 border-2 border-slate-100 shadow-sm mr-auto min-h-full max-h-full overflow-y-scroll'>

          <p className='font-bold text-center text-xs mb-2'>Issues you have resolved:</p>

          <ul className='flex flex-col items-center justify-center'>
          {loaded
          ? completedTasks.length ? [...completedTasks].sort((a, b) => Number(b.completedOn) - Number(a.completedOn)).map((task: any) => <CompletedTask task={task} key={task.id} />) : <li className='text-sm'>Nothing yet...</li>
          : <TaskLoader /> }
          </ul>

        </aside>

      </div>

    </div>
  )
}

export default CompletedContainer