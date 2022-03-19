const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { uploadProductImages } = require('../middlewares/multer.js');


router.get('/products/edit/:id', adminController.products.edit);
router.get('/products/remove/:id', adminController.products.remove);
router.get('/products/add', adminController.products.add);
router.post('/products/store', uploadProductImages.any('file'), adminController.products.store);
router.post('/products/update', uploadProductImages.any('file'), adminController.products.update);


router.get('/categories/edit/:id', adminController.categories.edit);
router.get('/categories/remove/:id', adminController.categories.remove);
router.get('/categories/add', adminController.categories.add);
router.post('/categories/store', adminController.categories.store);
router.post('/categories/update', adminController.categories.update);

/*
* ?option= categories or products
*/
router.get('/', adminController.default);

module.exports = router;
 