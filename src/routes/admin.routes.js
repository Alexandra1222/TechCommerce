const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { uploadProductImages } = require('../middlewares/multer.js');
const validateAuth = require('../middlewares/validateAuth');


router.get('/products/edit/:id', validateAuth.isAdmin, adminController.products.edit);
router.get('/products/remove/:id', validateAuth.isAdmin, adminController.products.remove);
router.get('/products/add', validateAuth.isAdmin, adminController.products.add);
router.post('/products/store', [validateAuth.isAdmin, uploadProductImages.any('file')], adminController.products.store);
router.post('/products/update', [validateAuth.isAdmin, uploadProductImages.any('file')], adminController.products.update);


router.get('/categories/edit/:id', validateAuth.isAdmin, adminController.categories.edit);
router.get('/categories/remove/:id', validateAuth.isAdmin, adminController.categories.remove);
router.get('/categories/add', validateAuth.isAdmin, adminController.categories.add);
router.post('/categories/store', validateAuth.isAdmin, adminController.categories.store);
router.post('/categories/update', validateAuth.isAdmin, adminController.categories.update);

/*
* ?option= categories or products
*/
router.get('/',validateAuth.isAdmin, adminController.default);

module.exports = router;
 