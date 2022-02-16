const path = require('path');

module.exports = {
  //ToDo: FALTA CRUD
  register: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.sendFile(path.resolve(__dirname, '../views/auth/register.html'));
  },
  login: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.sendFile(path.resolve(__dirname, '../views/auth/login.html'));
  },
  refreshSession: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.send("REFRESH");
  },  
};
