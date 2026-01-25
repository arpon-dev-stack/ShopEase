import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        shippingCost: 5.00,
        taxRate: 0.08,
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            // Determine how much we are adding: 
            // If newItem.quantity exists, use it. Otherwise, default to 1.
            const amountToAdd = newItem.quantity !== undefined ? newItem.quantity : 1;

            if (existingItem) {
                // Increment the existing quantity by the amount calculated above
                existingItem.quantity += amountToAdd;
            } else {
                // Create the new entry. 
                // We spread the item and set the quantity to our amountToAdd
                state.items.push({
                    ...newItem,
                    quantity: amountToAdd
                });
            }
        },
        incrementQuantity: (state, action) => {

            // FIX: Find by ID, not the whole object
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity++;
            }
        },
        decrementQuantity: (state, action) => {

            // FIX: Find by ID
            const item = state.items.find(item => item.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity--;
            } else {
                // If quantity is 1 and user clicks minus, remove it
                state.items = state.items.filter(i => i.id !== action.payload.id);
            }
        },
        removeFromCart: (state, action) => {

            console.log("action on remove", action.payload);
            // Remove the item entirely from the array
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
    }
});

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    // updateShipping 
} = cartSlice.actions;

export default cartSlice.reducer;