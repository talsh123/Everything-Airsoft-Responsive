// Models
const Community = require('../models/Community');

// DotEnv
require('dotenv').config();

// Other
const express = require('express');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

// Router Set Up
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(fileUpload());

// Parameters: None
// Usage: Find all communities
// Return: An array containing all communities if no error occurs  
router.get('/all', async (_req, res, next) => {
    try {
        const communities = await Community.find({});
        res.status(200).json(communities);
    } catch (err) {
        return next(err);
    }
});

// Parameters: Community ID
// Usage: Find the community with the given id
// Return: The community with the given id if no error occurs
router.get('/getCommunity/:communityId', async (req, res, next) => {
    try {
        const community = await Community.findById(req.params.communityId);
        res.status(200).json(community);
    } catch (err) {
        next(err);
    }
});

// Parameters: Community ID, User ID
// Usage: Save the given user as a member of the given community
// Return: The given community before action 
router.patch('/joinCommunity/:communityId/:userId', async (req, res, next) => {
    try {
        const community = await Community.findOneAndUpdate({ _id: req.params.communityId, membersList: { $nin: [new mongoose.Types.ObjectId(req.params.userId)] } }, { $inc: { 'numMembers': 1 }, $push: { 'membersList': new mongoose.Types.ObjectId(req.params.userId) } });
        res.status(200).json(community);
    } catch (err) {
        next(err);
    }
});

// Parameters: Community ID, User ID
// Usage: Delete the given user from the given community
// Return: The given community before action
router.patch('/leaveCommunity/:communityId/:userId', async (req, res, next) => {
    try {
        const community = await Community.findOneAndUpdate({ _id: req.params.communityId, membersList: { $in: [new mongoose.Types.ObjectId(req.params.userId)] } }, { $inc: { 'numMembers': -1 }, $pull: { 'membersList': new mongoose.Types.ObjectId(req.params.userId) } });
        res.status(200).json(community);
    } catch (err) {
        next(err);
    }
})

// Parameters: Community ID, User ID
// Usage: Check if the user is a member of the community 
// Return: True if the user is a member, otherwise False.
router.get('/isMember/:communityId/:userId', async (req, res, next) => {
    try {
        const boolean = await Community.exists({ _id: req.params.communityId, membersList: { $in: [new mongoose.Types.ObjectId(req.params.userId)] } });
        res.status(200).json(boolean);
    } catch (err) {
        next(err);
    }
})

// Parameters: Community ID, User ID
// Usage: Check if the user is a community's owner 
// Return: True if the user is the owner, otherwise False.
router.get('/isOwner/:communityId/:userId', async (req, res, next) => {
    try {
        const boolean = await Community.exists({ _id: req.params.communityId, owner: new mongoose.Types.ObjectId(req.params.userId) });
        res.status(200).json(boolean);
    } catch (err) {
        next(err);
    }
})

// Parameters: An object containing a community's name, description and the id of the owner user
// A file parameter containing the communities logo is also given
// Usage: Saves the community as a new community, upload the image to the Cloudinary database
// Return: True if the user is the owner, otherwise False
router.post('/saveCommunity', async (req, res, next) => {
    try {
        // Destructuring the community details
        const { name, description, owner } = JSON.parse(req.body.community);

        // Creates the new community
        const newCommunity = new Community({
            name,
            description,
            owner
        });

        // Saves the new community, saves the community's logo locally and uploads the image to the Cloudinary database
        const community = await newCommunity.save();
        const file = req.files.file;
        file.mv(`${__dirname}/../global/images/${file.name}`);
        const result = await cloudinary.uploader.upload(`${__dirname}/../static/images/${file.name}`, {
            public_id: community._id,
            unique_filename: false
        });
        res.status(200).json(result)
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;