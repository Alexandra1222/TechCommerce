const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controllers.js');
const logger = require('../middlewares/logger.js');

router.get('/:category_id', logger,controller.category);
router.get('/details/:id', logger,controller.details);
router.get('/cart/:id', logger,controller.cart);
router.get('/admin', logger,controller.admin);
router.get('/', logger,controller.products);

module.exports = router;