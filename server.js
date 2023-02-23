// Dependencies
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");

const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");

// Create a new sequelize store using the express-session package
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;


(async () => {
  // Set up Handlebars.js engine with custom helpers
  const hbs = exphbs.create({ helpers });

  const sess = {
    secret: process.env.DB_SESSION_SECRET,
    cookie: {
      maxAge: 300000,
      httpsOnly: true,
      secure: false,
      sameSite: "strict",
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

  // Add express-session and store as Express.js middleware
  app.use(session(sess));

  // Set Handlebars as the default template engine
  app.set("views", path.join(__dirname, "views"));
  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Middleware 
  app.use(express.static(path.join(__dirname, "public")));

  // Use routes
  app.use(routes);

  // Starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening on PORT " + PORT));
});
})();