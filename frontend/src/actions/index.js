// Action Types
export const ADD_ITEMS = 'ADD_ITEMS';
export const UPDATE_ITEMS_AMOUNT = 'UPDATE_ITEMS_AMOUNT';
export const REMOVE_ITEMS = 'REMOVE_ITEMS';
export const SET_USER = 'SET_USER';

// Action Creators 
export const addItems = items => {
    return {
        type: ADD_ITEMS,
        payload: items
    }
}

export const updateItemsAmount = amount => {
    return {
        type: UPDATE_ITEMS_AMOUNT,
        payload: amount
    }
}

export const removeItems = items => {
    return {
        type: REMOVE_ITEMS,
        payload: items
    }
}

export const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    }
}