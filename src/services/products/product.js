import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const backend = import.meta.env.VITE_DEMOBACKEND;

export const productApi = createApi({
    reducerPath: 'productList',
    baseQuery: fetchBaseQuery({ baseUrl: backend }),
    endpoints: builder => ({
        getProducts: builder.query({
            query: (filter) => {
                return {
                    url: '/products',
                    params: filter
                }
            },
        })
    })
})

export const { useGetProductsQuery } = productApi;