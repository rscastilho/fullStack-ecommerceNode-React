exports.queryPostPurchaseOrder = (createAt, usuarioId, valorTotal, tiposPagamentos, statusPedidos) => {
  const query = `INSERT INTO pedidos (??,??, ??, ??, ??) 
                    VALUES(?,?,?,?,?)`;
  const fields = ['createAt', 'UsuarioId', 'ValorTotal', 'tiposPagamentos', 'StatusPedidos', createAt, usuarioId, valorTotal, tiposPagamentos, statusPedidos];
  return {
    query,
    fields,
  };
};

exports.queryPostItensPurchaseOrder = (pedidoId, produtoId, quantidade, Valor) => {
  const query = `INSERT INTO itenscarrinho (??, ??, ??, ??) VALUES(?,?,?,?)`;
  const fields = ['pedidoId', 'produtoId', 'quantidade', 'valor', pedidoId, produtoId, quantidade, Valor];
  return {
    query,
    fields,
  };
};

exports.queryGetPegarQuantidadeEstoque = id => {
  const query = `SELECT quantidadeestoque FROM produtos WHERE ?? =?`;
  const fields = ['id', id];
  return {
    query,
    fields,
  };
};

exports.queryBaixarEstoque = (quantidade, id) => {
  const query = `UPDATE produtos SET ?? = (quantidadeestoque - ?) where ??= ?`;
  const fields = ['quantidadeestoque', quantidade, 'id', id];
  return {
    query,
    fields,
  };
};

exports.getPurchaseOrderByUserId = (usuarioId, itensPerPage, page) => {
  const query = `SELECT id, createAt, usuarioId, valorTotal, tiposPagamentos, statusPedidos FROM pedidos WHERE ?? = ? 
  ORDER BY createAt desc
  LIMIT ? offset ?`;
  const fields = ['usuarioId', usuarioId, itensPerPage, page];
  return {
    query,
    fields,
  };
};

exports.getCountPurchaseOrderByUserId = usuarioId => {
  const query = `SELECT COUNT(id) as quantidade FROM pedidos WHERE ??=?`;
  const fields = ['usuarioId', usuarioId];
  return {
    query,
    fields,
  };
};

exports.getPurchaseOrderByOrderId = id => {
  const query = `SELECT p.id, p.createAt, p.usuarioId, u.nome, p.valorTotal, p.tiposPagamentos, p.statusPedidos 
    FROM pedidos p 
    INNER JOIN usuarios u ON p.usuarioId = u.id
    WHERE ?? = ?`;
  const fields = ['p.id', id];
  return {
    query,
    fields,
  };
};

exports.getItensPurchaseOrderByOrderId = id => {
  const query = `SELECT p.id as pedidoId, i.quantidade, i.produtoId, pr.descricao, pr.Valor as valor, pr.imagemUrl
    FROM pedidos p 
    INNER JOIN itenscarrinho i ON p.id = i.PedidoId
    INNER JOIN produtos pr ON i.produtoId = pr.Id
    INNER JOIN usuarios u ON p.usuarioId = u.id
    where ?? = ?;`;
  const fields = ['p.id', id];
  return {
    query,
    fields,
  };
};
