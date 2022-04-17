import React, { useCallback, useEffect, useState } from 'react'

import { UserData } from '../../types'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getCompletedTasksByUserIdAndProject, searchCompletedTasks } from '../../features/completedTasksReducer'

import CompletedTask from './CompletedTask'

import Chart from '../charts/Scatter'
import ChartByType from '../charts/Pie'
import TaskLoader from '../utils/TaskLoader'
import SmallSpinner from '../utils/SmallSpinner'
import SearchField from '../utils/SearchField'
import RefreshButton from '../utils/RefreshButton'

function CompletedContainer({ project }: { project: { name: string, id: string } }) {
  const currentUser: UserData = useSelector((state: RootStateOrAny) => state.user.value)
  const completedTasks = useSelector((state: RootStateOrAny) => state.completedTasks.completed)
  const filteredTasks = useSelector((state: RootStateOrAny) => state.completedTasks.filtered)

  const [filtered, setFiltered] = useState(false)

  const loaded = useSelector((state: RootStateOrAny) => state.completedTasks.loaded)

  const dispatch = useDispatch()

  async function handleSearch(search: string) {

    dispatch(searchCompletedTasks(search.toLowerCase()))
    setFiltered(true)
    if (!search) {
      dispatch(getCompletedTasksByUserIdAndProject({ userId: currentUser.userId, projectId: project.id }))
      setFiltered(false)
    }
  }

  const fetchTasks = useCallback(
    (userId :string | undefined, projectId: string) => {
      dispatch(getCompletedTasksByUserIdAndProject({ userId, projectId }))
    },
    [dispatch],
  )

  useEffect(() => {
    fetchTasks(currentUser.userId, project.id)
  }, [currentUser.userId, project.id, fetchTasks])

  return (
    <div className='w-full overflow-x-hidden' id='completed-container'>

      <div className='flex items-center justify-center p-2 mt-3 border-b-2 w-2/3 m-auto border-slate-500'>

        <div className='font-bold flex flex-col items-center justify-center p-2 gap-4'>
          <p className='text-4xl text-green-500'>Resolved issues:</p>
          <p className='text-xs xl:text-base'>Here you can see more information about resolved issues and analytics</p>
        </div>

      </div>

      <div className='flex mt-2 p-2 gap-10 items-start pl-10 flex-row-reverse h-5/6'>


        {loaded ? completedTasks.length > 0 ? <aside id='charts-container' className='w-1/2 p-2 bg-white dark:bg-slate-900 border-2 border-slate-100 shadow-sm flex h-full flex-col overflow-y-scroll'>
          {completedTasks.length ? <Chart tasks={completedTasks} /> : <></>}
          {completedTasks.length ? <ChartByType tasks={completedTasks} /> : <></>}
        </aside> : <></> : <div className='w-1/2 h-full flex items-center'><SmallSpinner /></div>}

        <section id='completed-task-container' className='w-1/2 p-2 border-2 border-slate-100 shadow-sm mr-auto min-h-full max-h-full flex items-center flex-col overflow-y-scroll dark:bg-slate-700'>

          <SearchField handleSearch={handleSearch} />

          <div className='min-h-[2rem] w-full flex items-center mb-2'>
            <p className='font-bold text-center text-xs xl:text-base'>Issues you have resolved:</p>
            <RefreshButton type='completed' action={fetchTasks} projectID={project.id} />
          </div>

          <ul className='flex flex-col items-center justify-center min-w-full'>
            {loaded
              ? filtered ?
                [...filteredTasks].sort((a, b) => Number(b.completedOn) - Number(a.completedOn)).map((task: any) => <CompletedTask task={task} key={task.id} />)
                : completedTasks.length ? [...completedTasks].sort((a, b) => Number(b.completedOn) - Number(a.completedOn)).map((task: any) => <CompletedTask task={task} key={task.id} />)
                  : <li className='text-sm'>Nothing yet...</li>
              : <TaskLoader />}
          </ul>

        </section>

      </div>

    </div>
  )
}

export default CompletedContainer