const express = require('express');
const router = express.Router();
const controller = require('../controllers/categories.controllers.js');
const { upload } = require('../middlewares/multer.js');


router.get('/admin/edit/:id', controller.edit);
router.get('/admin/remove/:id', controller.remove);
router.get('/admin/add', controller.add);
router.post('/admin/store', upload.single('file'), controller.store);
router.post('/admin/update', upload.single('file'), controller.update);
router.get('/admin', controller.admin);

/**
 * @query 'id=XXXXXXX' category id
 */
router.get('/', controller.all);

module.exports = router;
 