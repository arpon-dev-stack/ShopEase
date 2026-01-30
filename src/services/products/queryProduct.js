import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backend = import.meta.env.VITE_DEMOBACKEND;

export const productName = createApi({
    reducerPath: 'yourQuery',
    baseQuery: fetchBaseQuery({baseUrl: backend}),
    endpoints: builder => ({
            productName: builder.query({
                query: (param) => {
                    const params = new URLSearchParams();
                    params.append('name', param)
                    return `products?${params.toString()}`
                }  
            })
    })
})

export const {useProductNameQuery} = productName;