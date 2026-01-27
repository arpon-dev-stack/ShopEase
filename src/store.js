import {configureStore} from '@reduxjs/toolkit'
import productBrif from './features/product/initialProduct'
import cartRducer from './features/cart/cartSlice'
import { productApi } from './services/products/product'
import { productDetail } from './services/productDetail'

const store = configureStore({
    reducer: {
        [productDetail.reducerPath]: productDetail.reducer,
        [productApi.reducerPath]: productApi.reducer,
        productBrif: productBrif,
        cart: cartRducer
    },
    middleware: (defaultMiddleWare) => defaultMiddleWare().concat(productApi.middleware, productDetail.middleware)
})

export default store;