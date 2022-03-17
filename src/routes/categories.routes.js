const express = require('express');
const router = express.Router();
const controller = require('../controllers/categories.controllers.js');

/**
 * @query 'id=XXXXXXX' category id
 */
router.get('/', controller.all);

module.exports = router;
 