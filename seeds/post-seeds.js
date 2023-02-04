const { Post } = require('../models');

const postData = [
  {
    title: 'MVC',
    content: 'The M in MVC stands for Model which manages data and business logic.',
    user_id: 1
    
  },
  {
    title: 'Sequelize',
    content: 'Models are the essencce of Sequelize.',
    user_id: 2
  },
  {
    title: 'Helpers',
    content: 'Helpers can be used for transforming output, iterating over data, etc.',
    user_id: 3
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;