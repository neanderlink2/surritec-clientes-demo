import { all } from 'redux-saga/effects';
import account from './account/sagas';
import cart from './cart/sagas';

export default function* rootSaga() {
    return yield all([
        account,
        cart
    ]);
}