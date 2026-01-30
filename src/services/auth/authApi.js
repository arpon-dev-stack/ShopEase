// services/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://your-api.com/api',
    prepareHeaders: (headers, {getState}) => {
      const token = localStorage.getItem('token') || getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    verifyMe: builder.query({
      query: () => '/me', // This maps to GET https://your-api.com/api/me
    }),
  }),
});

export const { 
  useSignInMutation, 
  useSignUpMutation, 
  useVerifyMeQuery // Export the new hook
} = authApi;