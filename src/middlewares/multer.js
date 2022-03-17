const multer = require('multer');
const path = require('path');
const { v4: uuid } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images/product_images'));
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage });
module.exports = { upload };
