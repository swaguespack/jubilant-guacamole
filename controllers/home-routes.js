const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

//get all hompage posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'user_id',
                    'post_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })

    //pass post into homepage template
            .then(dbPostData => {
                const posts = dbPostData.map(post => post.get({plain:true}));

                res.render('homepage', {
                    posts,
                    loggedIn: req.session.loggedIn,
                    username: req.session.username
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
})

//redirect users to homepage once logged in
    router.get('/login', (req, res) => {
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
        }

        res.render('login');
    });

//get one post to single-post page
    router.get('/post/:id', (req, res) => {
        Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at',
            ],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'user_id',
                        'post_id',
                        'created_at'
                    ],
                    indclude:{
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })

        .then(dbPostData => {
            if(!dbPostData){
                res.status(404).json({ message: 'No post found for this id'});
                return;
            }
            
            const post = dbPostData.get({ plain: true })

//pass data to template
            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn,
                username: req.session.username
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    });

    module.exports = router;
