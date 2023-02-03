//import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//Create associations

//User has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//Post belongsTo User
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

//Comment belongs to user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

//Comment belongs to post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

//User has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

//Post has many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "cascade"
})

module.exports = { 
    User, 
    Post, 
    Comment 
};