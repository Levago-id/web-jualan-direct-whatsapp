import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    detailItems: [],
}

export const detailSlice = createSlice({
    name: "detail",
    initialState,
    reducers: {
        addItemToDetail: (state, action) => {
            const newItem = action.payload
            const selectDetailIndex = state.detailItems.findIndex(product => product.id === newItem.id)

            if (selectDetailIndex !== -1) {
                state.detailItems.splice(selectDetailIndex, 1);

            } else {
                state.detailItems.push({
                    ...newItem
                })
            }
        },

    }
})

export const { addItemToDetail, removeItemFromDetail } = detailSlice.actions

export default detailSlice.reducer

// selector
export const selectDetailItems = state => state.detail.detailItems;

