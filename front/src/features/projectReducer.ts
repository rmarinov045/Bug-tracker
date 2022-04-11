import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProjectInDb, deleteProject, getProjectsFromDb } from "../api/projectService";
import { Project } from "../types";


export const createProject = createAsyncThunk(
    'projects/create',
    async (projectName: string, thunkAPI) => {
        const response = await createProjectInDb(projectName)

        return response
    }
)

export const getProjects = createAsyncThunk(
    'projects/get',
    async (thunkAPI) => {
        const response = await getProjectsFromDb()

        return response
    }
)

export const deleteProjectById = createAsyncThunk(
    'projects/delete',
    async (projectId: string, thunkAPI) => {
        const response = await deleteProject(projectId)

        if (response) {
            return projectId
        }
    }
)

const projectSlice = createSlice({
    name: 'projects',
    initialState: { list: [] as Project[], loaded: false },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.list = Object.values(action.payload || [])
            state.loaded = true
        })
        builder.addCase(getProjects.rejected, (state, action) => {
            state.list = []
            state.loaded = true
        })
        builder.addCase(getProjects.pending, (state, action) => {
            state.loaded = false
        })
        builder.addCase(deleteProjectById.fulfilled, (state, action) => {
            state.list = [...state.list.filter((x: any) => x.id !== action.payload)]
            state.loaded = true
        })
        builder.addCase(deleteProjectById.pending, (state, action) => {
            state.loaded = false
        })
        builder.addCase(createProject.fulfilled, (state, action) => {
            state.list.push(action.payload)
            state.loaded = true
        })
        builder.addCase(createProject.pending, (state, action) => {
            state.loaded = false
        })
    }
})

export default projectSlice.reducer