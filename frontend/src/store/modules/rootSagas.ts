import { all } from 'redux-saga/effects';
import account from './account/sagas';
import clientes from './clientes/sagas';

export default function* rootSaga() {
    return yield all([
        account,
        clientes
    ]);
}