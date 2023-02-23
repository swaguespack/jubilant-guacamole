const seedUsers = require('./users-seeds');

const sequelize = require('../config/connection');

const plantSeeds = async () => {
    try{ 

    
        await sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');

        await seedUsers();
        console.log('\n----- USERS SEEDED -----\n');

        process.exit(0);
    } catch(err){
        console.log(err)
    }

};

plantSeeds();