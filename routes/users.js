// Models
const User = require('../models/User');
const Community = require('../models/Community');
const Post = require('../models/Post');
const Rating = require('../models/Rating');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Session = require('../models/Session');

// Other
const express = require('express');
const sgMail = require('@sendgrid/mail');
const cloudinary = require('cloudinary');
const bcrypt = require('bcryptjs');

// Router Set Up
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// SendGrid API Key Configuration
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Parameters: An object containing user details
// Usage: Save the user in the MongoDB Database, Send user verification email
// Return: The saved user
router.post('/saveUser', async (req, res, next) => {
  try {
    // Destructuring the user's details
    let { username, hash, email } = req.body;

    // Creating the new user
    const newUser = new User({
      username: username,
      hash: hash,
      email: email,
      isAdmin: false,
      isVerified: false
    })
    // Saves the user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    // If a user tries to sign up with the same username or email, duplicate index (username or email) error is sent back
    if (err.code === 11000) {
      let duplicateProperty = null;
      if ('username' in err.keyValue)
        duplicateProperty = 'username';
      else if ('email' in err.keyValue)
        duplicateProperty = 'email';
      res.status(200).json({
        error: 'duplicateIndex',
        property: duplicateProperty
      });
    } else {
      // Unhandled errors
      console.log(err);
      next(err);
    }
  }
})

// Parameters: A username
// Usage: Finds the user with the specified username
// Return: The user with the specified username. If no user is found, null is returned
router.get('/getUserByUsername/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
})

// Parameters: A username ID
// Usage: Finds the user with the specified username ID
// Return: The user with the specified username ID
router.get('/getUserById/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
})


// Parameters: A string 
// Usage: Find all the users with the string pattern contained in the user's name 
// Return: All the users with the string pattern contained in the user's name
router.get('/likeUser/:username', async (req, res, next) => {
  try {
    const users = await User.find({ username: new RegExp(req.params.username, 'i') });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
})

// Parameters: A username, verification State
// Usage: Toggle the user's email verification state
// Return: The user before the email verification toggle
router.patch('/toggleVerify/:username/:verifiedState', async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({ username: req.params.username }, { $set: { 'isVerified': req.params.verifiedState } });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
})

// Parameters: A username, administration State
// Usage: Toggle the user's administration state
// Return: The user before the administration toggle
router.patch('/toggleAdmin/:username/:adminState', async (req, res, next) => {
  try {
    const user = User.findOneAndUpdate({ username: req.params.username }, { $set: { 'isAdmin': req.params.adminState } });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
})

// Parameters: None
// Usage: Find all the users saved in the MongoDB database
// Return: All the users
router.get('/all', async (_req, res, next) => {
  try {
    const users = await User.find((err, users));
    res.status(200).json(users);
  } catch (err) {
    next(err)
  }
})

// Parameters: A user's ID 
// Usage: Delete the user with the specified id, along with all of the user's communities, orders, sessions, ratings & posts
// Return: The deleted user
router.delete('/deleteUser/:username', async (req, res, next) => {
  try {
    // Get User Info
    const user = await User.findOne({ username: req.params.username });
    // Finds all user's communities (owner)
    const userCommunities = await Community.find({ owner: user._id });
    userCommunities.forEach(async community => {
      // For each community deletes all the posts
      community.posts.forEach(async post => await Post.findByIdAndRemove(post, (err, _post)));
      // Deletes the community
      community.remove();
    })
    // Finds all communities which the user has joined and removes him from the members list
    await Community.updateMany({ membersList: { $in: user._id } }, { $pull: { membersList: user._id }, $inc: { numMembers: -1 } });
    // Finds all the user's posts
    const userPosts = await Post.find({ originalPoster: user._id });
    userPosts.forEach(async post => {
      // Each post is deleted from the community it was posted on (COMMUNITY DOESN'T HAVE TO BE OWNED BY THE USER)
      await Community.updateMany({ posts: { $in: post._id } }, { $pull: { posts: post._id } })
      // Each post is deleted
      await post.remove();
    });
    // Deletes all the user's orders
    await Order.deleteMany({ userId: user._id });
    // Finds all the user's ratings
    const userRatings = Rating.find({ originalPoster: user._id });
    // For each user rating, the related product is found, the rating is removed from the ratings array and the product's rating average is updated
    userRatings.forEach(async rating => {
      const product = await Product.findById(rating.productId);
      let newRating;
      if (product.details.ratings.length > 1)
        newRating = (parseFloat(product.details.rating.toJSON().$numberDecimal) * 2) - parseFloat(rating.rating.toJSON().$numberDecimal);
      else
        newRating = 0;
      await product.update({ $pull: { 'details.ratings': rating._id }, $set: { 'details.rating': newRating } });
      await rating.remove();
    })
    // Deletes the user's sessions
    await Session.deleteMany({ userId: user._id });
    // Deletes the user
    User.findByIdAndRemove(user._id)
  } catch (err) {
    next(err);
  }
})

module.exports = router;