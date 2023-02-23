// Imports express' router object
const router = require("express").Router();

// Points to index.js within the api folder
const apiRoutes = require("./api");

// Import homeRoutes
const homeRoutes = require("./homeRoutes");

// Directs route variable based on what comes from front end javascript or user
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
