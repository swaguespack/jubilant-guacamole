//import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

//import our database connection from config.js
const sequelize = require('../config/connection');

//import bcrypt
const bcrypt = require('bcrypt');

//initialize User model by extending off Sequelize's Model class
class User extends Model {
//function to check password
    checkPassword(loginPW){
        return bcrypt.compareSync(loginPW, this.password);
    }
}

//set up fields and rules for User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
// Hook functions called before calls in sequelize executed
   hooks: {
        beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
        beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
        }

    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
    
);

module.exports = User;