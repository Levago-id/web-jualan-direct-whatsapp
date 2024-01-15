import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cart/cartSlice'
import whistlistSlice from './features/whistlist/whistlistSlice'
import filterSlice from './features/filter/filterSlice'

export default configureStore({
    reducer: {
        cart: cartSlice,
        whistlist: whistlistSlice,
        filter: filterSlice
    }
})