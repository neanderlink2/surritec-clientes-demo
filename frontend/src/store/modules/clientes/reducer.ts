import { combineReducers } from "redux";
import create from './actions/create';
import remove from './actions/remove';
import update from './actions/update';


export default combineReducers({
    create,
    remove,
    update,
});