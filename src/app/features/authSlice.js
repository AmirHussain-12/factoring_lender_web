import { createSlice } from '@reduxjs/toolkit';
import { Axios } from '../config/axios';
import { API_URL } from '../../global/constants';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  token: localStorage.getItem('token'),
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isAuthenticated = false
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.error;
    },
    logoutStart: (state) => {
      state.isAuthenticated = false;
      localStorage.clear()
      state.isLoading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.isLoading = false;
      state.error = null;
      state.user = null;
    },
    logoutFailure: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const login = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await Axios.post(API_URL.login, userData);
    const token = response.headers.authorization;
    const user = response.data.data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', true);
    dispatch(loginSuccess({ token, user }));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(logoutStart());
  try {
    const response = await Axios.delete(API_URL.logout);
    dispatch(logoutSuccess(response.data));
  } catch (error) {
    dispatch(logoutFailure(error.message));
  }
};

export const { loginStart, loginSuccess, loginFailure, 
  logoutStart,
  logoutSuccess,
  logoutFailure, } = authSlice.actions;
export default authSlice.reducer;