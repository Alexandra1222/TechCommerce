const path = require('path');

module.exports={
    index:(req,res)=>{
        //return res.send('como vamos hasta aqui');
        res.sendFile(path.resolve(__dirname,'../views/web/home.html'));
    },
    nosotros:(req,res)=>{
        //return res.send('como vamos hasta aqui');
        res.sendFile(path.resolve(__dirname,'../views/web/nosotros.html'));
    },
    ayuda:(req,res)=>{
        //return res.send('como vamos hasta aqui');
        res.sendFile(path.resolve(__dirname,'../views/web/ayuda.html'));
    }
}
