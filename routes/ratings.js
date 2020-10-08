// Models
const Rating = require('../models/Rating');
const Product = require('../models/Product');

// Other
const express = require('express');
const mongoose = require('mongoose');

// Router Set Up
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Parameters: Rating ID
// Usage: Search for a single rating with the specified id
// Return: The rating with the specified id
router.get('/getRating/:ratingId', async (req, res, next) => {
    try {
        const rating = await Rating.findById(req.params.ratingId);
        res.status(200).json(rating);
    }
    catch (err) {
        next(err);
    }
});

// Parameters: An object containing rating details
// Usage: Save the rating in the MongoDB database and update the product's rating average
// Return: The saved rating
router.post('/saveRating', async (req, res, next) => {
    try {
        // Destructuring the rating details
        const { title, text, originalPoster, rating, productId } = {
            title: req.body.title,
            text: req.body.text,
            originalPoster: mongoose.Types.ObjectId(req.body.originalPoster),
            rating: req.body.rating,
            productId: mongoose.Types.ObjectId(req.body.productId)
        };
        // Creating a new Rating object
        const newRating = new Rating({
            title,
            text,
            originalPoster,
            rating,
            productId
        })
        // Saving the new rating object
        const savedRating = await newRating.save();
        const product = await Product.findById(savedRating.productId);
        let updatedProductRating = parseFloat(savedRating.rating.toJSON().$numberDecimal);
        if (product.details.ratings.length > 0)
            updatedProductRating = (parseFloat(product.details.rating.toJSON().$numberDecimal) + parseFloat(savedRating.rating.toJSON().$numberDecimal)) / 2;
        await product.updateOne({ $push: { 'details.ratings': new mongoose.Types.ObjectId(savedRating._id) }, $set: { 'details.rating': updatedProductRating } });
        res.status(200).json(savedRating);
    } catch (err) {
        next(err);
    }
});

// Parameters: Rating ID
// Usage: Delete the rating in the MongoDB database and update the product's rating average
// Return: The deleted rating
router.delete('/deleteRating/:ratingId', async (req, res, next) => {
    try {
        const rating = await Rating.findByIdAndDelete(req.params.ratingId);
        const product = await Product.findById(rating.productId);
        let newRating;
        if (product.details.ratings.length > 1)
            newRating = (parseFloat(product.details.rating.toJSON().$numberDecimal) * 2) - parseFloat(rating.rating.toJSON().$numberDecimal);
        else
            newRating = 0;
        await product.updateOne({ $pull: { 'details.ratings': mongoose.Types.ObjectId(rating._id) }, $set: { 'details.rating': newRating } });
        res.status(200).json(rating);
    } catch (err) {
        next(err);
    }
})

module.exports = router;