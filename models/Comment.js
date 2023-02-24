// Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// Import database connection from config.js
const sequelize = require('../config/connection');

// Initialize Comment model by extending off Sequelize's Model class
class Comment extends Model {}
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.STRING,
        validate: {
            len: [3]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id'
        }
    }
}, {
    // Import sequelize connection instance (direct connection to database)
    sequelize,
    // Disable modification of table names
    freezeTableName: true,
    // Use underscores for casing
    underscored: true,
    // Model name stays lowercase
    modelName: 'comment'
});
module.exports = Comment;