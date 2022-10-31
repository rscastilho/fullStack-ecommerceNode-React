exports.queryCountProductsBuyCategory = () => {
  const query = `SELECT count(ped.id) quantidade, c.descricao categoria
  FROM itenscarrinho i
  inner join produtos p on i.ProdutoId = p.id
  inner join categorias c on p.CategoriaId = c.id 
  inner join pedidos ped on ped.id = i.PedidoId
  group by categoria`;
  return { query };
};

exports.queryCountUsuarios = () => {
  const query = `SELECT count(id) quantidade ,count(deleted) deletados FROM usuarios`;
  return { query };
};

exports.queryCountPOByUser = () => {
  const query = `select count(p.id) quantidade, u.nome usuario from pedidos p
  inner join usuarios u on p.UsuarioId = u.id
  group by p.usuarioid`;
  return { query };
};

exports.queryValorCompradoPorUsuario = () => {
  const query = `select sum(p.valortotal) as total, count(p.id) as pedidos, u.nome from pedidos p
  inner join usuarios u on u.id =  p.UsuarioId
  group by u.nome
  order by u.nome
  `;
  return { query };
};
