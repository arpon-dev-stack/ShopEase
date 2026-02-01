import {configureStore} from '@reduxjs/toolkit'
import productBrif from './features/product/initialProduct'
import cartRducer from './features/cart/cartSlice'
import { productApi } from './services/products/product'
import { productDetail } from './services/products/productDetail'
import { productName } from './services/products/queryProduct'
import authReducer from './services/auth/authSlice'

const store = configureStore({
    reducer: {
        [productName.reducerPath]: productName.reducer,
        [productDetail.reducerPath]: productDetail.reducer,
        [productApi.reducerPath]: productApi.reducer,
        productBrif: productBrif,
        cart: cartRducer,
        user: authReducer
    },
    middleware: (defaultMiddleWare) => defaultMiddleWare().concat(productApi.middleware, productDetail.middleware, productName.middleware)
})

export default store;