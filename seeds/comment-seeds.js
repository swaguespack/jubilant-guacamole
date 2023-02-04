const { Comment } = require('../models');

const commentData = [{
        comment_text: "Interesting!",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "How is this possible?",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "Neat.",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;