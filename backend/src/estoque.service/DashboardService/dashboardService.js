const _dashboardRepository = require('../../estoque.data/repositories/dashboardRepository');
const sql = require('../../estoque.data/db/DbContext');

exports.contarProdutosPorCategoria = async (req, res) => {
  try {
    const result = await _dashboardRepository.contarPedidosCategorias();
    sql.query(result.query, (err, data) => {
      err && console.log(err);
      res.status(200).json(data);
    });
  } catch (error) {
    return error;
  }
};

exports.contarUsuarios = async (req, res) => {
  try {
    const result = await _dashboardRepository.contarUsuarios();
    sql.query(result.query, (err, data) => {
      err && console.log(err);
      res.status(200).json(data);
    });
  } catch (error) {
    return error;
  }
};

exports.contarPedidosPorUsuarios = async (req, res) => {
  try {
    const result = await _dashboardRepository.contarPedidosPorUsuarios();
    sql.query(result.query, (err, data) => {
      err && console.log('Erro', err);
      if (data.length < 1) {
        res.status(400).json({ message: 'nenhum registro encontrado' });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (error) {
    return error;
  }
};

exports.valorCompradoPorUsuario = async (req, res) => {
  try {
    const result = await _dashboardRepository.valorTotalCompradoPorUsuario();
    sql.query(result.query, (err, data) => {
      err && res.status(404).json(err);
      const total = data.reduce((previous, currentValue) => previous + currentValue.total, 0);
      const qtdePedidos = data.reduce((previous, currentValue) => previous + currentValue.pedidos, 0);
      res.status(200).json({ total, qtdePedidos, data });
    });
  } catch (error) {
    return error;
  }
};
