import { Slice, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteTask, editTask, getAllTasks } from '../api/taskService'

const priorityFilters :any = {
    'Urgent': 3,
    'High': 2,
    'Medium': 1,
    'Low': 0
}

const typeFilters :any = {
    'Major Bug': 2,
    'Minor bug': 1,
    'Visual bug': 0
}

export const getTasks = createAsyncThunk(
    'tasks/getTasks',
   async (thunkAPI) => {
       const response = await getAllTasks()
        
        if (response === null && response) {
            throw new Error('Fail in loading tasks in tasksReducer')
        }

       return response
   }
)

export const deleteTaskById = createAsyncThunk(
    'tasks/deleteById',
    async (taskId :string, thunkAPI) => {        
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
    async (task :any, thunkAPI) => {
        const response = await editTask(task)
        
        if (response.status === 'failed') {
            return 'Error'
        } else {
            return task
        }
        
    }
)


// all tasks slice
export const tasksSlice :Slice = createSlice({
    name: 'tasks',
    initialState: { tasks: [], loaded: false, filtered: [] },
    reducers: {
        addTask: (state, action) :any=> {
            state.tasks.push(action.payload)
        },
        updateAllTasks: (state, action) :any => {            
            state.tasks = [...action.payload]
        },
        filterTasks: (state, action) :any => {
            switch (action.payload) {
                case 'Priority':
                    state.tasks = [...state.tasks.sort((a :any, b :any) => priorityFilters[b.taskPriority] - priorityFilters[a.taskPriority])]
                    break
                case 'Type':
                    state.tasks = [...state.tasks.sort((a :any, b :any)=> typeFilters[b.taskType] - typeFilters[a.taskType])]
                    break
                default: 
                    state.tasks = [...state.tasks.sort((a :any, b :any) => a.id - b.id)]
                    break
            }
        },
        searchTasks: (state, action) :any => {
            state.filtered = [...state.tasks.filter((x :any) => x.taskName.toLowerCase().includes(action.payload))]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteTaskById.fulfilled, (state, action) => {            
            state.tasks = [...state.tasks.filter((task :any) => task.id !== action.payload)]
        })
        builder.addCase(getTasks.fulfilled, (state :any, action :any) => {
            state.loaded = false
            state.tasks = [...action.payload]
            state.loaded = true
        })
        builder.addCase(editTaskById.fulfilled, (state :any, action :any) => {
            state.tasks = [...state.tasks.filter((x :any) => x.id !== action.payload.id), action.payload]
        })
    }
})

export default tasksSlice.reducer

export const { addTask, updateAllTasks, filterTasks, searchTasks} = tasksSlice.actions