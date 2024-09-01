// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    res.redirect('/');
  };
  


export default isAuthenticated;
