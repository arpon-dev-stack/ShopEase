import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;

            // Find by name since IDs were removed from your JSON
            const itemInCart = state.items.find((item) => item.name === newItem.name);

            if (itemInCart) {
                // If it exists, add the specific quantity provided, or default to 1
                itemInCart.quantity += (newItem.quantity || 1);
            } else {
                // If it's new, add it with the specific quantity provided, or default to 1
                state.items.push({
                    ...newItem,
                    quantity: newItem.quantity || 1
                });
            }
        },
        decrementQuantity: (state, action) => {
            const { id } = action.payload; // Just pass the ID
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
            const { id } = action.payload;
            // FIX: Mutate state.items directly
            state.items = state.items.filter(item => item.id !== id);
        },

    }
});

export const { removeFromCart, decrementQuantity, addToCart } = cartSlice.actions;
export default cartSlice.reducer