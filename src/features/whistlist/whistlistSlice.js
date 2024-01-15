import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    whistItems: [],
}

export const whistlistSlice = createSlice({
    name: "whistlist",
    initialState,
    reducers: {
        addItemToWhistlist: (state, action) => {
            const newItem = action.payload
            const selectWhistIndex = state.whistItems.findIndex(product => product.id === newItem.id)

            if (selectWhistIndex !== -1) {
                state.whistItems.splice(selectWhistIndex, 1);

            } else {
                state.whistItems.push({
                    ...newItem,
                    qty: 1,
                })
            }
        },
        removeItemFromWhistlist: (state, action) => {
            const newItem = action.payload
            const selectWhistIndex = state.whistItems.findIndex(product => product.id === newItem.id)

            state.whistItems.splice(selectWhistIndex, 1);
        }
    }
})

export const { addItemToWhistlist, removeItemFromWhistlist } = whistlistSlice.actions

export default whistlistSlice.reducer

// selector
export const selectWhistItems = state => state.whistlist.whistItems;
export const selectWhistTotalItems = state => state.whistlist.whistItems.reduce((total, item) => total + item.qty, 0)

