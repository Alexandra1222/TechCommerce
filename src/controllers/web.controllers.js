const path = require('path');

module.exports = {
  index: (req, res) => {
    let user;
    if (req.session && req.session.user) {
      user = req.session.user;
    }
    console.log("MARTIN_LOG=> session", user);
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/web/home'), { user });
  },
  about: (req, res) => {
    let user;
    if (req.session && req.session.user) {
      user = req.session.user;
    }
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/web/about'), { user });
  },
  help: (req, res) => {
    let user;
    if (req.session && req.session.user) {
      user = req.session.user;
    }
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/web/help'), { user });
  },
};
