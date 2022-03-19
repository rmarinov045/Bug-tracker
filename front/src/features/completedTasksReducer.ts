import { Slice, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCompletedTasks } from "../utils/api";

export const getCompletedTasks = createAsyncThunk(
    'getCompletedTasks',
    async (thunkAPI) => {
        try {
            const response = await getAllCompletedTasks()
            return response
        } catch (err :any) {
            return err.message
        }
    }
)

export const completedTasksSlice :Slice = createSlice({
    name: 'completed-tasks',
    initialState: { completed: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCompletedTasks.fulfilled, (state :any, action) => {
            state.completed = [...action.payload]
        })
    }
})

export default completedTasksSlice.reducer