import {configureStore} from '@reduxjs/toolkit'
import productReducer from './slices/initialProduct'
import cartRducer from './slices/cartSlice'

const store = configureStore({
    reducer: {
        // cart: cartReducer,
        initialProduct: productReducer,
        cart: cartRducer
    }
})

export default store;