const path = require('path');
const formatPrice = require('../helpers/formatPrice');
const ProductService = require('../services/products.services');

module.exports = {
  details: (req, res) => {
     
    if (!req.params.id) {
      return res.status(400).send('BAD REQUEST');
    }
    const product = ProductService.getById(req.params.id);
    if (product.code === 'ERROR') {
      return res
        .status(409)
        .send({ code: "COULDN'T GET THE PRODUCT", message: product.message });
    }

    res.render(path.resolve(__dirname, '../views/products/product'), {
      product: product.payload.item,
      user: req.session.user,
    });
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

    newCart = newCart.map((product) => {
      return {
        ...product,
        price: formatPrice(product.price),
        total: formatPrice(product.total),
      };
    });

    res.render(
      path.resolve(__dirname, '../views/products/cart'),
      {
        products: newCart,
        info_data: infoData,
      },
      { user: req.session.user }
    );
  },
  all: (req, res) => {
     
    let products = require('../db/products.json');
    products = products.map((product) => {
      return {
        ...product,
        unit_price: formatPrice(product.unit_price),
      };
    });
    res.render(path.resolve(__dirname, '../views/products/products'), {
      products,
      user: req.session.user,
    });
  },
};
