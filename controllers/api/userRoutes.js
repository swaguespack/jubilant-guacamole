// Imports express' router object
const router = require("express").Router();
// Imports user model to use with our routes
const { User } = require("../../models");

// Find all users data besides password for /api/users
router.get('/', (req, res) => {
  User.findAll({
          attributes: { exclude: ['[password'] }
      })
      .then(userData => res.json(userData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// Find  user data by user id (besides password) for /api/users
router.get('/:id', (req, res) => {
  User.findOne({
          attributes: { exclude: ['[password'] },
          where:{
            id: req.params.id
          }
      })
      res.status(200).json(userData)
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// When user signs up, create username and password request
// for user data, log them into their session
router.post('/', (req, res) => {

  User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
  })

  .then(userData => {
          req.session.save(() => {
              req.session.user_id = userData.id;
              req.session.name = userData.name;
              req.session.logged_in = true;

              res.json(userData);
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// When user clicks login button, find their corresponding name
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });

    if (!userData) {
      // If there is no name with that data - 404 bad request
      res.status(400).json({ message: "No user with that name!" });
      return;
    }
    // If name exists, compare password to stored bcrypted password
    const validPassword = await userData.checkPassword(req.body.password);
    // If password is incorrect - 400
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect Password!",
      });
      return;
    }
    // If no error, save session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
      // 500 - Internal Server Error
      console.log(err);
      res.status(500).json(err);
  }
});

// When user clicks logout, frontend script triggers to destroy sessions
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
      req.session.destroy(() => {
          // 204 - No Content success status
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});

module.exports = router;
