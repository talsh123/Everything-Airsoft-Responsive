// Other
const express = require('express');
const sgMail = require('@sendgrid/mail');

// Router Set Up
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// SendGrid API Key Configuration
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// Parameters: An object containing email information
// Usage: Sends an email to both the sender and the recipient
// Return: Success if both of the emails were sent successfully, otherwise an error
router.post('/contact', async (req, res, next) => {
    try {
        // Destructuring the email information
        let { firstName, lastName, email, subject, body } = req.body;

        // Send email to recipient 
        const msg = {
            to: email,
            from: 'talshalom900@gmail.com',
            subject: 'Thank You For Contacting Us!',
            html: "<p>Thank you for using our contacting system.</p><p>We'll get back to you as soon as possible!</p>"
        };
        await sgMail.send(msg);

        // Send email to business
        let receivedMessage = {
            to: 'talshalom900@gmail.com',
            from: email,
            subject: subject
        }
        const success = await sgMail.send(receivedMessage);

        res.status(200).json(success)
    } catch (err) {
        next(err);
    }
})

module.exports = router;