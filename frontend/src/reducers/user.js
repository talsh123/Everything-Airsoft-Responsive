// Actions
import { SET_USER } from '../actions/index';

// When invoked, setUserReducer updates user state to the current logged user
// On default, it returns the current state
const userReducer = (state = {
    id: '123',
    username: '123',
    address: '123',
    hash: '123',
    email: '123',
    isAdmin: false,
    isVerified: false,
}, action) => {
    switch (action.type) {
        case SET_USER:
            state = {
                userId: action.payload.userId,
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