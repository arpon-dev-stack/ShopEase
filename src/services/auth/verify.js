import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.shopease.com/',
    prepareHeaders: (headers, { getState }) => {
      // 1. Get the token from Redux state (preferred) or LocalStorage
      const token = getState().auth.token || localStorage.getItem('token');
      
      // 2. If token exists, add it to the Authorization header
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    verifyMe: builder.query({
      query: () => '/auth/me',
    }),
    // ... other endpoints
  }),
});

export const {useVerifyMeQuery} = api