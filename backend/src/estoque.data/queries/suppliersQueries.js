exports.queryGetAllSuppliers = () => {
  const query = `SELECT * 
    FROM fornecedores
    WHERE deleted IS NULL
    ORDER BY razaoSocial ASC`;
  return { query };
};

exports.queryGetAllSupplierAndCategories = () => {
  const query = `SELECT f.id idfornecedor, f.razaosocial fornecedores, c.id idcategoria, c.descricao cateorias 
    FROM fornecedores f, categorias c`;
  return { query };
};
