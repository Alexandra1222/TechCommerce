const express = require('express');
const path = require('path');
const app = express();
const logger = require('./src/middlewares/logger');

app.use(express.static(path.resolve(__dirname, './public')));
app.set('view engine', 'ejs');

/* **********SISTEMA DE RUTAS******** */
const webRouter = require('./src/routes/web.routes');
const usersRouter = require('./src/routes/users.routes');
const productsRouter = require('./src/routes/products.routes');
const authRouter = require('./src/routes/auth.routes');

// app.use(morgan("tiny"))
app.use('/', webRouter);
app.use('/users', usersRouter);
app.use('/products', logger, productsRouter);
app.use('/auth', logger, authRouter);

/* *******ARRANCAR SERVIDOR******** */
app.listen(4000, () => {
  console.log('Servidor funcionando en el puerto 4000!');
});
