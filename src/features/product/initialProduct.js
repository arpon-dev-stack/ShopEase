import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../data";

const productBrif = createSlice({
  name: 'productBrif',
  initialState: {
    items: products,
    categories: [
      "Fashion",
      "Electronics",
      "Home"
    ]
  }
});

export default productBrif.reducer