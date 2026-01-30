import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backend = import.meta.env.VITE_DEMOBACKEND;

export const productDetail = createApi({
  reducerPath: 'productDetail',
  baseQuery: fetchBaseQuery({ baseUrl: backend }), 
  endpoints: (builder) => ({
    getProductById: builder.query({
      query: (id) => `products/${id}`
    }),
  }),
});

export const { useGetProductByIdQuery } = productDetail;