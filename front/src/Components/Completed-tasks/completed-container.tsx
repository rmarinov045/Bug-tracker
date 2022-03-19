import { User } from '../../features/userReducer'
import React, { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getCompletedTasks } from '../../features/completedTasksReducer'

function CompletedContainer() {
  const currentUser: User = useSelector((state: RootStateOrAny) => state.user.value) // May need to be in parent
  const completedTasks = useSelector((state: RootStateOrAny) => state.completedTasks.completed)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCompletedTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    // make sure to style for big screens as well
  return (
    <div className='w-full'>

      <div className='flex items-center justify-center p-2 mt-3 border-b-2 w-2/3 m-auto border-slate-500'>

        <div className='font-bold flex flex-col items-center justify-center p-2 gap-4'>
          <p className='text-4xl text-green-500'>Resolved issues:</p>
          <p className='text-xs'>Here you can see more information about resolved issues and analytics</p>
        </div>

      </div>

      <div className='flex mt-2 p-2 gap-2'>

        <main className='bg-red-500 w-1/2 p-2'></main>

        <aside className='w-1/2 p-2 border-2 border-slate-100 shadow-sm'>

          <p className='font-bold text-center text-xs mb-2'>Issues you have resolved:</p>
          
          <ul className='flex flex-col gap-2 items-center justify-center'>
              <li className='w-full text-xs bg-slate-200 flex pl-2 pr-2 p-1'>Test task<span className='ml-auto'>...</span></li>
          </ul>

        </aside>

      </div>

    </div>
  )
}

export default CompletedContainer