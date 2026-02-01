import { createSlice } from '@reduxjs/toolkit';
import { signoutUser, signupUser } from './authApi';

const authSlice = createSlice({
  name: 'user',
  initialState: { user: null, status: null, token: null, isAuthenticated: false, popup: null },
  reducers: {
    setPopup: (state, actions) => {
      state.popup = actions.payload
    }
  },
  extraReducers: buider => {
    buider
      .addCase(signupUser.pending, (state) => state.status = 'loading')
      .addCase(signupUser.fulfilled, (state, actions) => {
        state.isAuthenticated = true;
        state.status = 'success';
        state.token = actions.payload.token;
        state.user = actions.payload.user;
      })
      .addCase(signupUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.status = 'fail';
        state.token = null;
        state.user = null;
      })
      .addCase(signoutUser.pending, (state) => state.status = 'loading')
      .addCase(signoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.status = 'success';
        state.token = null;
        state.user = null;
      })
      .addCase(signoutUser.rejected, (state) => state.status = 'fail')
  }
});

export default authSlice.reducer;
export const {setPopup} = authSlice.actions;