import { Slice, createSlice } from '@reduxjs/toolkit'

// all tasks slice
export const tasksSlice :Slice = createSlice({
    name: 'tasks',
    initialState: { value: [] },
    reducers: {
        updateTasks: (state, action) => {
            state.value.push(action.payload)
        },
        deleteTask: (state, action) => {
            state.value = state.value.map((task :any) => task.id !== action.payload)
        }
    }
})

export default tasksSlice.reducer

export const { updateTasks, deleteTask } = tasksSlice.actions