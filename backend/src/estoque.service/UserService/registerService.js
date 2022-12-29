const _userRepository = require('../../estoque.data/repositories/usersRepository');
const mySql = require('../../estoque.data/db/DbContext');
const { hashPassword } = require('../../estoque.crosscutting/Utils/hashPassword');
const cpfValidator = require('../../estoque.crosscutting/Utils/cpfValidate');
const _perfilRepository = require('../../estoque.data/repositories/perfisRepository');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha, cpf } = req.body;
    //registra a data de criacao
    const createAt = new Date();
    //senha expira em 60 dias
    const imagemPerfil = 'perfil.png';
    const passwordExpirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const usuarioExiste = await _userRepository.userByEmailOrCpf(email, cpf);
    const hashSenha = await hashPassword(senha);
    const sql = await _userRepository.register(createAt, nome, email, cpf, hashSenha, passwordExpirationDate, imagemPerfil);
    //valida cpf com cpf validator
    if (cpfValidator(cpf)) {
      //valida se email ou cpf ja existe
      mySql.query(usuarioExiste.query, usuarioExiste.fields, (err, data) => {
        err && res.status(404).json({ message: 'Erro ao processar informacoes', err });
        if (data.length > 0) {
          if (data[0].email === email && data[0].cpf != cpf) {
            res.json({ message: 'email existente' }).end();
            return;
          } else if (data[0].email !== email && data[0].cpf === cpf) {
            res.json({ message: 'cpf existente' }).end();
            return;
          } else if (data[0].email === email && data[0].cpf === cpf) {
            res.json({ message: 'email e cpf existentes' }).end();
            return;
          } else if (data[0].email !== email && data[0].cpf !== cpf) {
            res.json({ message: 'seguir com o cadastro' }).end();
            return;
          }
        } else {
          mySql.query(sql.query, sql.fields, (err, data) => {
            err && res.json({ message: 'Erro ao tentar cadastrar usuário', err });
            res.status(200).json({ message: 'Usuário cadastrado com sucesso!', data });
            _perfilRepository.addUserPerfil(parseInt(data.insertId), parseInt(2)).then(addPerfil => {
              mySql.query(addPerfil.query, (err, datas) => {
                err && res.json(err);
              });
            });
          });
        }
      });
    } else {
      res.status(400).json({ message: 'CPF inválido' });
      return;
    }
  } catch (error) {
    console.log('Erro ao registrar', error);
    res.status(404).json({ message: 'Erro encontrado', error });
     }
};

