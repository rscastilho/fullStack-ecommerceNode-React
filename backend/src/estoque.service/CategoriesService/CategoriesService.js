const { getAllCategorie } = require('../../estoque.data/repositories/categoriesRepository');
const sql = require('../../estoque.data/db/DbContext');

exports.getAllCategories = async (req, res) => {
  try {
    const result = await getAllCategorie();
    sql.query(result.query, (err, data) => {
      err && res.status(400).json({ message: 'Erro ao carregar categorias', err });
      if (data.length < 1) {
        res.status(400).json({ message: 'Categorias não encontradas', err });
        return;
      } else {
        res.status(200).json({ registros: data.length, data });
      }
    });
  } catch (error) {
    return error;
  }
};
