const path = require('path');

module.exports = {
  //ToDo: FALTA CRUD
  register: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/auth/register'));
  },
  login: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/auth/login'));
  },
  refreshSession: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.send('REFRESH');
  },
};
