import { combineReducers } from "redux";
import register from './actions/register';
import tryLogin from './actions/tryLogin';

export default combineReducers({
    login: tryLogin,
    register
});