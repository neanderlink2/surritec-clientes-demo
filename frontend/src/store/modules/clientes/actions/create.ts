import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateClientePayload } from '../types';

const slice = createSlice({
    name: 'clientes/create',
    initialState: {
        isRequesting: false,
        successPayload: undefined,
        errors: [],
    },
    reducers: {
        request: (state, action: PayloadAction<CreateClientePayload>) => {
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

export const CreateClienteActions = slice.actions;
export default slice.reducer;