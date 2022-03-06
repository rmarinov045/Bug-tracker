import { createSlice, Slice } from '@reduxjs/toolkit'

// create user slice and functionality to update state by using reducers

export const userSlice :Slice = createSlice({
    name: 'user',
    initialState: { auth: false, value: { email: '', firstName: '', lastName: '', position: '', company: '' } },
    reducers: {
        updateUserState: (state, action) => {
            state.value = action.payload // updates state to data passed as payload of the action
        },
        login: (state, action) => {
            // handles login => may not be needed
        },
        register: (state, action) => {
            state.value = action.payload    // passed an object of with above interface and sets it in the state
        },
        authenticate: (state, action) => {
            state.auth = action.payload
        }
    }
})

export const { updateUserState, login, register, authenticate } = userSlice.actions

export default userSlice.reducer