const { User } = require('../models');

const userData = [
    {  
        name: 'Shellby',
        email: 'shellby@tech.com',
        password: 'Itsasecret'

    },
    {
        name: 'Patrick',
        email: 'patrick@tech.com',
        password: 'Itsasecret'
    },
    {
        name: 'Julie',
        email: 'julie@tech.com',
        password: 'Itsasecret'
    },
    {
        name: 'Tink',
        email: 'tink@tech.com',
        password: 'Itsasecret'
    },
    {
        name: 'Jordan',
        email: 'jordan@tech.com',
        password: 'Itsasecret'
    },

    
];

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks:true
});

module.exports = seedUsers;