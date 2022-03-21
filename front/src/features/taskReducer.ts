import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
    name: 'task',
    initialState: { value: {} }, // make sure to add props
    reducers: {
        updateTask(state, action) {
            // add functionality
        }
    } 
})

export const { updateTask } = taskSlice.actions

export default taskSlice.reducer