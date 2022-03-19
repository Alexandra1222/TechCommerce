const path = require('path');
const formatPrice = require('../helpers/formatPrice');
const ProductService = require('../services/products.services');
const CategoriesService = require('../services/categories.services');
const formatList = require('../helpers/formatObj');

const data = {
  products: () => {
    return {
      url: path.resolve(__dirname, '../views/admin/adminProducts'),
      payload: ProductService.getAll(),
    };
  },
  categories: () => {
    return {
      url: path.resolve(__dirname, '../views/admin/adminCategories'),
      payload: CategoriesService.getAll({input: { populate: true }}),
    };
  },
};

module.exports = {
  default: (req, res) => {
    const query = req.query;
    console.log(query);
    const displayData = data[query.option]
      ? data[query.option]()
      : data['products']();

    const selection = query.option ? query.option : 'products';

    
    if (selection) {
      return res.render(displayData.url, {
        selection: query.option,
        payload: formatList(displayData.payload),
        status: query.status,
        toast_message: query.message
      });
    }
  },
  products: {
    add: (req, res) => {
      const categories = CategoriesService.getAll({input: { populate: true }});
      
      res.render(path.resolve(__dirname, '../views/forms/product/addProduct'), {
        categories,
      });
    },
    store: (req, res) => {
      if (!Object.keys(req.body).length) {
        alert('Entrada invalida');
      }
      const input = req.body;
      
      if (req.files) {
        const files = req.files;
        input.image = files.map(file=>{
          return file.path.split('public').pop().replace(/\\/g, '/');
        })
      }

      const response = ProductService.add(input);
      if (response.code === 'ERROR') {
        return res.redirect('/products/admin/add');
      }

      res.redirect('/admin?option=products');
    },
    edit: (req, res) => {
      //return res.send('como vamos hasta aqui');
      const product = ProductService.getById(req.params.id);
      if (product.code === 'ERROR') {
        return res.render(path.resolve(__dirname, '../views/web/error'));
      }
      const categories = CategoriesService.getAll({input: { populate: true }});
      res.render(
        path.resolve(__dirname, '../views/forms/product/editProduct'),
        {
          product: product.payload.item,
          categories,
        }
      );
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
        return res.redirect(
          `/products/admin/products/edit/${originalProduct.id}`
        );
      }

      res.redirect('/admin?option=products');
    },
    remove: (req, res) => {
      //return res.send('como vamos hasta aqui');
      const payload = ProductService.remove(req.params.id);
      if (payload.code === 'ERROR') {
        return res.render(path.resolve(__dirname, '../views/web/error'));
      }
      res.redirect('/admin?option=products');
    },
  },
  categories: {
    add: (req, res) => {
      const categories = CategoriesService.getAll({input: { populate: true }});
      res.render(
        path.resolve(__dirname, '../views/forms/category/addCategory'),
        {
          categories,
        }
      );
    },
    store: (req, res) => {
      if (!req.body || !Object.keys(req.body).length) {
        res.redirect('/admin/categories/add');
      }
      const input = req.body;

      const response = CategoriesService.add(input);
      if (response.code === 'ERROR') {
        return res.redirect('/products/admin/add');
      }

      res.redirect('/admin?option=categories');
    },
    edit: (req, res) => {
      const category = CategoriesService.getById(req.params.id, {
        populate: true,
      });

      if (category.code === 'ERROR') {
        return res.render(path.resolve(__dirname, '../views/web/error'));
      }

      const categories = CategoriesService.getAll({input: { populate: true }}).filter(a=>a.id !== category.payload.id);
      res.render(
        path.resolve(__dirname, '../views/forms/category/editCategory'),
        {
          category: category.payload,
          categories,
        }
      );
    },
    update: (req, res) => {
      let originalProduct;
      let prodIndex;
      if (req.query && req.query.id) {
        let prodId = req.query.id;
        originalProduct = CategoriesService.getById(prodId);
        if (originalProduct.code === 'OK') {
          originalProduct = originalProduct.payload;
        } else {
          originalProduct = undefined;
        }
      }

      if (!originalProduct || !Object.keys(req.body).length) {
        return res.redirect('/admin?option=categories');
      }

      const input = { ...originalProduct, ...req.body };

      if (req.file && req.file.path) {
        input.image = req.file.path.split('public').pop().replace(/\\/g, '/');
      }

      const response = CategoriesService.update(input);

      if (response.code === 'ERROR') {
        return res.redirect(
          `/admin/categories/edit/${originalProduct.id}`
        );
      }

      res.redirect('/admin?option=categories');
    },
    remove: (req, res) => {
      //return res.send('como vamos hasta aqui');
      const response = CategoriesService.remove(req.params.id);
      if (response.code === 'ERROR') {
        return res.redirect(`/admin?option=categories&status=ERROR&message=${response.message}`);
      }
      res.redirect(`/admin?option=categories&status=SUCCESS&message=${response.message}`);
    },
  },
};
