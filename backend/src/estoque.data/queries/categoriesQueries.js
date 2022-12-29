//carrega todos os itens que não estiverem deletados com o IS NULL
exports.getAllCategories = () => {
  const query = `SELECT * 
    FROM categorias
    WHERE deleted IS NULL
    ORDER BY Descricao ASC`;
  return { query };
};

