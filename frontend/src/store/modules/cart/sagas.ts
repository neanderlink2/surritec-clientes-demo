import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLeading } from 'redux-saga/effects';
import api, { formatError } from '../../../api';
import { SaveCartActions } from './actions/save';
import { SaveCartPayload } from './types';

function* saveCart({ payload }: PayloadAction<SaveCartPayload>) {
    const { data, onSuccess, onFailed } = payload;
    try {
        const carrinho = data.produtosDesejados.map((desejo) => ({
            produto_id: desejo.produto.id,
            quantidade: desejo.quantidade
        }));
        const total = data.produtosDesejados.reduce((prev, desejo) => prev + parseFloat(desejo.produto.price) * desejo.quantidade, 0);

        const response = yield call(api.post, `/pedidos/`, { carrinho, total });
        yield put(SaveCartActions.success(response.data));
        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (errors) {
        const allErrors = formatError(errors);
        yield put(SaveCartActions.failed(allErrors));
        if (onFailed) {
            onFailed(allErrors);
        }
    }
}

export default all([
    takeLeading(SaveCartActions.request.type, saveCart)
]);