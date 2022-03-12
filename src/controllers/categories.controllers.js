const path = require('path');
const formatPrice = require('../helpers/formatPrice');
const ProductService = require('../services/products.services');

module.exports = {
  //ToDo: FALTA CRUD
  all: (req, res) => {
    let products;
    let filter;
    if (req.query && req.query.id) {
      filter = { category: req.query.id };
    }

    products = ProductService.getAll(filter);
    
    return res.render(path.resolve(__dirname, '../views/products/products'), {
      products,
    });
  },
  admin: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/products/admin'), {
      products: ProductService.getAll(),
    });
  },
  add: (req, res) => {
    //return res.send('como vamos hasta aqui');
    res.render(path.resolve(__dirname, '../views/forms/addProduct'));
  },
  store: (req, res) => {
    if (!Object.keys(req.body).length) {
      alert('Entrada invalida');
    }
    const input = req.body;

    if (req.file && req.file.path) {
      input.image = req.file.path.split('public').pop().replace(/\\/g, '/');
    }

    const response = ProductService.add(input);
    if (response.code === 'ERROR') {
      return res.redirect('/products/admin/add');
    }

    res.redirect('/products/admin');
  },
  edit: (req, res) => {
    //return res.send('como vamos hasta aqui');
    const product = ProductService.getById(req.params.id);
    if (product.code === 'ERROR') {
      return res.render(path.resolve(__dirname, '../views/web/error'));
    }
    res.render(path.resolve(__dirname, '../views/forms/editProduct'), {
      product: product.payload.item,
    });
  },
  update: (req, res) => {
    let originalProduct;
    let prodIndex;
    if (req.query && req.query.id) {
      let prodId = req.query.id;
      originalProduct = ProductService.getById(prodId);
      if (originalProduct.code === 'OK') {
        prodIndex = originalProduct.payload.index;
        originalProduct = originalProduct.payload.item;
      } else {
        originalProduct = undefined;
      }
    }

    if (!originalProduct) {
      return res.redirect('/products/admin');
    }

    if (!Object.keys(req.body).length) {
      res.redirect('/products/admin');
    }

    const input = { ...originalProduct, ...req.body };

    if (req.file && req.file.path) {
      input.image = req.file.path.split('public').pop().replace(/\\/g, '/');
    }

    const response = ProductService.update(input);

    if (response.code === 'ERROR') {
      return res.redirect(`/products/admin/edit/${originalProduct.id}`);
    }

    res.redirect('/products/admin');
  },
  remove: (req, res) => {
    //return res.send('como vamos hasta aqui');
    const product = ProductService.remove(req.params.id);
    if (product.code === 'ERROR') {
      return res.render(path.resolve(__dirname, '../views/web/error'));
    }
    res.redirect('/products/admin');
  },
};
