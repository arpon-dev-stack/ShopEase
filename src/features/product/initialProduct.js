import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { products } from "../../data";

export const fetchNewProducts = createAsyncThunk(
  'initialProducts/fetchNewProducts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { batchIndex } = getState().products;
      
      // Logic: 0 -> products, 1 -> product1, 2 -> product2...
      const endpoint = batchIndex === 0 ? 'products' : `product${batchIndex}`;
      
      const response = await fetch(`${import.meta.env.VITE_DEMOBACKEND}/${endpoint}`);
      
      if (!response.ok) return []; // If endpoint doesn't exist, return empty array
      
      return await response.json();
    } catch (error) {
      return rejectWithValue("End of products reached");
    }
  }
);
const productSlice = createSlice({
  name: 'initialProducts',
  initialState: {
    items: products,
    initialProducts: products,
    status: 'idle',
    batchIndex: 0, // Starts at 0 for /products, then 1 for /product1...
    hasMore: true, // Becomes false when we run out of data
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';

        if (action.payload.length > 0) {
          // APPEND: Keep old items and add new ones
          state.items = [...state.items, ...action.payload];
          state.batchIndex += 1; // Move to next batch
        } else {
          state.hasMore = false; // No more data found on server
        }
      })
      .addCase(fetchNewProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.hasMore = false; // Stop trying if error occurs
      });
  }
});


// export const { addNewProducts } = productSlice.actions;
export default productSlice.reducer;