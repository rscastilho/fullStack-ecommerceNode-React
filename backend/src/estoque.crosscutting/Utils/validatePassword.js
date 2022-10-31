const sql = require('../../estoque.data/db/DbContext');
const _userRepository = require('../../estoque.data/repositories/usersRepository');
const bcrypt = require('bcrypt');

const validatePassword = async (senhaDigitada, senhaCadastrada, id) => {
  if (bcrypt.compareSync(senhaDigitada, senhaCadastrada)) {
    _userRepository.atualizaSenhaErrada(id, 0).then(data => {
      sql.query(data.query, data.fields, (err, result) => {});
    });
    return 'Login realizado com sucesso!';
  } else {
    const pegaSenhaErrada = await _userRepository.pegaSenhaErrada(id);
    sql.query(pegaSenhaErrada.query, pegaSenhaErrada.fields, (err, data) => {
      err && console.log('erro encontrado ao carregar erro da senha', err);
      if (data[0].ErroSenha === 5) {
        const blockedAt = new Date();
        const blocked = true;
        _userRepository.bloqueaSenha(blocked, blockedAt, id).then(data => {
          sql.query(data.query, data.fields, (err, result) => {});
        });
      } else {
        let senhaErrada = data[0].ErroSenha + 1;
        _userRepository.atualizaSenhaErrada(id, senhaErrada).then(data => {
          sql.query(data.query, data.fields, (err, result) => {});
        });
      }
    });
  }
  return `Senha incorreta!`;
};

module.exports = { validatePassword };
