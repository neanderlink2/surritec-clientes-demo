import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateClientePayload } from '../types';

const slice = createSlice({
    name: 'clientes/update',
    initialState: {
        isRequesting: false,
        successPayload: undefined,
        errors: [],
    },
    reducers: {
        request: (state, action: PayloadAction<UpdateClientePayload>) => {
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

export const UpdateClienteActions = slice.actions;
export default slice.reducer;