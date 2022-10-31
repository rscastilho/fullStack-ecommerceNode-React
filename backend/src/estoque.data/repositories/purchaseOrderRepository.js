const {
  queryPostPurchaseOrder,
  queryPostItensPurchaseOrder,
  queryBaixarEstoque,
  queryGetPegarQuantidadeEstoque,
  getPurchaseOrderByUserId,
  getPurchaseOrderByOrderId,
  getItensPurchaseOrderByOrderId,
  getCountPurchaseOrderByUserId,
} = require('../queries/purchaseOrderQueries');

exports.postPurchaseOrder = async (createAt, usuarioId, valorTotal, tiposPagamentos, statusPedidos) => {
  try {
    return queryPostPurchaseOrder(createAt, usuarioId, valorTotal, tiposPagamentos, statusPedidos);
  } catch (error) {
    console.log('erro relatado no purshaseOrderRepository', error);
    return error;
  }
};

exports.postItensPurchaseOrder = async (pedidoId, produtoId, quantidade, Valor) => {
  try {
    return queryPostItensPurchaseOrder(pedidoId, produtoId, quantidade, Valor);
  } catch (error) {
    console.log('erro relatado no purshaseOrderRepository', error);
    return error;
  }
};

exports.postBaixarEstoque = async (quantidade, id) => {
  try {
    return queryBaixarEstoque(quantidade, id);
  } catch (error) {
    console.log('erro relatado no purshaseOrderRepository', error);
    return error;
  }
};

exports.getPegarQuantidadeEstoque = async id => {
  try {
    return queryGetPegarQuantidadeEstoque(id);
  } catch (error) {
    console.log('erro relatado no purshaseOrderRepository', error);
    return error;
  }
};

exports.getPedidosPorUsuarioId = async (usuarioId, itensPorPagina, pagina) => {
  try {
    return getPurchaseOrderByUserId(usuarioId, itensPorPagina, pagina);
  } catch (error) {
    console.log('erro relatado no purshaseOrderRepository', error);
    return error;
  }
};

exports.getQuantidadePedidosPorUsuarioId = async usuarioId => {
  try {
    return getCountPurchaseOrderByUserId(usuarioId);
  } catch (error) {
    console.log('erro relatado no purshaseOrderRepository', error);
    return error;
  }
};

exports.getPedidoPorPedidoId = async id => {
  try {
    return getPurchaseOrderByOrderId(id);
  } catch (error) {
    console.log('erro relatado no purshaseOrderRepository', error);
    return error;
  }
};

exports.getItensPedidoPorPedidoId = async id => {
  try {
    return getItensPurchaseOrderByOrderId(id);
  } catch (error) {
    console.log('erro relatado no purshaseOrderRepository', error);
    return error;
  }
};
