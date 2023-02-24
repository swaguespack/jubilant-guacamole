// Redirect user request through login route if not logged in
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  