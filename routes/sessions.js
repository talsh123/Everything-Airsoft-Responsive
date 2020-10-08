// Models
const Session = require('../models/Session');

// Other
const express = require('express');

// Router Set Up
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Parameters: Session ID and User IP
// Usage: Find a single session with the specified session ID and user IP
// Return: The session with the specified session ID and user IP
router.get('/getSession/:sessionId/:userIP', async (req, res, next) => {
    try {
        const session = await Session.findOne({ _id: req.params.sessionId, userIP: req.params.userIP });
        res.status(200).json(session);
    } catch (err) {
        next(err);
    }
})

// Parameters: An object containing session details
// Usage: Save the session in the MongoDB database
// Return: The saved session
router.post('/saveSession', async (req, res, next) => {
    try {
        const { userIP, userId } = req.body;
        const newSession = new Session({
            userIP,
            userId
        });
        const session = await newSession.save();
        res.status(200).json(session);
    } catch (err) {
        next(err);
    }
})

module.exports = router;