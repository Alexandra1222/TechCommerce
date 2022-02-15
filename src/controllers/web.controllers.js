const path = require('path');

module.exports = {
  index: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.sendFile(path.resolve(__dirname, '../views/web/home.html'));
  },
  about: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.sendFile(path.resolve(__dirname, '../views/web/about.html'));
  },
  help: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.sendFile(path.resolve(__dirname, '../views/web/help.html'));
  },
};
