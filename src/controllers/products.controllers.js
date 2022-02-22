const path = require('path');
const formatPrice = require('../helpers/formatPrice');

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
    const currentCart = require('../db/cart.json')['user_1'];
    let newCart = currentCart.map((product) => {
      const total = product.price * product.quantity;
      return {
        ...product,
        total,
      };
    });

    const infoData = {
      total_quantity: newCart.reduce(
        (partialSum, a) => partialSum + a.quantity,
        0
      ),
      subtotal: formatPrice(
        newCart.reduce((partialSum, a) => partialSum + a.total, 0)
      ),
      total: formatPrice(
        newCart.reduce((partialSum, a) => partialSum + a.total, 0)
      ),
    };

    newCart = currentCart.map((product) => {
      return {
        ...product,
        price: formatPrice(product.price),
        total: formatPrice(product.total),
      };
    });

    // console.log("MARTIN_LOG=> ",infoData);    
    res.render(path.resolve(__dirname, '../views/products/cart'), {
      products: newCart,
      info_data: infoData,
    });
  },
  admin: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/products/admin'));
  },
};
