import React from 'react'

import Navbar from '../navbar'
import TasksContainer from './tasks-container'

import '../../App.css'
import { RootStateOrAny, useSelector } from 'react-redux'
import Filter from '../Utils/Filter'

function HomeMain() {
    const userFirstName = useSelector((state :RootStateOrAny) => state.user.value.firstName)

    // Add separate page for add task feature
    // remove add task menu on outside click
    return (

        <div className='flex h-screen w-full'>

            <Navbar />

            <div id='home-admin' className='flex h-screen w-full filter'>

                <div className="w-full flex flex-col pt-10 items-center">

                    <p className='font-bold text-2xl md:text-3xl border-b-2 w-5/6 text-center pb-2'>Greetings {userFirstName}!</p>

                    <Filter />

                    <h1 className='mt-5 font-bold text-xl'>Current issues:</h1>

                    <TasksContainer />

                </div>
            </div>


        </div>

    )
}

export default HomeMain