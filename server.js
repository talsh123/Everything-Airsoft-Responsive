// Models
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const contactRouter = require('./routes/contact');
const communitiesRouter = require('./routes/communities');
const postsRouter = require('./routes/posts');
const ratingsRouter = require('./routes/ratings');
const sessionsRouter = require('./routes/sessions');

// Other
const express = require('express');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const cloudinary = require('cloudinary');

// Environment Set Up
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Cloudinary Upload Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Express & Router Set Up
const app = express();
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/contact', contactRouter);
app.use('/communities', communitiesRouter);
app.use('/posts', postsRouter);
app.use('/ratings', ratingsRouter);
app.use('/sessions', sessionsRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection String
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, () => {
    console.log('Connection to MongoDB Atlas database has been established...');
})

// Back End Server Port
const port = process.env.PORT || 5000;

// Server Initialization & Deployment
https.createServer({
    key: fs.readFileSync('.server.key'),
    cert: fs.readFileSync('.server.cert')
}, app).listen(port, () => console.log(`Express server running on port ${port}`));