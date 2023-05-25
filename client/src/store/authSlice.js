import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId : null,
    phone : null,
    hashedOtp: null,
  },
  reducers: {
    setOtp: (state, action) => {
        const {hashedOTP, phone} = action.payload;
        state.phone = phone;
        state.hashedOtp = hashedOTP;
    },
    setUserData: (state, action) => {
        const {userId, phone} = action.payload;
        state.userId = userId;
        state.phone = phone;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setOtp, setUserData } = authSlice.actions

export default authSlice.reducer