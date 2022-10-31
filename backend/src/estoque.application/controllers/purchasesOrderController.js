const express = require('express');
const authUser = require('../../estoque.crosscutting/auth/AuthUser');
const router = express.Router();
const {
  postCreatePurchaseOrder,
  getPedidosByUsuarioId,
  getPedidoByOrderId,
  getPedidoCompletoById,
} = require('../../estoque.service/PurchaseOrderService/PuchaseOrderService');

router.post('/', postCreatePurchaseOrder);
router.get('/:usuarioId', authUser, getPedidosByUsuarioId);
router.get('/pedidoid/:id', authUser, getPedidoByOrderId);
router.get('/pedido/:id?', authUser, getPedidoCompletoById);

module.exports = router;
