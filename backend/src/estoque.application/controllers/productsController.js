const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  getProductByIdAll,
  getProductByDescricao,
  getProductsByCategoriaId,
  createProduct,
  putProduct,
  saveProductImagem,
  deleteProduct,
} = require('../../estoque.service/ProductsService/productsService');
const { productCreateValidation, productPutValidation } = require('../../estoque.crosscutting/validations/productValidation');
const validator = require('../../estoque.crosscutting/validations/validator');
const { imageUpload } = require('../../estoque.crosscutting/uploadImages/uploadImages');
const consultCep = require('../../estoque.service/ProductsService/consultCEP');
const consultaPrecoPrazo = require('../../estoque.service/ProductsService/consultPrecoPrazoService');
const authAdmin = require('../../estoque.crosscutting/auth/AuthAdmin');

router.get('/getall', getAllProducts);
router.get('/getproductbydescricao/:descricao', getProductByDescricao);
router.get('/details/:id', getProductById);
router.get('/detailsall/:id', getProductByIdAll);
router.get('/getproductsbycategoriaid/:categoriaId', getProductsByCategoriaId);
router.post('/', productCreateValidation(), validator, createProduct);
router.put('/:id', productPutValidation(), validator, putProduct);
router.patch('/saveimage/:id', imageUpload.single('imageFile'), saveProductImagem);

router.put('/delete/:id', deleteProduct);
//calcular frete e informar o endereço pelo cep
router.post('/cep', consultCep);
router.post('/frete', consultaPrecoPrazo);

module.exports = router;
