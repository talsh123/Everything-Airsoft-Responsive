// Reducers
import userReducer from './user';
import itemsReducer from './items';
import { combineReducers } from 'redux';

// Combine Reducers
const allReducers = combineReducers({
    user: userReducer,
    items: itemsReducer
});

export default allReducers;