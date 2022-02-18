const path = require('path');

module.exports = {
  //ToDo: FALTA CRUD
  category: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/products/products'));
  },
  details: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/products/product'));
  },
  cart: (req, res) => {
    //aca hardcodeo user_1 pero deberia sustituirse por el id del usuario
    //y cart.json sera sustituido por una entrada en la db o de ultima, en localstorage
    const currentCart = require("../db/cart.json")["user_1"];    
    res.render(path.resolve(__dirname, '../views/products/cart'),{products:currentCart});
  },
  admin: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/products/admin'));
  },
};
