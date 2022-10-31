const express = require('express');
const { getAllSuppliers, getAllSuppliersAndCateogories } = require('../../estoque.service/SuppliersService/SuppliersService');
const router = express.Router();

router.get('/', getAllSuppliers);
router.get('/fornecedorescategorias', getAllSuppliersAndCateogories);

module.exports = router;
