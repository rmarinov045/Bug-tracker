import { Slice, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCompletedTasksByIdAndProject } from "../api/taskService";

export const getCompletedTasksByUserIdAndProject = createAsyncThunk(
    'completedTasks/getCompletedTasksByUserIdAndProject',
    async ({ userId, projectId } :{userId: string, projectId: string}, thunkAPI) => {
        try {
            const response = await getAllCompletedTasksByIdAndProject(userId, projectId)
            return response
        } catch (err: any) {
            return []
        }
    }
)

export const completedTasksSlice: Slice = createSlice({
    name: 'completedTasks',
    initialState: { completed: [], loaded: false, filtered: [] },
    reducers: {
        searchCompletedTasks: (state, action) => {
            state.filtered = [...state.completed.filter((x: { taskName: string }) => x.taskName.toLowerCase().includes(action.payload))]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCompletedTasksByUserIdAndProject.fulfilled, (state: any, action) => {
            state.loaded = false      
            state.completed = [...action.payload]            
            state.loaded = true
        })
    }
})

export const { searchCompletedTasks } = completedTasksSlice.actions

export default completedTasksSlice.reducer