import React from 'react'
import '../../App.css'

function TaskLoader() {
    return (
        <div className='w-full flex flex-col gap-10 items-center'>
            <div className='rounded-xl p-2 bg-slate-300 w-2/3 h-24 mt-4'>
                <div className='flex gap-2 h-full w-full p-2 animate-pulse'>
                    <div className='rounded-full w-14 h-14 bg-slate-400'></div>
                    <div className='grid gap-3 grid-rows-3 w-full'>
                        <div className='bg-slate-400 w-2/3 rounded-xl'></div>
                        <div className='bg-slate-400 w-full rounded-xl'></div>
                        <div className='bg-slate-400 w-2/3 rounded-xl'></div>
                    </div>
                </div>
            </div>

            <div className='rounded-xl p-2 bg-slate-300 w-2/3 h-24 mt-4'>
                <div className='flex gap-2 h-full w-full p-2 animate-pulse'>
                    <div className='rounded-full w-14 h-14 bg-slate-400'></div>
                    <div className='grid gap-3 grid-rows-3 w-full'>
                        <div className='bg-slate-400 w-2/3 rounded-xl'></div>
                        <div className='bg-slate-400 w-full rounded-xl'></div>
                        <div className='bg-slate-400 w-2/3 rounded-xl'></div>
                    </div>
                </div>
            </div>

            <div className='rounded-xl p-2 bg-slate-300 w-2/3 h-24 mt-4'>
                <div className='flex gap-2 h-full w-full p-2 animate-pulse'>
                    <div className='rounded-full w-14 h-14 bg-slate-400'></div>
                    <div className='grid gap-3 grid-rows-3 w-full'>
                        <div className='bg-slate-400 w-2/3 rounded-xl'></div>
                        <div className='bg-slate-400 w-full rounded-xl'></div>
                        <div className='bg-slate-400 w-2/3 rounded-xl'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskLoader