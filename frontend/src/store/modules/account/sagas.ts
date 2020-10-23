import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import api, { formatError } from '../../../api';
import { RegisterActions } from './actions/register';
import { LoginActions } from './actions/tryLogin';
import { RegisterPayload, TryLoginPayload } from './types';

function* tryLogin({ payload }: PayloadAction<TryLoginPayload>) {
    const { login, password, onSuccess, onFailed } = payload;
    try {
        const response = yield call(api.post, `/auth/token/login`, { email: login, password });
        yield put(LoginActions.success(response.data));
        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (errors) {
        const allErrors = formatError(errors);
        yield put(LoginActions.failed(allErrors));
        if (onFailed) {
            onFailed(allErrors);
        }
    }
}

function* register({ payload }: PayloadAction<RegisterPayload>) {
    const { data, onSuccess, onFailed } = payload;
    try {
        const response = yield call(api.post, `/auth/users/`, data);
        yield put(RegisterActions.success(response.data));
        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (errors) {
        const allErrors = formatError(errors);
        yield put(RegisterActions.failed(allErrors));
        if (onFailed) {
            onFailed(allErrors);
        }
    }
}

export default all([
    takeLatest(LoginActions.request.type, tryLogin),
    takeLatest(RegisterActions.request.type, register)
]);