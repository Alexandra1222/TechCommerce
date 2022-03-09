const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controllers.js');

router.get('/category/:category_id', controller.category);
router.get('/details/:id', controller.details);
router.get('/cart/:id', controller.cart);
router.get('/admin/edit/:id', controller.edit);
router.get('/admin/remove/:id', controller.remove);
router.get('/admin/add', controller.add);
router.get('/admin', controller.admin);
router.get('/', controller.products);

module.exports = router;