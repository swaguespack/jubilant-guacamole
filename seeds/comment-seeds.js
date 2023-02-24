const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "It's not often that beauty and genius come in such a nice package.",
        user_id: 2,
        post_id: 3,
        
    },
    {
        comment_text: "I'll have to try this!",
        user_id: 2,
        post_id: 5,
        
    },
    {
        comment_text: "I'm going to check this out.",
        user_id: 4,
        post_id: 1,
        
    },
    {
        comment_text: "I use this all the time!",
        user_id: 3,
        post_id: 5,
        
    },
    {
        comment_text: "I love that Leaflet is open-source <3",
        user_id: 3,
        post_id: 4,
        
    },
    {
        comment_text: "MVC is the MVP.",
        user_id: 2,
        post_id: 1,
        
    },
    {
        comment_text: "Insomnia is great!",
        user_id: 5,
        post_id: 3,
        
    },
    {
        comment_text: "Awesome! I'd like to learn more about utilizing this.",
        user_id: 2,
        post_id: 1,
        
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;