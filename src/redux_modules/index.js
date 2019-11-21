import { combineReducers, connect } from 'redux';
import author from './auth';
import board from './board';

const rootReducer = combineReducers({
    author,
    board
});


export default rootReducer;