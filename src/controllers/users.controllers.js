const path = require('path');


module.exports = {
  profile: (req, res) => {
    res.render(path.resolve(__dirname, '../views/users/profile'), { user: req.session.user });
  },
};
