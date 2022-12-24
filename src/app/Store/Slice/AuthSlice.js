import { createSlice } from '@reduxjs/toolkit';
import { generateHash, verifyHash } from './../../utils';

const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  isSignedUp: false,
  passwordHash: null,
  password: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action) => {
      const { password } = action.payload;
      state.passwordHash = generateHash(password);
      state.isSignedUp = true;
      state.isLoggedIn = true;
      state.password = password;
    },
    login: (state, action) => {
      const { password } = action.payload;
      if (verifyHash(password, state.passwordHash)) {
        state.isLoggedIn = true;
        state.password = password;
      } else {
        state.error = 'Invalid password';
      }
    },

    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;

export default authSlice;
