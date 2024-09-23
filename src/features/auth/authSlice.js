import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:'auth',
    initialState: {
        isAuthenticated: false,
        isLoading: true,
        user: null
    },
    reducers: {
        setAuthState: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated
            state.isLoading = action.payload.isLoading
            state.user = action.payload.user
        }
    }
})

export const {setAuthState} = authSlice.actions
export default authSlice.reducer