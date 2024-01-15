// Example filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        selectedFilter: 'Relevance', // Set your initial filter value here
    },
    reducers: {
        addFilter: (state, action) => {
            state.selectedFilter = action.payload;
        },
    },
});


export const { addFilter } = filterSlice.actions;
export const selectFilter = (state) => state.filter.selectedFilter;

export default filterSlice.reducer;
