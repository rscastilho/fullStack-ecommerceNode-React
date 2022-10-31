const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = '';
    if (req.baseUrl.includes('users')) {
      cb(null, `src/estoque.application/public/`);
    } else if (req.baseUrl.includes('products')) {
      folder = 'products';
      cb(null, `src/estoque.application/public/${folder}`);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error('Formato de imagem não permitido'));
    }
    cb(undefined, true);
  },
  limits: { fileSize: 1024 * 1024 },
});

module.exports = { imageUpload };
