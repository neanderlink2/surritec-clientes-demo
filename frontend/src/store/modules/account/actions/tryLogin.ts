import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TryLoginPayload } from '../types';

const tryLoginSlice = createSlice({
    name: 'account/login',
    initialState: {
        isRequesting: false,
        successPayload: undefined,
        errors: [],
    },
    reducers: {
        request: (state, action: PayloadAction<TryLoginPayload>) => {
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

export const LoginActions = tryLoginSlice.actions;
export default tryLoginSlice.reducer;
