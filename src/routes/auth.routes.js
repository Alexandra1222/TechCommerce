const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controllers.js');
const logger = require('../middlewares/logger.js');

router.get('/register', logger, controller.register);
router.get('/login', logger, controller.login);
router.get('/refresh_session', logger, controller.refreshSession);

module.exports = router;
