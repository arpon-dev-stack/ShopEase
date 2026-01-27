
export const filteredProducts = (products, category, priceRange, sortBy) => {
        return products.filter(product =>
      category === 'All' || product.category === category
    )
    .filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    
}

export const selectTotalQuantity = (state) => 
    state.reduce((total, item) => total + item.quantity, 0);

// Example rates - you can change these numbers easily
const TAX_RATE = 0.10; // 10%
const SHIPPING_COST = 15.00; // Flat fee (or make it 0 if subtotal > 100)

export const selectCartTotals = (state) => {
    // 1. Calculate Subtotal (Price * Quantity for all items)
    const subtotal = state.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);

    // 2. Calculate Tax
    const tax = subtotal * TAX_RATE;

    // 3. Logic for Shipping (e.g., Free shipping over $200)
    const shipping = subtotal > 200 || subtotal === 0 ? 0 : SHIPPING_COST;

    // 4. Final Total
    const total = subtotal + tax + shipping;

    return {
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        shipping: shipping.toFixed(2),
        total: total.toFixed(2)
    };
};