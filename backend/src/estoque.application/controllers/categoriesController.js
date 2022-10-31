const express = require('express');
const router = express.Router();

const { getAllCategories } = require('../../estoque.service/CategoriesService/CategoriesService');

router.get('/', getAllCategories);

module.exports = router;
