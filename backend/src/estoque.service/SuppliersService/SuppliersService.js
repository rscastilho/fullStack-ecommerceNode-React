const sql = require('../../estoque.data/db/DbContext');
const _supplierRepository = require('../../estoque.data/repositories/suppliersRepository');

exports.getAllSuppliers = async (req, res) => {
  try {
    const result = await _supplierRepository.getAllSuppliers();
    sql.query(result.query, (err, data) => {
      err && res.status(400).json({ message: 'Erro ao carregar fornecedores', err });
      if (data.length < 1) {
        res.status(400).json({ message: 'Fornecedores não encontrados' });
      } else {
        res.status(200).json({ registros: data.length, data });
      }
    });
  } catch (error) {
    return error;
  }
};

exports.getAllSuppliersAndCateogories = async (req, res) => {
  try {
    const result = await _supplierRepository.getAllSuppliersAndCategories();
    sql.query(result.query, (err, data) => {
      err && res.status(404).json({ message: 'Erro ao carregar fornecedores, e categorias' });
      res.status(200).json({ data });
    });
  } catch (error) {}
};
