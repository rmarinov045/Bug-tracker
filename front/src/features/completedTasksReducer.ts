import { Slice, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCompletedTasksByIdAndProject } from "../api/taskService";

export const getCompletedTasksByUserIdAndProject = createAsyncThunk(
    'completedTasks/getCompletedTasksByUserIdAndProject',
    async ({ userId = '', projectId }: { userId: string | undefined, projectId: string }, thunkAPI) => {
        try {
            if (userId === '') {
                throw new Error('No user logged in!')
            }
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
        },
        resetCompletedTasks: (state, action) => {
            state.completed = []
            state.loaded = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCompletedTasksByUserIdAndProject.fulfilled, (state: any, action) => {
            state.completed = [...action.payload]
            state.loaded = true
        })
        builder.addCase(getCompletedTasksByUserIdAndProject.pending, (state: any, action) => {
            state.loaded = false
        })
    }
})

export const { searchCompletedTasks, resetCompletedTasks } = completedTasksSlice.actions

export default completedTasksSlice.reducer