const express = require('express');
const path = require('path');
const app = express();

app.use('/static', express.static(__dirname + '/public'));

//Rutas (preliminar hasta que nos habiliten usar router)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/views/home.html');
});

app.get('/productos', (req, res) => {
  res.sendFile(__dirname + '/src/views/productos.html');
});

//Este no carga bien el css
app.get('/productos/id', (req, res) => {
  res.sendFile(__dirname + '/src/views/producto.html');
});

app.get('/carrito', (req, res) => {
  res.sendFile(__dirname + '/src/views/carrito.html');
});

app.get('/nosotros', (req, res) => {
  res.sendFile(__dirname + '/src/views/nosotros.html');
});

app.get('/ayuda', (req, res) => {
  res.sendFile(__dirname + '/src/views/ayuda.html');
});

app.listen(4000, () => {
  console.log('Servidor funcionando');
});
