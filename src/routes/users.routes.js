const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controllers.js');
const logger = require('../middlewares/logger.js');

router.get('/profile/:id',controller.profile);

module.exports = router;
