import { Slice, createSlice } from '@reduxjs/toolkit'

// all tasks slice
export const tasksSlice :Slice = createSlice({
    name: 'tasks',
    initialState: { tasks: [] },
    reducers: {
        addTask: (state, action) :any=> {
            state.tasks.push(action.payload)
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.map((task :any) => task.id !== action.payload)
        },
        updateAllTasks: (state, action) :any => {
            state.tasks = [...state.tasks, ...action.payload]
        }
    }
})

export default tasksSlice.reducer

export const { addTask, deleteTask, updateAllTasks } = tasksSlice.actions