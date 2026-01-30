import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../data";

const productBrif = createSlice({
  name: 'productBrif',
  initialState: {
    items: products,
    categories: [
      "all",
      "fashion",
      "electronics",
      "home"
    ]
  }
});

export default productBrif.reducer