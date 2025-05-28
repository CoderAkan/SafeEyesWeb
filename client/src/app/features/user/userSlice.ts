import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Only load from localStorage on app start
const loadInitialState = () => {
    try {
        const access_token = localStorage.getItem('access_token') || ''
        const refresh_token = localStorage.getItem('refresh_token') || ''
        return { access_token, refresh_token }
    } catch {
        return { access_token: '', refresh_token: '' }
    }
}

const initialState = loadInitialState()

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
            
            // Save to localStorage only when logging in
            localStorage.setItem('access_token', action.payload.access_token)
            localStorage.setItem('refresh_token', action.payload.refresh_token)
        },
        logout: (state) => {
            state.access_token = ""
            state.refresh_token = ""
            
            // Clear localStorage on logout
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
        }
    }
})

export const {login, logout} = userSlice.actions

export const selectCase = (state: RootState) => state.user

export default userSlice.reducer