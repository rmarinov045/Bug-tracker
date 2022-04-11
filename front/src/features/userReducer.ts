import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit'
import { deleteUserImage, getUser, updateUser } from '../api/userService'
import { deleteImage, downloadImage } from '../api/userService'
import { UserData } from '../types'



export const getUserByEmail = createAsyncThunk(
    'users/getUserById',
    async (email: string, thunkAPI) => {
        const response: any = await getUser(email)

        if (response) {
            return response[0]
        } else {
            return 'Error'
        }
    }
)

export const updateUserById = createAsyncThunk(
    'users/updateUserById',
    async (userData: UserData, thunkAPI) => {
        const response: any = await updateUser(userData)

        return response
    }
)

export const getUserProfilePic = createAsyncThunk(
    'users/getProfileImg',
    async (thunkAPI) => {
        try {
            const response = await downloadImage()
            return response
        } catch (err: any) {
            return ''
        }
    }
)

export const deleteUserProfilePic = createAsyncThunk(
    'users/deleteProfileImg',
    async (thunkAPI) => {
        try {
            await deleteUserImage() // deletes in DB
            await deleteImage() // deletes in FB store
            return ''
        } catch (err: any) {
            return ''
        }
    }
)

// add rejected handling for extraReducers
export const userSlice: Slice = createSlice({
    name: 'user',
    initialState: { auth: false, value: {}, imageUrl: '', currentProject: { name: 'default', id: 'default' }, darkMode: false },
    reducers: {
        authenticate: (state, action) => {
            state.auth = action.payload
        },
        reset: (state, action) => {
            state.value = {}
            state.imageUrl = ''
        },
        openProject: (state, action) => {
            state.currentProject = action.payload
        },
        setDarkMode: (state, action) => {
            state.darkMode = !state.darkMode
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
        builder.addCase(deleteUserProfilePic.fulfilled, (state, action) => {
            state.imageUrl = action.payload
        })
    }
})

export const { updateUserState, login, register, authenticate, reset, openProject, setDarkMode } = userSlice.actions

export default userSlice.reducer