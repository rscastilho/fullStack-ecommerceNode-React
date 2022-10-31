const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const _userRepository = require('../../estoque.data/repositories/usersRepository');
const sql = require('../../estoque.data/db/DbContext');
const { validateUserByToken } = require('./../../estoque.crosscutting/Utils/validateUserByToken');
const { deleteImgAvatar } = require('../../estoque.crosscutting/uploadImages/deleteImgAvatar');
const { json } = require('express');

exports.pegarUserById = async (req, res) => {
  try {
    //linhas abaixo para validação foram reduzidas com a funcao em utils.
    //somente o usuario logado poderá acessar as informacoes proprias.
    const pegarToken = req.headers.authorization;
    const id = parseInt(req.params.id);
    const token = pegarToken && pegarToken.split(' ')[1];
    if (!pegarToken) return res.status(400).json({ message: 'Acesso negado' });
    const validaToken = jwt.verify(token, jwtSecret);
    if (!validaToken) return res.status(404).json({ message: 'Erro na autenticação do token' });
    if (validaToken.id !== id) {
      return res.status(400).json({ message: 'Você não pode acessar informações de outro usuário' });
    } else {
      const user = await _userRepository.pegarUsuarioPorId(id);
      sql.query(user.query, user.fields, (err, data) => {
        err && res.status(404).json({ message: 'Erro ao carregar informações do usuário', err });
        res.status(200).json(data);
      });
    }
  } catch (error) {
    return error;
  }
};

exports.updateAvatarUser = async (req, res) => {
  try {
    //pega id do body
    const id = parseInt(req.params.id);
    let { nome } = req.body;
    imagemPerfil = req.file.filename;
    //valida se o usuario logado é o mesmo do token
    if ((await validateUserByToken(req, res, id)) === false) {
      return;
    }
    //carrega usuario por id, e atualiza as informações se forem enviadas.
    await _userRepository.pegarUsuarioPorId(id).then(data => {
      sql.query(data.query, data.fields, (err, dataUser) => {
        err && res.status(404).json(err);
        dataUser.map(userFields => {
          nome ? nome : (nome = userFields.nome);
          if (imagemPerfil) {
            imagemPerfil = imagemPerfil;
            deleteImgAvatar('', '', '', id).then(x => {});
          } else {
            imagemPerfil = userFields.imagemperfil;
            return;
          }
          const updateAt = new Date();
          _userRepository.updateUser(nome, imagemPerfil, updateAt, id).then(atualizaDados => {
            sql.query(atualizaDados.query, atualizaDados.fields, (err, data) => {
              err && res.status(400).json(err);
              res.status(200).json({ message: `Avatar atualizado com sucesso.` });
              return;
            });
          });
        });
      });
    });
  } catch (error) {
    return error;
  }
};

exports.updateUser = async (req, res) => {
  try {
    //pega id do body
    const id = parseInt(req.params.id);
    let { nome, imagemPerfil } = req.body;
    //valida se o usuario logado é o mesmo do token
    if ((await validateUserByToken(req, res, id)) === false) {
      return;
    }
    //carrega usuario por id, e atualiza as informações se forem enviadas.
    await _userRepository.pegarUsuarioPorId(id).then(data => {
      sql.query(data.query, data.fields, (err, dataUser) => {
        err && res.status(404).json(err);
        dataUser.map(userFields => {
          nome ? nome : (nome = userFields.nome);
          imagemPerfil ? imagemPerfil : (imagemPerfil = userFields.imagemperfil);
          const updateAt = new Date();
          _userRepository.updateUser(nome, imagemPerfil, updateAt, id).then(atualizaDados => {
            sql.query(atualizaDados.query, atualizaDados.fields, (err, data) => {
              err && res.status(400).json(err);
              res.status(200).json({ message: `Usuário atualizado com sucesso.` });
              return;
            });
          });
        });
      });
    });
  } catch (error) {
    return error;
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { deleted } = req.body;
    const deleteAt = new Date();
    const deleteUser = await _userRepository.deleteUser(deleted, deleteAt, id);

    sql.query(deleteUser.query, deleteUser.fields, (err, data) => {
      err && res.status(400).json({ message: 'Erro ao tentar deletar usuário', err });
      res.status(200).json({ message: 'Usuário deletado com sucesso!' });
      return;
    });
  } catch (error) {
    return error;
  }
};

exports.getlAllUsers = async (req, res) => {
  try {
    const result = await _userRepository.getAllUsers();
    sql.query(result.query, (err, data) => {
      err && res.status(404).json({ message: 'Erro ao carregar usuários', err });
      res.status(200).json({ registros: data.length, data });
      return;
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.getUsersByNome = async (req, res) => {
  try {
    const { nome } = req.params;
    const nomes = `%${nome}%`;
    const result = await _userRepository.getUsersByNome(nomes);
    sql.query(result.query, result.fields, (err, data) => {
      if (err) {
        return res.status(404).json({ message: 'Erro ao pesquisar usuários', err });
      }
      if (data.length < 1) {
        res.status(200).json({ registros: data.length, message: 'Nenhum usuário encontrado' });
        return;
      } else {
        res.status(200).json({ registros: data.length, data });
        return;
      }
    });
  } catch (error) {
    return error;
  }
};
