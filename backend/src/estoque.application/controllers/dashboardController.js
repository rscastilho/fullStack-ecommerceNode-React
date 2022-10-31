const express = require('express');
const router = express.Router();
const { contarProdutosPorCategoria, contarUsuarios, contarPedidosPorUsuarios, valorCompradoPorUsuario } = require('../../estoque.service/DashboardService/dashboardService');

router.get('/', (req, res) => {
  res.statusCode = 200;
  const ip = req.baseUrl;
  const ip2 = req.headers;
  const ip3 = req.query;

  res.json({ message: 'estou no dashboard', ip, ip2, ip3 });
});

router.get('/produtosPorCategoria', contarProdutosPorCategoria);
router.get('/contarusuarios', contarUsuarios);
router.get('/contarpedidosporusuario', contarPedidosPorUsuarios);
router.get('/valorcompradoporusuario', valorCompradoPorUsuario);

module.exports = router;
