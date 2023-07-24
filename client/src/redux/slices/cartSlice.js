import { createSlice } from "@reduxjs/toolkit";
import {updateCart} from "../../util/cartUtils";

const initialState = JSON.parse(localStorage.getItem("cart")) || { cartItems: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemToAdd = action.payload;
            const existingCartItemIndex = state.cartItems.findIndex(i => i._id === itemToAdd._id);

            if (existingCartItemIndex !== -1) {
                state.cartItems[existingCartItemIndex] = itemToAdd;
            } else {
                state.cartItems.push(itemToAdd);
            }

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(i => i._id !== itemId);
            return updateCart(state);
        }
    },
});

export const { addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;