import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart(state) {
            state.items = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
        },
        removeFromCart(state, action) {
            const productId = action.payload;
            const existingItem = state.items.find((item) => item.id === productId);

            if (!existingItem) return;

            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                state.totalQuantity -= 1;
                state.totalPrice -= existingItem.price;
            } else {
                state.items = state.items.filter((item) => item.id !== productId);
                state.totalQuantity -= 1;
                state.totalPrice -= existingItem.price;
            }
        },
        addToCart(state, action) {
            const product = action.payload;
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...product,
                    quantity: 1,
                });
            }

            state.totalQuantity += 1;
            state.totalPrice += product.price;
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

