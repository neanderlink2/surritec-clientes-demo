import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLeading } from "redux-saga/effects";
import api, { formatError } from "../../../api";
import { CreateClienteActions } from "./actions/create";
import { RemoveClienteActions } from "./actions/remove";
import { UpdateClienteActions } from "./actions/update";
import { CreateClientePayload, RemoveClientePayload, UpdateClientePayload } from "./types";

function* criarCliente({ payload }: PayloadAction<CreateClientePayload>) {
    const { data, onSuccess, onFailed } = payload;
    try {
        const response = yield call(api.post, `/clientes`, data);
        yield put(CreateClienteActions.success(response.data));
        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (errors) {
        const allErrors = formatError(errors);
        yield put(CreateClienteActions.failed(allErrors));
        if (onFailed) {
            onFailed(allErrors);
        }
    }
}

function* editarCliente({ payload }: PayloadAction<UpdateClientePayload>) {
    const { idCliente, data, onSuccess, onFailed } = payload;
    try {
        const response = yield call(api.put, `/clientes/${idCliente}`, data);
        yield put(UpdateClienteActions.success(response.data));
        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (errors) {
        const allErrors = formatError(errors);
        yield put(UpdateClienteActions.failed(allErrors));
        if (onFailed) {
            onFailed(allErrors);
        }
    }
}

function* deletarCliente({ payload }: PayloadAction<RemoveClientePayload>) {
    const { idCliente, onSuccess, onFailed } = payload;
    try {
        yield call(api.delete, `/clientes/${idCliente}`);
        yield put(RemoveClienteActions.success({}));
        if (onSuccess) {
            onSuccess();
        }
    } catch (errors) {
        const allErrors = formatError(errors);
        yield put(RemoveClienteActions.failed(allErrors));
        if (onFailed) {
            onFailed(allErrors);
        }
    }
}


export default all([
    takeLeading(CreateClienteActions.request.type, criarCliente),
    takeLeading(UpdateClienteActions.request.type, editarCliente),
    takeLeading(RemoveClienteActions.request.type, deletarCliente)
]);