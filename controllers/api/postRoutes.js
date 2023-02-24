// Imports express' router object
const router = require("express").Router();
// Imports user, post, and comment model to use with our routes
const { User, Post, Comment } = require("../../models");

const withAuth = require("../../utils/auth");

// Find all posts for /api/posts
router.get('/', (req, res) => {
  Post.findAll({
          attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        order: [
            ['created_at', 'DESC']
        ],
        include: [{
            model: User,
            attributes: ['name']
        },
        {
            model: Comment,
            attributes: [
                'id',
                'comment_text',
                'post_id',
                'user_id',
                'created_at'
            ],
            include:{
                model: User,
                attributes: ['name']
            }

        }]
      })
      .then(dbPostData => res.json(dbPostData.reverse()))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// Find  post data by id for /api/posts
router.get('/:id', (req, res) => {
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
            model:User,
            attributes:['name']
        },
        {
            model: Comment,
            attributes: [
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

        }]
      }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// Create post
router.post('/', withAuth, (req, res) => {
    Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Edit post
router.put('/:id', withAuth, (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        }).then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;
