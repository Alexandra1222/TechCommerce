const path = require('path');

module.exports = {
  profile: (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/users/profile.html'));
  }
};
