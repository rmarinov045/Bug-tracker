import { Slice, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCompletedTasksById } from "../api/taskService";

export const getCompletedTasksByUserId = createAsyncThunk(
    'getCompletedTasksByUserId',
    async (userId :string ,thunkAPI) => {
        try {
            const response = await getAllCompletedTasksById(userId)
            return response
        } catch (err :any) {
            return ''
        }
    }
)

export const completedTasksSlice :Slice = createSlice({
    name: 'completed-tasks',
    initialState: { completed: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCompletedTasksByUserId.fulfilled, (state :any, action) => {
            state.completed = [...action.payload]
        })
    }
})

export default completedTasksSlice.reducer