// Models
const Post = require('../models/Post');
const Community = require('../models/Community');

// Other
const express = require('express');
const mongoose = require('mongoose');

// Router Set Up
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Parameters: A community ID
// Usage: Search for all the community's posts
// Return: An array containing all the community's posts
router.get('/all/:communityId', async (req, res, next) => {
    try {
        const posts = await Post.find({ communityId: req.params.communityId });
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
})

// Parameters: A community ID and an object containing a post's details
// Usage: Save the post under the specified community
// Return: The saved post
router.post('/savePost/:communityId', async (req, res, next) => {
    try {
        const {
            title,
            text,
            originalPoster,
            communityId
        } = {
            title: req.body.title,
            text: req.body.text,
            originalPoster: mongoose.Types.ObjectId(req.body.userId),
            communityId: mongoose.Types.ObjectId(req.body.communityId)
        };

        const newPost = new Post({
            title, text, originalPoster, communityId
        })

        const post = await newPost.save();
        await Community.findOneAndUpdate({ _id: req.params.communityId }, { $push: { 'posts': new mongoose.Types.ObjectId(post._id) } });
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
});

// Parameters: A post ID
// Usage: Search for a single post with the specified id
// Return: The post with the specified id
router.get('/getPost/:postId', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
})

// Parameters: A post ID
// Usage: Delete a single post with the specified id
// Return: The deleted post
router.delete('/deletePost/:postId', async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId);
        await Community.findByIdAndUpdate(post.communityId, { $pull: { 'posts': post._id } });
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
})

// Parameters: A Post ID, User ID, Rating Type (Like/Dislike)
// Usage: Rate (like or dislike) a post
// Return: The post which the user rated
router.patch('/rate/:postId/:userId/:ratingType', async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.postId);
        switch (req.params.ratingType) {
            case 'like':
                // If the user already liked the post
                if (post.usersLiked.indexOf(req.params.userId) !== -1)
                    await post.updateOne({ $inc: { 'likes': -1 }, $pull: { 'usersLiked': mongoose.Types.ObjectId(req.params.userId) } });
                // If the user disliked the post before liking it
                else if (post.usersDisliked.indexOf(req.params.userId) !== -1)
                    await post.updateOne({ $inc: { 'likes': 2 }, $pull: { 'usersDisliked': mongoose.Types.ObjectId(req.params.userId) }, $push: { 'usersLiked': new mongoose.Types.ObjectId(req.params.userId) } });
                // If the user neither disliked or liked the post before
                else
                    await post.updateOne({ $inc: { 'likes': 1 }, $push: { 'usersLiked': mongoose.Types.ObjectId(req.params.userId) } });
                break;
            case 'disliked':
                // If the user already dislike the post
                if (post.usersDisliked.indexOf(req.params.userId) !== -1)
                    await post.updateOne({ $inc: { 'likes': 1 }, $pull: { 'usersDisliked': mongoose.Types.ObjectId(req.params.userId) } });
                // If the user liked the post before disliking it
                else if (post.usersLiked.indexOf(req.params.userId) !== -1)
                    await post.updateOne({ $inc: { 'likes': -2 }, $pull: { 'usersLiked': mongoose.Types.ObjectId(req.params.userId) }, $push: { 'usersDisliked': new mongoose.Types.ObjectId(req.params.userId) } });
                // If the user neither disliked or liked the post before
                else
                    await post.updateOne({ $inc: { 'likes': -1 }, $push: { 'usersDisliked': mongoose.Types.ObjectId(req.params.userId) } });
                break;
            default:
                break;
        }
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
});

module.exports = router;