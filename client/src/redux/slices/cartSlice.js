import { createSlice } from "@reduxjs/toolkit";
import {updateCart} from "../../util/cartUtils";
import {DEFAULT_PAYMENT_METHOD} from "../../util/constants";

const initialState = JSON.parse(localStorage.getItem("cart"))
    || { cartItems: [], shippingAddress: {}, paymentMethod: DEFAULT_PAYMENT_METHOD };

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
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        clearCartItems: state => {
            state.cartItems = [];
            return updateCart(state);
        }
    },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;