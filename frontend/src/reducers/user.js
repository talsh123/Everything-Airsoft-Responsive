// Actions
import { SET_USER } from '../actions/index';

// When invoked, setUserReducer updates user state to the current logged user
// On default, it returns the current state
const userReducer = (state = {
    _id: undefined,
    username: undefined,
    hash: undefined,
    email: undefined,
    isVerified: false,
    isAdmin: false,
}, action) => {
    switch (action.type) {
        case SET_USER:
            state = {
                _id: action.payload._id,
                username: action.payload.username,
                hash: action.payload.hash,
                email: action.payload.email,
                isVerified: action.payload.isVerified,
                isAdmin: action.payload.isAdmin
            };
            return state;
        default:
            return state;
    }
}

export default userReducer;