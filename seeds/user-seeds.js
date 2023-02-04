const { User } = require('../models');

const userData = [{
        username: 'Judewag',
        password: 'Planet00'

    },
    {
        username: 'Theodore',
        password: 'Ador4ble'
    },
    {
        username: 'Mellowman',
        password: 'Pikachu88'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;