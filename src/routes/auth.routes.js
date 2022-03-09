const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controllers.js');
const logger = require('../middlewares/logger.js');

router.get('/register', controller.register);
router.get('/login', controller.login);
router.get('/refresh_session', controller.refreshSession);

module.exports = router;
