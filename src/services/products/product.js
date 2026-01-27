import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const backend = import.meta.env.VITE_DEMOBACKEND;

export const productApi = createApi({
    reducerPath: 'productList',
    baseQuery: fetchBaseQuery({baseUrl: backend}),
    endpoints: builder => ({
        getProducts: builder.query({
            query: (params) => {
                const filteredProduct = {};
                if (params.category) filteredProduct.category = params.category;
                if (params.minPrice) filteredProduct.minPrice = params.minPrice;
                if (params.maxPrice) filteredProduct.maxPrice = params.maxPrice;
                if (params.sort) filteredProduct.sort = params.sort;

                console.log(filteredProduct)
                return {
                    url: 'products',
                    // params: filteredProduct
                }
            }
        })
    })
})

export const {useGetProductsQuery} = productApi;