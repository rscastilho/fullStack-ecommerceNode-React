const {
  queryRegisterUsers,
  queryUserByEmail,
  queryUserByCPF,
  queryEmailOrCpf,
  queryPegaSenhaErrada,
  queryAtualizaSenhaErrada,
  queryBloquearSenha,
  queryUltimoAcesso,
  queryPegaPerfilPorEmail,
  queryPegarUsuarioPorId,
  queryUpdateUser,
  queryDeleteUser,
  queryPegarTodosUsuarios,
  queryUsersByNome,
} = require('../queries/usersQueries.js');

exports.register = async (createAt, nome, email, cpf, senha, passwordExpirationDate, imagemPerfil) => {
  try {
    return queryRegisterUsers(createAt, nome, email, cpf, senha, passwordExpirationDate, imagemPerfil);
  } catch (error) {
    return error;
  }
};

exports.userByEmail = async email => {
  try {
    return queryUserByEmail(email);
  } catch (error) {
    return error;
  }
};

exports.userByCpf = async cpf => {
  try {
    return queryUserByCPF(cpf);
  } catch (error) {
    console.log('achei o erro', error);
    return error;
  }
};

exports.userByEmailOrCpf = async (email, cpf) => {
  try {
    return queryEmailOrCpf(email, cpf);
  } catch (error) {
    console.log('erro ao buscar email ou cpf');
    return error;
  }
};

exports.pegaSenhaErrada = async id => {
  try {
    return queryPegaSenhaErrada(id);
  } catch (error) {
    console.log('erro ao peganhar senha errada');
    return error;
  }
};

exports.atualizaSenhaErrada = async (id, erroSenha) => {
  try {
    return queryAtualizaSenhaErrada(id, erroSenha);
  } catch (error) {
    console.log('erro ao peganhar senha errada');
    return error;
  }
};

exports.bloqueaSenha = async (blocked, blockedAt, id) => {
  try {
    return queryBloquearSenha(blocked, blockedAt, id);
  } catch (error) {
    return error;
  }
};

exports.registraUltimoAcesso = async (id, ultimoAcesso) => {
  try {
    return queryUltimoAcesso(id, ultimoAcesso);
  } catch (error) {
    return error;
  }
};

exports.pegePerfilUSuarioPorEmail = async email => {
  try {
    return queryPegaPerfilPorEmail(email);
  } catch (error) {
    return error;
  }
};

exports.pegarUsuarioPorId = async id => {
  try {
    return queryPegarUsuarioPorId(id);
  } catch (error) {
    return error;
  }
};

exports.updateUser = async (nome, imagemPerfil, updateAt, id) => {
  try {
    return queryUpdateUser(nome, imagemPerfil, updateAt, id);
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.deleteUser = async (deleted, deleteAt, id) => {
  try {
    return queryDeleteUser(deleted, deleteAt, id);
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.getAllUsers = async () => {
  try {
    return queryPegarTodosUsuarios();
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.getUsersByNome = async nome => {
  try {
    return queryUsersByNome(nome);
  } catch (error) {
    return error;
  }
};
