import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RemoveClientePayload } from '../types';

const slice = createSlice({
    name: 'clientes/remove',
    initialState: {
        isRequesting: false,
        successPayload: undefined,
        errors: [],
    },
    reducers: {
        request: (state, action: PayloadAction<RemoveClientePayload>) => {
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

export const RemoveClienteActions = slice.actions;
export default slice.reducer;