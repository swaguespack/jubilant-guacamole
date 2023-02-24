const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

// Get all posts
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
        user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'content',
      'created_at'
    ],
    include: [{
      model: User,
      attributes:['name']
    }]
  }).then(dbPostData =>{
    const posts = dbPostData.map(post => post.get({plain:true}));
    res.render("dashboard", { posts, loggedIn: true});

  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

// Get one post by id to edit
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
              'id',
              'content',
              'title',
              'created_at'
          ],
          include: [
              {
                  model: User,
                  attributes: ['name']
              }
          ]
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          const post = dbPostData.get({ plain: true });
          console.log(post);
          res.render('edit-post', { post, loggedIn: true });


      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// Get new post
router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;
