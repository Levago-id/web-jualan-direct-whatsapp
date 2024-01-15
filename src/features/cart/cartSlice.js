import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const newItem = action.payload
            const selectCartIndex = state.items.findIndex(product => product.id === newItem.id)

            if (selectCartIndex !== -1) {
                state.items[selectCartIndex].quantity += 1
                state.items[selectCartIndex].totalPrice = state.items[selectCartIndex].quantity * newItem.price
            } else {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price
                })

            }

        },
        removeItemFromCart: (state, action) => {
            const newItem = action.payload
            const selectCartIndex = state.items.findIndex(product => product.id === newItem.id)

            if (selectCartIndex !== -1) {
                // Mengurangi jumlah item
                state.items[selectCartIndex].quantity -= 1;

                // Menghitung kembali total harga
                state.items[selectCartIndex].totalPrice = state.items[selectCartIndex].quantity * newItem.price;

                // Menghapus item jika jumlah mencapai 0
                if (state.items[selectCartIndex].quantity === 0) {
                    state.items.splice(selectCartIndex, 1);
                }
            }
        },
        clearItemFromCart: (state, action) => {
            const newItem = action.payload
            const selectCartIndex = state.items.findIndex(product => product.id === newItem.id)

            state.items.splice(selectCartIndex, 1)
        },
        addItemWithQuantity: (state, action) => {
            const { newItem, quantity } = action.payload;
            const selectCartIndex = state.items.findIndex(product => product.id === newItem.id)

            if (selectCartIndex !== -1) {
                state.items[selectCartIndex].quantity += quantity;
                state.items[selectCartIndex].totalPrice = state.items[selectCartIndex].quantity * newItem.price;
            } else {
                state.items.push({
                    ...newItem,
                    quantity,
                    totalPrice: newItem.price * quantity,
                });
            }
        }
    }
})

export const { addItemToCart, removeItemFromCart, clearItemFromCart, addItemWithQuantity } = cartSlice.actions

export default cartSlice.reducer

// selector
export const selectCartItems = state => state.cart.items;
export const selectCartTotalItems = state => state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotalPrices = state => state.cart.items.reduce((total, item) => total + item.totalPrice, 0)

