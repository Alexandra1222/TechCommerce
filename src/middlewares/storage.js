const multer = require('multer');
const path = require('path');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log('path',path.join(__dirname,'../../public/images'));
        cb(null,path.join(__dirname,'../../public/images'));
      },
    filename:function(req,file,cb){
        console.log('filename',file.fieldname +'-'+Date.now()+path.extname(file.originalname));
        cb(null,file.fieldname +'-'+Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({storage:storage})
module.exports={upload}