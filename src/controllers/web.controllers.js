const path = require('path');
const productSetvices = require("../services/products.services");

module.exports = {
  index: (req, res) => {    
    res.render(path.resolve(__dirname, '../views/web/home'), { user: req.session.user, products: productSetvices.getAll({discount: true}) });
  },
  about: (req, res) => {
    res.render(path.resolve(__dirname, '../views/web/about'), { user: req.session.user });
  },
  help: (req, res) => {
    res.render(path.resolve(__dirname, '../views/web/help'), { user: req.session.user });
  },
};
