import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit'
import { getUser, updateUser } from '../utils/api'

// Will need persisting state

export interface User {
    company: string,
    email: string,
    firstName: string,
    lastName: string,
    position: string,
    userId: string
}

// create user slice and functionality to update state by using reducers

export const getUserByEmail = createAsyncThunk(
    'users/getUserById',
    async (email :string, thunkAPI) => {
        const response :any = await getUser(email)
       
        if(response) {
            return response[0]
        } else {
            return 'Error'
        }
    }
)

export const updateUserById = createAsyncThunk(
    'users/updateUserById',
    async (userData :User, thunkAPI) => {
        const response :any = await updateUser(userData)
        
        return response
    }
)
        // add rejected handling for extraReducers
export const userSlice :Slice = createSlice({
    name: 'user',
    initialState: { auth: false, value: {} },
    reducers: {
        authenticate: (state, action) => {
            state.auth = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserByEmail.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(updateUserById.fulfilled, (state, action) => {
            state.value = action.payload
        })
    }
})

export const { updateUserState, login, register, authenticate } = userSlice.actions

export default userSlice.reducer