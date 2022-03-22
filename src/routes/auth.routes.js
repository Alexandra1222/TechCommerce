const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controllers.js');
const { uploadUserAvatars } = require('../middlewares/multer.js');

router.get('/register', controller.registerView);
router.post(
  '/createUser',
  uploadUserAvatars.single('file'),
  controller.register
);
router.get('/login', controller.loginView);
router.post('/login', uploadUserAvatars.single('file'), controller.login);
router.get('/refresh_session', controller.refreshSession);
router.get('/logout', controller.logout);

module.exports = router;
