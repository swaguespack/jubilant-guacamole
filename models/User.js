// Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// Import database connection from config.js
const sequelize = require('../config/connection');

// Import bcrypt
const bcrypt = require('bcrypt');

// Initialize User model by extending off Sequelize's Model class
class User extends Model {
  // Run on instance data to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    // Use Sequelize DataTypes object to provide data types/rules
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // Validates email attribute rule, returns promise if successul validation
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // Validates length attribute rule, returns promise if successul validation
      validate: {
        len: [8],
      },
    },
  },
  {
    // Hook functions (aka callbacks or lifecycle events) 
    // Called before calls in sequelize executed
    hooks:{
      async beforeCreate(newUserData){
      newUserData.password = await bcrypt.hash(newUserData.password,10)
      return newUserData
        },
      async beforeUpdate(updatedUserData) {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
        }
      },
    // Import sequelize connection instance (direct connection to database)
    sequelize,
    // Do not auto add timstamp attributes (created_at)
    timestamps: false,
    // Disable modification of table names
    freezeTableName: true,
    // Use underscores for casing
    underscored: true,
    // Model name stays lowercase
    modelName: 'user',
  }
);
// Tells Node.js which code to export
module.exports = User;
