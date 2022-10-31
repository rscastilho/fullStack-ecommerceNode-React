const { queryCountProductsBuyCategory, queryCountUsuarios, queryCountPOByUser, queryValorCompradoPorUsuario } = require('../queries/dashboardQueries');

exports.contarPedidosCategorias = async () => {
  try {
    return queryCountProductsBuyCategory();
  } catch (error) {
    return error;
  }
};

exports.contarUsuarios = async () => {
  try {
    return queryCountUsuarios();
  } catch (error) {
    return error;
  }
};

exports.contarPedidosPorUsuarios = async () => {
  try {
    return queryCountPOByUser();
  } catch (error) {
    return error;
  }
};

exports.valorTotalCompradoPorUsuario = async () => {
  try {
    return queryValorCompradoPorUsuario();
  } catch (error) {
    return error;
  }
};
