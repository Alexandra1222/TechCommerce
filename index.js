require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const logger = require('./src/middlewares/logger');

app.use(express.static(path.resolve(__dirname, './public')));
app.set('view engine', 'ejs');

/* **********MIDDLEWARES******** */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    key: 'user_cookie',
    saveUninitialized: true,
    resave:false,
    cookie: { maxAge: 120000 }, //120000 = 2minutos
  })
);

/* **********SISTEMA DE RUTAS******** */
const webRouter = require('./src/routes/web.routes');
const usersRouter = require('./src/routes/users.routes');
const productsRouter = require('./src/routes/products.routes');
const authRouter = require('./src/routes/auth.routes');
const adminRouter = require('./src/routes/admin.routes');
const categoryRouter = require('./src/routes/categories.routes');
// app.use(morgan("tiny"))
app.use('/', webRouter);
app.use('/users', usersRouter);
app.use('/products', logger, productsRouter);
app.use('/category', logger, categoryRouter);
app.use('/auth', logger, authRouter);
app.use('/admin', logger, adminRouter);

/* *******ARRANCAR SERVIDOR******** */
app.listen(4000, () => {
  console.log('Servidor funcionando en el puerto 4000!');
});