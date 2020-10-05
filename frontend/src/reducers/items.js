// Actions
import { ADD_ITEMS, REMOVE_ITEMS, UPDATE_ITEMS_AMOUNT } from '../actions/index';

// Helper Functions
import { calculateTotalPrice } from '../global/functions/redux';

// On ADD_ITEMS:
// itemReducer adds the new products to the items array and recalculates the totalPrice
// On REMOVE_ITEMS:
// itemReducer removes the given products(action.payload) from the items array and recalculates totalPrice
// On UPDATE_ITEMS_AMOUNT:
// itemReducer updates the amount of a given products(action.payload) from the items array and recalculates totalPrice
const itemsReducer = (state = {
    totalPrice: 0,
    items: []
}, action) => {
    let totalPrice = state.totalPrice;
    let tempItems = state.items.slice();
    let isExist = false;
    switch (action.type) {
        case ADD_ITEMS:
            action.payload.forEach(itemToAdd => {
                isExist = tempItems.findIndex(item => item._id === itemToAdd._id);
                if (isExist === -1) {
                    tempItems.push({
                        _id: itemToAdd._id,
                        name: itemToAdd.name,
                        price: itemToAdd.price,
                        amount: itemToAdd.amount
                    })
                } else {
                    tempItems[isExist].amount += 1;
                }
            })
            totalPrice = calculateTotalPrice(tempItems);
            return {
                totalPrice,
                items: tempItems
            };
        case REMOVE_ITEMS:
            action.payload.forEach(itemToRemove => {
                isExist = tempItems.findIndex(item => item._id === itemToRemove._id);
                if (isExist !== -1)
                    tempItems.splice(isExist, 1);
            })
            totalPrice = calculateTotalPrice(tempItems);
            return {
                totalPrice,
                items: tempItems
            };
        case UPDATE_ITEMS_AMOUNT:
            action.payload.forEach(itemToUpdate => {
                isExist = tempItems.findIndex(item => item._id === itemToUpdate._id);
                if (isExist !== -1)
                    tempItems[isExist].amount = itemToUpdate.amount;
            })
            totalPrice = calculateTotalPrice(tempItems);
            return {
                totalPrice,
                items: tempItems
            };
        default:
            return state;
    }
}
export default itemsReducer;