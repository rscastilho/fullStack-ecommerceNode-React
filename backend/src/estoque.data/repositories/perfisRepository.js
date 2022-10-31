const { addUserPerfil } = require('../queries/perfisQueries');

exports.addUserPerfil = async (usuarioId, funcaoId) => {
  return addUserPerfil(usuarioId, funcaoId);
};
