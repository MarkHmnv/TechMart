import {SHIPPING_PRICE, SHIPPING_THRESHOLD, TAX_RATE} from "./constants";
export const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const updateCart = (state) => {
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );

    state.totalCartItemQuantity = state.cartItems.reduce((a, c) => a + c.quantity, 0);

    state.shippingPrice = addDecimals(state.itemsPrice > SHIPPING_THRESHOLD ? SHIPPING_PRICE : 0);

    state.taxPrice = addDecimals(TAX_RATE * state.itemsPrice);

    state.totalPrice = addDecimals(
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    );

    localStorage.setItem("cart", JSON.stringify(state));
}
