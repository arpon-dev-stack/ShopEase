// import { createSelector } from '@reduxjs/toolkit';

// // --- Input Selectors (Raw Data) ---
// const selectCartItems = (state) => state.cart.items;
// const selectShippingCost = (state) => state.cart.shippingCost;
// const selectTaxRate = (state) => state.cart.taxRate;

// // --- Memoized Selector (The Math) ---
// export const selectCartTotals = createSelector(
//   [selectCartItems, selectShippingCost, selectTaxRate], 
//   (items, shipping, taxRate) => {
//     // 1. Calculate Subtotal
//     const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
//     // 2. Calculate Tax based on the changeable taxRate
//     const taxAmount = subtotal * taxRate;
    
//     // 3. Calculate Final Total (Subtotal + Tax + Shipping)
//     const grandTotal = subtotal + taxAmount + shipping;

//     return {
//       subtotal: subtotal.toFixed(2),
//       tax: taxAmount.toFixed(2),
//       shipping: shipping.toFixed(2),
//       total: grandTotal.toFixed(2),
//       itemCount: items.reduce((acc, item) => acc + item.quantity, 0)
//     };
//   }
// );