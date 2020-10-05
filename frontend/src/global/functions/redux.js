// Redux Helper Functions

// Parameters: A single parameter indicating an items array
// Usage: Calculate the total price of an items array using each item's price and amount
// Return: Total price of an items array
export const calculateTotalPrice = (itemsArray) => itemsArray.reduce((accumulator, currentItem) => accumulator + (parseFloat(currentItem.price) * currentItem.amount), 0);