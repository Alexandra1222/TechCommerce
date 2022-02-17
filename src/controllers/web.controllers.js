const path = require('path');

module.exports = {
  index: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/web/home'));
  },
  about: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/web/about'));
  },
  help: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/web/help'));
  },
};
