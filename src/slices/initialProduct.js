import { createSlice } from "@reduxjs/toolkit";
import { products } from "../data";

const initialProductSlice = createSlice({
    name: 'initialProduct',
    initialState: products,
    reducers: {
        filter: (state, actions) => {
            return state.map(item => {
                if (actions.payload === "All") {
                    return {...item, isShow: true}
                } else if (item.category !== actions.payload) {
                    return {...item, isShow: false}
                } else {
                    return {...item, isShow: true}
                }
                return item;
            });
        }
    } 
});

export const {filter} = initialProductSlice.actions;
export default initialProductSlice.reducer;