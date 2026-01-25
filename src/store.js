import {configureStore} from '@reduxjs/toolkit'
import productReducer from './features/product/initialProduct'
import cartRducer from './features/cart/cartSlice'

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartRducer
    }
})

export default store;