import { Slice, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteTask, getAllTasks } from '../utils/api'

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


// all tasks slice
export const tasksSlice :Slice = createSlice({
    name: 'tasks',
    initialState: { tasks: [] },
    reducers: {
        addTask: (state, action) :any=> {
            state.tasks.push(action.payload)
        },
        // deleteTask: (state, action) => {
        //     state.tasks = state.tasks.map((task :any) => task.id !== action.payload)
        // },
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteTaskById.fulfilled, (state, action) => {            
            state.tasks = [...state.tasks.filter((task :any) => task.id !== action.payload)]
        })
        builder.addCase(getTasks.fulfilled, (state :any, action :any) => {
            state.tasks = [...action.payload]
        })
    }
})

export default tasksSlice.reducer

export const { addTask, updateAllTasks, filterTasks} = tasksSlice.actions