const { queryGetAllSuppliers, queryGetAllSupplierAndCategories } = require('../queries/suppliersQueries');

exports.getAllSuppliers = async () => {
  return queryGetAllSuppliers();
};

exports.getAllSuppliersAndCategories = async () => {
  return queryGetAllSupplierAndCategories();
};
