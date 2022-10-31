exports.addUserPerfil = (usuarioId, funcaoId) => {
  const query = `INSERT INTO perfis (usuarioId,funcaoId) VALUES (${usuarioId},${funcaoId})`;
  // const fields = ['usuarioId', 'funcaoId', usuarioId, funcaoId]
  return { query };
};
