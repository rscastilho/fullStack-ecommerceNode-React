exports.queryGetAllProducts = (itensPerPage, page) => {
  const query = `SELECT p.Id, p.Descricao produto, p.QuantidadeEstoque, p.QuantidadeMinima, p.Valor, p.ValorTotal, p.ImagemUrl, p.deleted, c.Descricao categoria,f.RazaoSocial
    FROM produtos p
    INNER JOIN categorias c ON p.CategoriaId = c.Id
    INNER JOIN fornecedores f ON p.FornecedorId = f.Id
    ORDER BY p.descricao ASC
    LIMIT ? OFFSET ?`;
  // WHERE p.deleted IS NULL
  const fields = [itensPerPage, page];
  return { query, fields };
};

exports.queryGetByIdAll = id => {
  const query = `SELECT * FROM produtos
    where ??=?
    ORDER BY Id ASC`;

  const fields = ['id', id];
  return { query, fields };
};

exports.queryGetByProductAll = produto => {
  const query = `SELECT *, p.descricao produto, F.razaosocial, c.Descricao categoria, p.deleted FROM produtos P
    INNER JOIN categorias c ON p.CategoriaId = c.Id
    INNER JOIN FORNECEDORES F ON P.FornecedorId = f.Id
    WHERE ??
    like ?
    `;
  // and p.deleted is null
  const fields = ['p.Descricao', produto];
  return { query, fields };
};

exports.queryGetProductById = id => {
  const query = `SELECT p.Id, p.Descricao Produto, p.QuantidadeEstoque, p.QuantidadeMinima, p.Valor, p.ValorTotal, p.ImagemUrl, p.ImagemDestaque, p.DestacarImagem, p.Deleted,p.DeleteAt,p.categoriaId,p.fornecedorid, c.Descricao Categoria,f.RazaoSocial
    FROM produtos p
    INNER JOIN categorias c ON p.CategoriaId = c.Id
    INNER JOIN fornecedores f ON p.FornecedorId = f.Id
    where ??=?
    ORDER BY p.Id ASC
    LIMIT 1`;
  const fields = ['p.id', id];
  return { query, fields };
};

exports.queryGetProductsByDescricao = descricao => {
  const query = `SELECT p.Id, p.Descricao, p.QuantidadeEstoque, p.QuantidadeMinima, p.Valor, p.ValorTotal, p.ImagemUrl, c.Descricao,f.RazaoSocial, p.categoriaId
    FROM produtos p
    INNER JOIN categorias c ON p.CategoriaId = c.Id
    INNER JOIN fornecedores f ON p.FornecedorId = f.Id
    WHERE ?? = ?`;
  // ORDER BY p.Id ASC`
  const fields = ['descricao', descricao];
  return { query, fields };
};

exports.queryGetProductsByCategoriaId = categoriaId => {
  const query = `SELECT p.Id, p.Descricao produto, p.QuantidadeEstoque, p.QuantidadeMinima, p.Valor, p.ValorTotal, p.ImagemUrl, c.Descricao categoria,f.RazaoSocial
    FROM produtos p
    INNER JOIN categorias c ON p.CategoriaId = c.Id
    INNER JOIN fornecedores f ON p.FornecedorId = f.Id
    WHERE ?? = ?
    ORDER BY p.Id ASC`;
  const fields = ['p.categoriaId', categoriaId];
  return { query, fields };
};

exports.queryGetProductsByFornecedor = fornecedorId => {
  const query = `SELECT p.Id, p.Descricao, p.QuantidadeEstoque, p.QuantidadeMinima, p.Valor, p.ValorTotal, p.ImagemUrl, c.Descricao,f.RazaoSocial
    FROM produtos p
    INNER JOIN categorias c ON p.CategoriaId = c.Id
    INNER JOIN fornecedores f ON p.FornecedorId = f.Id
    WHERE ?? = ?
    ORDER BY p.Id ASC`;
  const fields = ['fornecedorId', fornecedorId];
  return { query, fields };
};

exports.queryCountProducts = () => {
  const query = `SELECT COUNT(id) as quantidade FROM produtos`;
  return { query };
};

exports.queryCreateProduct = (createAt, descricao, quantidadeEstoque, quantidadeMinima, valor, valorTotal, categoriaId, imagemUrl, fornecedorId) => {
  const query = `INSERT INTO produtos (??, ??, ??, ??, ??, ??, ??,??,??) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)`;
  const fields = [
    'createAt',
    'descricao',
    'quantidadeEstoque',
    'quantidadeMinima',
    'valor',
    'valorTotal',
    'categoriaId',
    'imagemUrl',
    'fornecedorId',
    createAt,
    descricao,
    quantidadeEstoque,
    quantidadeMinima,
    valor,
    valorTotal,
    categoriaId,
    imagemUrl,
    fornecedorId,
  ];
  return { query, fields };
};

exports.queryUpdateProduct = (
  updateAt,
  descricao,
  quantidadeEstoque,
  quantidademinima,
  valor,
  valortotal,
  categoriaId,
  fornecedorid,
  imagemDestaque,
  destacarImagem,
  deleted,
  id,
) => {
  const query = `UPDATE produtos 
    SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?, ??=?
    where ??=?`;
  const fields = [
    'updateAt',
    updateAt,
    'descricao',
    descricao,
    'quantidadeEstoque',
    quantidadeEstoque,
    'quantidademinima',
    quantidademinima,
    'valor',
    valor,
    'valortotal',
    valortotal,
    'categoriaId',
    categoriaId,
    'fornecedorid',
    fornecedorid,
    'imagemDestaque',
    imagemDestaque,
    'destacarImagem',
    destacarImagem,
    'deleted',
    deleted,
    'id',
    id,
  ];
  return { query, fields };
};

exports.queryUpdateImageProduct = (updateAt, imagemUrl, id) => {
  const query = `UPDATE produtos 
    SET ??=?,??=? WHERE ??=?`;
  const fields = ['updateAt', updateAt, 'imagemUrl', imagemUrl, 'id', id];
  return { query, fields };
};

exports.queryDeleteProduct = (deleteAt, deleted, id) => {
  const query = `UPDATE produtos SET ??=?, ??=? WHERE ?? = ?`;
  const fields = ['deleteAt', deleteAt, 'deleted', deleted, 'id', id];
  return { query, fields };
};
