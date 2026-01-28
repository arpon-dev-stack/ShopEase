import {configureStore} from '@reduxjs/toolkit'
import productBrif from './features/product/initialProduct'
import cartRducer from './features/cart/cartSlice'
import { productApi } from './services/products/product'
import { productDetail } from './services/productDetail'
import { productName } from './services/products/queryProduct'
import {authApi} from './services/authApi'
import authReducer from './services/auth/authSlice'

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [productName.reducerPath]: productName.reducer,
        [productDetail.reducerPath]: productDetail.reducer,
        [productApi.reducerPath]: productApi.reducer,
        productBrif: productBrif,
        cart: cartRducer,
        auth: authReducer
    },
    middleware: (defaultMiddleWare) => defaultMiddleWare().concat(productApi.middleware, productDetail.middleware, productName.middleware, authApi.middleware)
})

export default store;