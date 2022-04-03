import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit'
import { getUser, updateUser } from '../api/userService'
import { downloadImage } from '../firebase'

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

export const getUserProfilePic = createAsyncThunk(
    'users/getProfileImg',
    async (thunkAPI) => {
        try {
            const response = await downloadImage()
            return response
        } catch (err) {
            console.log(err);
        }
    }
)

        // add rejected handling for extraReducers
export const userSlice :Slice = createSlice({
    name: 'user',
    initialState: { auth: false, value: {}, imageUrl: '' },
    reducers: {
        authenticate: (state, action) => {
            state.auth = action.payload
        },
        reset: (state, action) => {
            state.value = {}
            state.imageUrl = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserByEmail.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(updateUserById.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(getUserProfilePic.fulfilled, (state, action) => {
            state.imageUrl = action.payload || ''
        })
    }
})

export const { updateUserState, login, register, authenticate, reset,  } = userSlice.actions

export default userSlice.reducer