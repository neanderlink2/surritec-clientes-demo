import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'searchbar/search',
    initialState: {
        term: ''
    },
    reducers: {
        save: (state, action: PayloadAction<string>) => {
            state.term = action.payload;
        }
    },
});

export const SearchbarActions = searchSlice.actions;
export default searchSlice.reducer;
