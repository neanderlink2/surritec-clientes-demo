import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SaveCartPayload } from '../types';

const saveCartSlice = createSlice({
    name: 'cart/save',
    initialState: {
        isRequesting: false,
        successPayload: undefined,
        errors: [],
    },
    reducers: {
        request: (state, action: PayloadAction<SaveCartPayload>) => {
            state.isRequesting = true;
        },
        success: (state, action) => {
            state.isRequesting = false;
            state.successPayload = action.payload;
            state.errors = [];
        },
        failed: (state, action) => {
            state.isRequesting = false;
            state.successPayload = undefined;
            state.errors = action.payload;
        },
    },
});

export const SaveCartActions = saveCartSlice.actions;
export default saveCartSlice.reducer;
