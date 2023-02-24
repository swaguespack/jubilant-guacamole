const { Post } = require('../models');

const postData = [
    {
        title: "MVC",
        content: "Model–view–controller is a software architectural pattern commonly used for developing user interfaces that divide the related program logic into three interconnected elements.",
        user_id: 1
    },
    {
        title: "bulma",
        content: "Bulma is a CSS framework that can be considered environment agnostic: it's just the style layer on top of the logic.",
        user_id: 3
    },
    {
        title: "Insomnia",
        content: "Insomnia is an open source desktop application that takes the pain out of interacting with and designing, debugging, and testing APIs.",
        user_id: 2

    },
    {
        title: "Leaflet",
        content: "Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps.",
        user_id: 5
    },
    {
        title: "express.Router",
        content: "Use the express.Router class to create modular, mountable route handlers.",
        user_id: 3
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;