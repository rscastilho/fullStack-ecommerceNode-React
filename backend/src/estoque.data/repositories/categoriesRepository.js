const { getAllCategories } = require('../queries/categoriesQueries');

exports.getAllCategorie = async () => {
  return getAllCategories();
};
