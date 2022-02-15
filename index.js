const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, './public')));

/* **********SISTEMA DE RUTAS******** */
const webRouter = require('./src/routes/web.routes');
const usersRouter = require('./src/routes/users.routes');
const productsRouter = require('./src/routes/products.routes');
const authRouter = require('./src/routes/auth.routes');

app.use('/', webRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);

/* *******ARRANCAR SERVIDOR******** */
app.listen(4000, () => {
  console.log('Servidor funcionando en el puerto 4000!');
});
