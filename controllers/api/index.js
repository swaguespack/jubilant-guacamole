// Imports express' router object
const router = require('express').Router();

// Import route files within api folder
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes.js');

// Directs route variable based on what comes from front end javascript or user
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
