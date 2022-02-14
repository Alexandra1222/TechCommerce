const express = require('express');
const router = express.Router();
const path = require('path');
const webControllers = require('../controllers/webControllers.js');

router.get('/',webControllers.index);
router.get('/nosotros',webControllers.nosotros);
router.get('/ayuda',webControllers.ayuda);


module.exports=router;