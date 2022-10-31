const {
  queryGetAllProducts,
  queryGetProductById,
  queryGetByIdAll,
  queryGetByProductAll,
  queryGetProductsByCategoriaId,
  queryCreateProduct,
  queryUpdateProduct,
  queryUpdateImageProduct,
  queryDeleteProduct,
  queryCountProducts,
} = require('../queries/productsQueries');

exports.getAllProducts = async (itensPerPage, page) => {
  return queryGetAllProducts(itensPerPage, page);
};

exports.getProductById = async id => {
  return queryGetProductById(id);
};

exports.getProductByIdAll = async id => {
  return queryGetByIdAll(id);
};

exports.getProductByDescricao = async produto => {
  return queryGetByProductAll(produto);
};

exports.getProductsByCategoriaId = async categoriaId => {
  return queryGetProductsByCategoriaId(categoriaId);
};

exports.getCountProducts = async () => {
  return queryCountProducts();
};

exports.postCreateProduct = async (creatAt, descricao, quantidadeEstoque, quantidadeMinima, valor, valorTotal, categoriaId, imagemUrl, fornecedorId) => {
  return queryCreateProduct(creatAt, descricao, quantidadeEstoque, quantidadeMinima, valor, valorTotal, categoriaId, imagemUrl, fornecedorId);
};
exports.putProduct = async (
  updateAt,
  descricao,
  quantidadeEstoque,
  quantidadeMinima,
  valor,
  valorTotal,
  categoriaId,
  fornecedorId,
  imagemDestaque,
  destacarImagem,
  deleted,
  id,
) => {
  return queryUpdateProduct(
    updateAt,
    descricao,
    quantidadeEstoque,
    quantidadeMinima,
    valor,
    valorTotal,
    categoriaId,
    fornecedorId,
    imagemDestaque,
    destacarImagem,
    deleted,
    id,
  );
};
exports.putImageProduct = async (updateAt, imagemUrl, id) => {
  return queryUpdateImageProduct(updateAt, imagemUrl, id);
};

exports.deleteProduct = async (deletedAt, deleted, id) => {
  return queryDeleteProduct(deletedAt, deleted, id);
};
