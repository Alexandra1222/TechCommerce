const isUser = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/auth/login');
  }

  next();
};

const isAdmin = (req, res, next) => {
  if (!req.session || !req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/');
  }
  next();
};

module.exports = {
  isUser: isUser,
  isAdmin: isAdmin,
};
