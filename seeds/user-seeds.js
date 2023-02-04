const { User } = require('../models');

const userData = [{
        username: 'Judewag',
        password: 'Planet-0'

    },
    {
        username: 'Theodore',
        password: 'Ador4ble'
    },
    {
        username: 'Mellowman',
        password: 'Pikachu-8'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;