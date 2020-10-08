// Models
const Product = require('../models/Product');
const Rating = require('../models/Rating');


// DotEnv 
require('dotenv').config();

// Other
const express = require('express');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

// Router Set Up
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(fileUpload());

// Parameters: None
// Usage: Find all the products saved in the MongoDB database
// Return: All the products
router.get('/all', async (_req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
});

// Parameters: None
// Usage: Sort all the products with newest products first
// Return: The sorted products with newest products first
router.get('/newArrivals', async (_req, res, next) => {
    try {
        const products = await Product.find();
        const newestArrivals = products.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        res.status(200).json(newestArrivals);
    } catch (err) {
        next(next);
    }
})

// Parameters: None
// Usage: Sort all the products with popular products first
// Return: The sorted products with popular products first
router.get('/popular', async (_req, res, next) => {
    try {
        const products = await Product.find();
        const popularProducts = products.sort(function (a, b) { return (b.rating - a.rating) });
        res.status(200).json(popularProducts);
    } catch (err) {
        next(err);
    }
})

// Parameters: A main category
// Usage: Find all products from the specified main category
// Return: All products from the specified main category
router.get('/getProductsByMainCategory/:type', async (req, res, next) => {
    try {
        const products = await Product.find({ 'mainCategory': req.params.type });
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
})

// Parameters: A secondary category
// Usage: Find all products from the specified secondary category
// Return: All products from the specified secondary category
router.get('/getProductsBySecondaryCategory/:type', async (req, res, next) => {
    try {
        const products = await Product.find({ 'secondaryCategory': req.params.type });
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
})

// Parameters: An object containing product
// Usage: Save the new product in the MongoDB database, uploads the product image to Cloudinary 
// Return: The saved product
router.post('/saveProduct', async (req, res, next) => {
    try {
        // Destructuring the product
        const { name, mainCategory, secondaryCategory, } = JSON.parse(req.body.product)

        // Creating a new product
        const newProduct = new Product({
            name,
            mainCategory,
            secondaryCategory,

        });

        const product = await newProduct.save();
        const file = req.files.file;
        file.mv(`${__dirname}/../static/images/${file.name}`);
        await cloudinary.uploader.upload(`${__dirname}/../static/images/${file.name}`, {
            public_id: product._id,
            unique_filename: false
        });
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
});

// Parameters: A product ID 
// Usage: Find the product with the specified id 
// Return: The product with the specified id 
router.get('/getProduct/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        next(err)
    }
});

// Parameters: A product ID 
// Usage: Delete the product with the specified id 
// Return: The deleted product
router.delete('/deleteProduct/:id', async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        product.details.ratings.forEach(async rating => {
            await Rating.findByIdAndRemove(rating);
        })
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
});

// Parameters: A string 
// Usage: Find all the products with the string pattern contained in the product's name 
// Return: All the products with the string pattern contained in the product's name 
router.get('/likeProduct/:searchText', async (req, res, next) => {
    try {
        const products = await Product.find({
            name: new RegExp(req.params.searchText, 'i')
        });
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
})

module.exports = router;