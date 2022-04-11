import { Slice, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteTask, editTask, getAllTasks } from '../api/taskService'
import { taskData } from '../types'

const priorityFilters: { [key: string]: number } = {
    'Urgent': 3,
    'High': 2,
    'Medium': 1,
    'Low': 0
}

const typeFilters: { [key: string]: number } = {
    'Major Bug': 2,
    'Minor bug': 1,
    'Visual bug': 0
}

export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (projectId: string, thunkAPI) => {
        const response = await getAllTasks(projectId || 'default')
        
        if (response === null && response) {
            throw new Error('Failed loading tasks')
        }

        return response
    }
)

export const deleteTaskById = createAsyncThunk(
    'tasks/deleteById',
    async (taskId: string, thunkAPI) => {
        const response = await deleteTask(taskId)

        if (response.status === 'failed') {
            return response.message
        } else {
            return taskId
        }
    }
)

export const editTaskById = createAsyncThunk(
    'tasks/editById',
    async (task: taskData, thunkAPI) => {
        const response = await editTask(task)

        if (response.status === 'failed') {
            return 'Error'
        } else {
            return task
        }

    }
)

export const tasksSlice: Slice = createSlice({
    name: 'tasks',
    initialState: { tasks: [], loaded: false, filtered: [] },
    reducers: {
        addTask: (state, action): void => {
            state.tasks.push(action.payload)
        },
        updateAllTasks: (state, action): void => {
            state.tasks = [...action.payload]
        },
        filterTasks: (state, action): void => {
            switch (action.payload) {
                case 'Priority':
                    state.tasks = [...state.tasks.sort((a: taskData, b: taskData) => priorityFilters[b.taskPriority] - priorityFilters[a.taskPriority])]
                    break
                case 'Type':
                    state.tasks = [...state.tasks.sort((a: taskData, b: taskData) => typeFilters[b.taskType] - typeFilters[a.taskType])]
                    break
                default:
                    state.tasks = [...state.tasks.sort((a: taskData, b: taskData) => Number(a.id) - Number(b.id))]
                    break
            }
        },
        searchTasks: (state, action): void => {
            state.filtered = [...state.tasks.filter((x: taskData) => x.taskName.toLowerCase().includes(action.payload))]
        },
        resetTasks: (state, action) => {
            state.tasks = []
            state.loaded = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteTaskById.fulfilled, (state, action) => {
            state.tasks = [...state.tasks.filter((task: taskData) => task.id !== action.payload)]
        })
        builder.addCase(getTasks.fulfilled, (state: any, action: any) => {
            state.tasks = [...action.payload]
            state.loaded = true
        })
        builder.addCase(getTasks.pending, (state, action) => {
            state.loaded = false
        })
        builder.addCase(getTasks.rejected, (state, action) => {
            state.tasks = []
            state.loaded = true
        })
        builder.addCase(editTaskById.fulfilled, (state: any, action: any) => {
            state.tasks = [...state.tasks.filter((x: taskData) => x.id !== action.payload.id), action.payload]
        })
    }
})

export default tasksSlice.reducer

export const { addTask, updateAllTasks, filterTasks, searchTasks, resetTasks } = tasksSlice.actions