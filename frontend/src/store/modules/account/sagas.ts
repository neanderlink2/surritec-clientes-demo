import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../api';
import { LoginActions } from './actions/tryLogin';
import { TryLoginPayload } from './types';

function* tryLogin({ payload }: PayloadAction<TryLoginPayload>) {
    const { login, password, onSuccess, onFailed } = payload;
    try {
        const response = yield call(api.post, `/auth/signin`, { nomeUsuario: login, senha: password });
        yield put(LoginActions.success(response.data));
        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (errors) {
        ///const allErrors = formatError(errors);        
        const axiosError = errors as AxiosError;
        if (axiosError && axiosError.response?.status === 400) {
            toast.error("O usuário ou senha estão incorretos.");            
        }
        yield put(LoginActions.failed({}));
        if (onFailed) {
            onFailed();
        }
    }
}

export default all([
    takeLatest(LoginActions.request.type, tryLogin)
]);