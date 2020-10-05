// Reducers
import userReducer from './user';
import itemsReducer from './items';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    user: userReducer,
    items: itemsReducer
});

export default allReducers;