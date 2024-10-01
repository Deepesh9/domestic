// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    signInSuccess: (state, action) => {
      // Handle successful sign-in logic
      return { ...state, ...action.payload };
    },
    // Other reducers can go here...
  },
});

export const { signInSuccess } = authSlice.actions;

export default authSlice.reducer;
