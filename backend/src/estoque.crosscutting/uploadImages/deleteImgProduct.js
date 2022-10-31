const multer = require('multer');
const fs = require('fs');
const path = require('path');
const _productRepository = require('../../estoque.data/repositories/productsRepository');
const sql = require('../../estoque.data/db/DbContext');

const deleteImgProduct = async (req, res, next, id) => {
  const result = await _productRepository.getProductById(id);
  sql.query(result.query, result.fields, (err, data) => {
    let file = data[0].ImagemUrl;
    if (file) {
      fs.unlink(`src/estoque.application/public/products/${file}`, err => {
        err && console.log(err);
        return;
      });
    } else {
      next();
      return;
    }
  });
};

module.exports = { deleteImgProduct };
