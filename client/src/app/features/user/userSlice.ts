import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
    access_token: "",
    email: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.access_token = action.payload.access_token,
            state.email = action.payload.email
        },
        logout: (state) => {
            state.access_token = "",
            state.email = ""
        }
    }
})

export const {login, logout} = userSlice.actions

export const selectCase = (state: RootState) => state.user

export default userSlice.reducer
