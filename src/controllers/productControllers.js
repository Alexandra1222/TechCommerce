const path = require('path');

module.exports={
    carrito:(req,res)=>{
        //return res.send('como vamos hasta aqui');
        res.sendFile(path.resolve(__dirname,'../views/products/carrito.html'));
    },
    productos:(req,res)=>{
        //return res.send('como vamos hasta aqui');
        res.sendFile(path.resolve(__dirname,'../views/products/productos.html'));
    },
    producto:(req,res)=>{
        //return res.send('como vamos hasta aqui');
        res.sendFile(path.resolve(__dirname,'../views/products/productos.html'));
    }
}
