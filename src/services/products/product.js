import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const backend = import.meta.env.VITE_DEMOBACKEND;

export const productApi = createApi({
    reducerPath: 'productList',
    baseQuery: fetchBaseQuery({ baseUrl: backend }),
    endpoints: builder => ({
        getProducts: builder.query({
            query: (filter) => {
                if (filter.category === 'all' && filter.maxPrice === 1000 && filter.sort === 'default') {
                    return '/products';
                }

                const params = new URLSearchParams();
                if (filter.category !== 'all') params.append('category', filter.category);
                if (filter.maxPrice < 1000) params.append('price_lte', filter.maxPrice);

                if (filter.sort === 'price-low') {
                    params.append('_sort', 'price');
                    params.append('_order', 'asc');
                } else if (filter.sort === 'price-high') {
                    params.append('_sort', 'price');
                    params.append('_order', 'desc');
                } else if (filter.sort === 'rating') {
                    params.append('_sort', 'rating');
                    params.append('_order', 'desc');
                }

                return `/products?${params.toString()}`;
            },
        })
    })
})

export const { useGetProductsQuery } = productApi;