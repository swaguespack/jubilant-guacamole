const { User } = require('../models');

const userData = [
    {  
        name: 'Shellby',
        email: 'shellby@tech.com',
        password: 'Itsasecret'

    },
    {
        name: 'Test',
        email: 'test@tech.com',
        password: 'Itsasecret'
    },

    
];

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks:true
});

module.exports = seedUsers;