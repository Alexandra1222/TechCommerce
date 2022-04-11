const multer = require('multer');
const path = require('path');
const { v4: uuid } = require('uuid');

const productImagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images/product_images'));
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + path.extname(file.originalname));
  }
})

const uploadProductImages = multer({ storage: productImagesStorage });

const userAvatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images/user_avatars'));
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + path.extname(file.originalname));
  }
})

const uploadUserAvatars = multer({ storage: userAvatarStorage });

module.exports = { uploadProductImages, uploadUserAvatars};
