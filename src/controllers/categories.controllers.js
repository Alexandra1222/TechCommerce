const path = require('path');
const CategoriesService = require('../services/categories.services');
const ProductService = require('../services/products.services');

module.exports = {
  all: (req, res) => {
    let products;
    let filter;
    if (req.query && req.query.id) {
      filter = { category: req.query.id };
    }

    products = ProductService.getAll(filter);
    const categories = CategoriesService.getAll({
      input: { populate: true },
      filter: 'isMain',
    });

    // console.log("MARTIN_LOG=> cateogires", categories);

    return res.render(path.resolve(__dirname, '../views/products/products'), {
      products,
      categories
    });
  }
};
