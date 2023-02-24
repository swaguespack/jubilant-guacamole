const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// Get signup
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// Get login
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    loggedIn: req.session.logged_in,
  });
});

// Get all posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'created_at'
    ],
    include: [
      {
      model: User,
      attributes:['name']
    },
    { 
      model: Comment,
      attributes:[
        'id',
        'comment_text',
        'post_id',
        'user_id',
        'created_at'
      ],
      include: {
        model: User,
        attributes: ['name']
      }

    }
]
  }).then(dbPostData =>{
    const posts = dbPostData.map(post => post.get({plain:true}));
    res.render("homepage", { posts, loggedIn: req.session.logged_in});

  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

// Get one post by id
router.get('/post/:id', (req, res) => {
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
              },
              {
                  model: Comment,
                  attributes:[
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                  ],
                  include: {
                    model: User,
                    attributes: ['name']
                  }
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
          res.render('single-post', { post, loggedIn: req.session.loggedIn });


      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// Get comments on post
router.get('/posts-comments', (req, res) => {
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
          include: [{
                  model: Comment,
                  attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'],
                  include: {
                      model: User,
                      attributes: ['name']
                  }
              },
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

          res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;
