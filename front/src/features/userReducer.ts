import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit'
import { getUser } from '../utils/api'

// create user slice and functionality to update state by using reducers

export const getUserByEmail = createAsyncThunk(
    'users/getUserById',
    async (email :string, thunkAPI) => {
        const response = await getUser(email)

        if(response) {
            return response
        } else {
            return 'Error'
        }
    }
)

export const userSlice :Slice = createSlice({
    name: 'user',
    initialState: { auth: false, value: {} },
    reducers: {
        // updateUserState: (state, action) => {
        //     state.value = action.payload // updates state to data passed as payload of the action
        // },
        authenticate: (state, action) => {
            state.auth = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserByEmail.fulfilled, (state, action) => {
            state.value = action.payload
        })
    }
})

export const { updateUserState, login, register, authenticate } = userSlice.actions

export default userSlice.reducer