const path = require('path');

module.exports = {
  //ToDo: FALTA CRUD
  category: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.sendFile(path.resolve(__dirname, '../views/products/products.html'));
  },
  details: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.sendFile(path.resolve(__dirname, '../views/products/product.html'));
  },
  cart: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.sendFile(path.resolve(__dirname, '../views/products/cart.html'));
  },
  admin: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.sendFile(path.resolve(__dirname, '../views/products/admin.html'));
  },
  products: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.sendFile(path.resolve(__dirname, '../views/products/products.html'));
  },
};
