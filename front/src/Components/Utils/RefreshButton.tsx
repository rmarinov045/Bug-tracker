import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'

function RefreshButton({ action, projectID, type }: { action: Function, projectID: string, type: string }) {

    const tasksLoaded = useSelector((state: RootStateOrAny) => state.tasks.loaded)
    const completedTasksLoaded = useSelector((state: RootStateOrAny) => state.completedTasks.loaded)
    const userId = useSelector((state :RootStateOrAny) => state.user.value.userId)

    let loading = false

    type === 'completed' ? loading = completedTasksLoaded : loading = tasksLoaded 

    return (
        <div onClick={() => action(userId, projectID)} className={!loading ? 'flex animate-spin relative ml-auto text-xs max-w-[2rem] min-w-[2rem] items-center justify-center max-h-[2rem]' : 'flex cursor-pointer relative ml-auto text-xs max-w-[2rem] min-w-[2rem] items-center justify-center max-h-[2rem] transition ease-in-out 150 hover:text-green-500'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        </div>
    )
}

export default RefreshButton