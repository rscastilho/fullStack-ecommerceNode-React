const _userRepository = require('../../estoque.data/repositories/usersRepository');
const validatePassword = require('../../estoque.crosscutting/Utils/validatePassword');
const geraToken = require('../../estoque.crosscutting/Utils/createJwtToken');
const sql = require('../../estoque.data/db/DbContext');

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const userByEmail = await _userRepository.userByEmail(email);
    //valida se a senha esta vazia ou nula
    if (senha.trim() === 0 || senha.trim() === null || senha.trim() === '') {
      res.status(404).json({ message: 'Insira uma senha válida' });
      return;
    }
    //valida usuario antes de logar
    sql.query(userByEmail.query, userByEmail.fields, (err, data) => {
      err && res.status(404).json({ erro: err });
      if (data.length === 0) {
        res.status(404).json({ message: 'Email não cadatrado no sistema' });
        return;
      } else if (data[0].Blocked > 0) {
        res.status(404).json({ message: 'Usuario bloqueado! Contate o administrador do sistema' });
        return;
      } else if (data[0].PasswordExpirationDate < Date.now()) {
        res.status(404).json({ message: 'Sua senha expirou! Contate o administrador do sistema' });
        return;
      } else if (data[0].Deleted > 0) {
        res.status(404).json({ message: 'Usuario deletado! Contate o administrador do sistema' });
        return;
      }
      validatePassword.validatePassword(senha, data[0].Senha, data[0].Id).then(result => {
        if (result.includes('Login realizado com sucesso!')) {
          //carrega o usuario e o perfil
          _userRepository.pegePerfilUSuarioPorEmail(data[0].Email).then(pegaPerfil => {
            sql.query(pegaPerfil.query, (err, userPerfil) => {
              err && console.log('encontrou erro no pega perfil', err);
              //cria o token baseado no perfil criado para validacao de rota
              geraToken(userPerfil[0].uid, userPerfil[0].Nome, userPerfil[0].Email, userPerfil[0].funcao).then(createToken => {
                res.status(200).json({
                  message: `Bem vindo ${data[0].Nome.toUpperCase()}! ${result}`,
                  user: {
                    userId: userPerfil[0].uid,
                    nome: userPerfil[0].Nome,
                    email: userPerfil[0].Email,
                  },
                  token: createToken,
                });
                //registra ultimo login realizado pelo usuario

                const ultimoAcesso = new Date();
                _userRepository.registraUltimoAcesso(data[0].Id, ultimoAcesso).then(result => {
                  sql.query(result.query, result.fields);
                });
              });
            });
          });

          //criacao de envio de token jwt
        } else {
          res.status(404).json({ message: result });
        }
      });
    });
  } catch (error) {
    console.log('Erro ao registrar', error);
    res.status(422).json({ message: 'Erro encontrado', error });
  }
};
