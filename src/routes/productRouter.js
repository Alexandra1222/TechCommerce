const express = require('express');
const router = express.Router();
const path = require('path');
const productControllers = require('../controllers/productControllers.js');

router.get('/carrito',productControllers.carrito);
router.get('/productos',productControllers.productos);
router.get('/producto',productControllers.producto);


module.exports=router;