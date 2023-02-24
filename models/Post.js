// Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// Import database connection from config.js
const sequelize = require('../config/connection');

// Initialize Post model by extending off Sequelize's Model class
class Post extends Model {}

Post.init(
    {
    // Use Sequelize DataTypes object to provide data types/rules
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
     // Import sequelize connection instance (direct connection to database)
      sequelize,
    // Disable modification of table names
      freezeTableName: true,
      // Use underscores for casing
      underscored: true,
      // Model name stays lowercase
      modelName: 'post'
    }
  );
  // Tells Node.js which code to export
  module.exports = Post;