// Models
const Order = require('../models/Order');

// Other
const express = require('express');
const mongoose = require('mongoose')

// Router Set Up
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Parameters: A user ID
// Usage: Searches for all the user's orders
// Return: An array with all the user's orders
router.get('/all/:userId', async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
})

// Parameters: An Order ID
// Usage: Searches for the specified order
// Return: A single order with the same specified orderId
router.get('/getOrder/:orderId', async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId)
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
})

// Parameters: An object containing order details
// Usage: Save the order in the MongoDB database
// Return: The saved order
router.post('/saveOrder', async (req, res, next) => {
    try {
        const { userId, totalPrice, items } = req.body;
        const newOrder = new Order({
            userId, totalPrice, items
        });
        const order = await newOrder.save();
        res.status(200).json(order)
    } catch (err) {
        next(err);
    }
})

// Parameters: Product ID, User ID
// Usage: Check if the given user purchased at any point the specified product
// Return: True if the user purchased the product, otherwise False
router.get('/checkIfPurchased/:productId/:userId', async (req, res, next) => {
    try {
        const boolean = await Order.exists({ userId: req.params.userId, items: { $in: [{ amount: { $gt: 0 } }] } })
        res.status(200).json(boolean);
    } catch (err) {
        next(err);
    }
})

module.exports = router;