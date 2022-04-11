const router = require('express').Router();
const webControllers = require('../controllers/web.controllers.js');
const logger = require('../middlewares/logger.js');

router.get('/', webControllers.index);
router.get('/about', webControllers.about);
router.get('/help', webControllers.help);

module.exports = router;
