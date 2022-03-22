const bcrypt = require('bcryptjs');
const path = require('path');
const UserModel = require('../models/User');
const userRepository = require('../services/users.services');

module.exports = {
  //ToDo: FALTA CRUD
  registerView: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/auth/register'));
  },
  register: (req, res) => {
    if (!req.body || !Object.keys(req.body).length) {
      //No envio nada
      return res.redirect('/auth/register?status=ERROR&message=FALTAN DATOS');
    }
    const input = req.body;
    const usersDb = userRepository.readFile();
    // console.log(usersDb);
    const ids = Object.keys(usersDb);
    const existingId = ids.find((id) => {
      usersDb[id].email === input.email;
    });
    let registerError;

    if (existingId) {
      //Usuario ya existe
      registerError = 'EL EMAIL YA EXISTE';
    } else if (input.password !== input.confirm_password) {
      registerError = 'LAS CONTRASEÑAS NO COINCIDEN';
    } else if (!input.username || !input.password) {
      registerError = 'FALTAN DATOS (USUARIO O PASSWORD)';
    }

    if (registerError) {
      return res.redirect(
        `/auth/register?status=ERROR&message=ALGO SALIO MAL,INTENTA MAS TARDE`
      );
    }

    if (req.file && req.file.path) {
      input.avatar_img = req.file.path
        .split('public')
        .pop()
        .replace(/\\/g, '/');
    }

    try {
      console.log('MARTIN_LOG=> input', input);

      const newUser = new UserModel(input);

      usersDb[newUser.id] = newUser.get();
      userRepository.saveFile(usersDb);
      return res.redirect('/');
    } catch (error) {
      return res.redirect(
        `/auth/register?status=ERROR&message${error.message}`
      );
    }
  },
  loginView: (req, res) => {
    res.render(path.resolve(__dirname, '../views/auth/login'));
  },
  login: (req, res) => {
    const input = req.body;
    if (
      !input ||
      !Object.keys(input).length ||
      !input.email ||
      !input.password
    ) {
      return res.redirect('/auth/login?status=ERROR&message=FALTAN_DATOS');
    }

    const users = userRepository.readFile();
    const ids = Object.keys(users);
    const id = ids.find((_id) => users[_id].email === input.email);
    console.log("MARTIN_LOG=> input", input);
    
    
    const user = users[id];
    console.log("MARTIN_LOG=> user", user);
    if (!user || !bcrypt.compareSync(input.password, user.password)) {
      return res.redirect('/auth/login?status=ERROR&message=DATOS_INCORRECTOS');
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    console.log('LOGIN SUCCESS', req.session.user);
    res.redirect('/');
  },
  refreshSession: (req, res) => {
    //return res.send('como vamos hasta aqui');

    res.send(req.body);
  },
};
