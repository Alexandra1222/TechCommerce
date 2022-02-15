const router = require('express').Router();
const webControllers = require('../controllers/web.controllers.js');
const logger = require('../middlewares/logger.js');

router.get('/', logger, webControllers.index);
router.get('/about', logger, webControllers.about);
router.get('/help', logger, webControllers.help);

module.exports = router;
