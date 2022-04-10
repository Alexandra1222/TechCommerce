const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controllers.js');
const { upload } = require('../middlewares/multer.js');

router.get('/details/:id', controller.details);
router.get('/cart/:id', controller.cart);

module.exports = router;
 