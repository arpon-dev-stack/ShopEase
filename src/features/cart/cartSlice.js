import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const itemInCart = state.items.find((item) => item.id === newItem.id);

            if (itemInCart) {
                itemInCart.quantity += newItem?.quantity || 1;
            } else {
                // FIX: Push to state.items, not state
                state.items.push({ ...newItem, quantity: newItem?.quantity || 1 });
            }
        },

        decrementQuantity: (state, action) => {
            const {id} = action.payload; // Just pass the ID
            const itemInCart = state.items.find((item) => item.id === id);

            if (itemInCart) {
                if (itemInCart.quantity > 1) {
                    itemInCart.quantity -= 1;
                } else {
                    // Option: Remove item if it's the last one
                    state.items = state.items.filter(item => item.id !== id);
                }
            }
        },

        removeFromCart: (state, action) => {
            const {id} = action.payload;
            // FIX: Mutate state.items directly
            state.items = state.items.filter(item => item.id !== id);
        },
        
    }
});

export const {removeFromCart, decrementQuantity, addToCart} = cartSlice.actions;
export default cartSlice.reducer