const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user_id) {
      return next(); 
    }
    return res.redirect("/login"); 
  };

  const redirectIfAuthenticated = (req, res, next) => {
    if (req.session && req.session.user_id) {
      return res.redirect("/dashboard"); 
    }
    next();
  };
    
  module.exports = { isAuthenticated , redirectIfAuthenticated };
  