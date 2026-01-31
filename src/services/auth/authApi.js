import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backend = import.meta.env.VITE_DEMOBACKEND;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: backend,
    prepareHeaders: (headers, { getState }) => {
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
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (userData) => {

        return ({
          url: '/user/register',
          method: 'POST',
          body: userData,
        })
      },
    }),
    verifyMe: builder.query({
      query: (userData) => {
        return { 
          url: '/user/verify',
          method: 'POST',
          body: userData
        }
      }
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useVerifyMeQuery // Export the new hook
} = authApi;