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

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
        },
        incrementQuantity: (state, action) => {

            console.log("action on increment", action.payload);
            // FIX: Find by ID, not the whole object
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity++;
            }
        },
        decrementQuantity: (state, action) => {

            console.log("action on decrement", action.payload);
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
        // updateShipping: (state, action) => {
        //     // Bonus: Action to change shipping cost
        //     state.shippingCost = action.payload;
        // }
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