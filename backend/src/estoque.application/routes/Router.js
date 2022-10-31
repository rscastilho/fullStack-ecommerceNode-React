const express = require('express');
const router = express.Router();

router.use('/api/users', require('../controllers/usersController'));
router.use('/api/products', require('../controllers/productsController'));
router.use('/api/categories', require('../controllers/categoriesController'));
router.use('/api/suppliers', require('../controllers/suppliersController'));
router.use('/api/purchaseorder', require('../controllers/purchasesOrderController'));
router.use('/api/dashboard', require('../controllers/dashboardController'));

module.exports = router;
