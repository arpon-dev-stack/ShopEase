import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backend = import.meta.env.VITE_DEMOBACKEND;

export const productDetail = createApi({
  reducerPath: 'productDetail',
  // Ensure your baseUrl is set to your server address, e.g., 'http://localhost:5000/api'
  baseQuery: fetchBaseQuery({ baseUrl: backend }), 
  endpoints: (builder) => ({ // Added parentheses and curly braces
    getProductById: builder.query({
      query: (id) => `products/${id}`
    }),
  }), // End of object return
});

// RTK Query hooks always start with "use" and end with "Query" or "Mutation"
export const { useGetProductByIdQuery } = productDetail;