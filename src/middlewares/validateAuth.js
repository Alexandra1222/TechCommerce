const isUser = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/auth/login');
  }

  next();
};

const isAdmin = (req, res, next) => {
  isUser(req, res, next);
  if (!req.session.user.role === 'admin') {
    return res.redirect('/');
  }
  console.log('MARTIN_LOG=> session', req.session.user);
  next();
};

module.exports = {
  isUser: isUser,
  isAdmin: isAdmin,
};
