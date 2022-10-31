exports.queryRegisterUsers = (createat, nome, email, cpf, senha, passwordExpirationDate, imagemPerfil) => {
  const query = 'INSERT INTO usuarios (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)';
  const fields = [
    'createAt',
    'Nome',
    'Email',
    'CPF',
    'Senha',
    'PasswordExpirationDate',
    'imagemPerfil',
    createat,
    nome,
    email,
    cpf,
    senha,
    passwordExpirationDate,
    imagemPerfil,
  ];
  return { query, fields };
};

exports.queryUserByEmail = email => {
  const query = 'SELECT * FROM usuarios WHERE ??=?';
  const fields = ['email', email];
  return { query, fields };
};

exports.queryUserByCPF = cpf => {
  const query = 'SELECT * FROM usuarios WHERE ??=?';
  const fields = ['cpf', cpf];
  return { query, fields };
};

exports.queryEmailOrCpf = (email, cpf) => {
  const query = 'SELECT email, cpf FROM usuarios WHERE ??=? OR ??=?';
  const fields = ['email', email, 'cpf', cpf];
  return { query, fields };
};

exports.queryPegaSenhaErrada = id => {
  const query = 'SELECT * FROM usuarios WHERE ??=?';
  const fields = ['id', id];
  return { query, fields };
};

exports.queryAtualizaSenhaErrada = (id, erroSenha) => {
  const query = 'UPDATE usuarios SET ??=? WHERE ??=?';
  const fields = ['erroSenha', erroSenha, 'id', id];
  return { query, fields };
};

exports.queryBloquearSenha = (blocked, blockedAt, id) => {
  const query = 'UPDATE usuarios SET ??=?, ??=? WHERE ??=?';
  const fields = ['blocked', blocked, 'blockeAt', blockedAt, 'id', id];
  return { query, fields };
};

exports.queryUltimoAcesso = (id, ultimoAcesso) => {
  const query = 'UPDATE usuarios SET ??=? WHERE ??=?';
  const fields = ['ultimoAcesso', ultimoAcesso, 'id', id];
  return { query, fields };
};

exports.queryPegaPerfilPorEmail = email => {
  const query = `select usuarios.id as uid , usuarios.Nome , usuarios.Email, funcao.funcao from usuarios inner join perfis on perfis.UsuarioId = usuarios.Id inner join funcao on funcao.id = perfis.FuncaoId where usuarios.Email="${email}"`;
  return { query };
};

exports.queryPegarUsuarioPorId = id => {
  const query = `SELECT nome, email, cpf, imagemperfil, UltimoAcesso, PasswordExpirationDate FROM usuarios WHERE ?? = ?`;
  const fields = ['usuarios.id', id];
  return { query, fields };
};

exports.queryPegarTodosUsuarios = () => {
  const query = `SELECT nome, email, cpf, imagemperfil, createAt, blocked, deleted, passwordExpirationDate FROM usuarios`;
  return { query };
};

exports.queryUpdateUser = (nome, imagemPerfil, updateAt, id) => {
  const query = `UPDATE usuarios SET ??=?, ??=?, ??=? where ??=?`;
  const fields = ['nome', nome, 'imagemPerfil', imagemPerfil, 'updateAt', updateAt, 'id', id];
  return { query, fields };
};

exports.queryDeleteUser = (deleted, deleteAt, id) => {
  const query = `UPDATE usuarios SET ??=?, ??=? where ??=?`;
  const fields = ['deleted', deleted, 'deleteAt', deleteAt, 'id', id];
  return { query, fields };
};

exports.queryUsersByNome = nome => {
  const query = `SELECT nome, email, cpf, imagemperfil, createAt, blocked, deleted, passwordExpirationDate FROM usuarios WHERE ?? LIKE ? order by nome asc`;
  const fields = ['nome', nome];
  return { query, fields };
};
