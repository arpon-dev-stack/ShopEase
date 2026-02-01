import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const port = axios.create({ baseURL: 'http://localhost:3000' })

export const signinUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    console.log("signin start")
    try {
      const response = await port.post('/user/login', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Login failed');
    }
  }
);

export const signupUser = createAsyncThunk(
  'user/signup',
  async (userData, { rejectWithValue }) => {
    try {
      console.log("signup")
      const response = await port.post('/user/signup', userData);
      return response.data;
    } catch (err) {
      console.log("failed")
      return rejectWithValue(err.response.data.message || 'Signup failed');
    }
  }
);

export const signoutUser = createAsyncThunk(
  'user/logout',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await port.post('/user/logout', userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Signup failed');
    }
  }
);


export const verifyToken = createAsyncThunk(
  'user/verify',
  async (_, { getState, rejectWithValue }) => {
    console.log("start")
    const token = getState().auth.token || localStorage.getItem('token');
    if (!token) return rejectWithValue('No token found');

    try {
      const response = await port.get('/user/varify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      localStorage.removeItem('token');
      return rejectWithValue('Session expired');
    }
  }
);