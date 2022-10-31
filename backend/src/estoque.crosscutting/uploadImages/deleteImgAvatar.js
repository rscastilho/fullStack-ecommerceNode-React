const multer = require('multer');
const fs = require('fs');
const path = require('path');
const _userRepository = require('../../estoque.data/repositories/usersRepository');
const sql = require('../../estoque.data/db/DbContext');

const deleteImgAvatar = async (req, res, next, id) => {
  // const id = parseInt(req.params.id);
  const result = await _userRepository.pegarUsuarioPorId(id);
  sql.query(result.query, result.fields, (err, data) => {
    let file = data[0].imagemperfil;
    if (file) {
      fs.unlink(`src/estoque.application/public/${file}`, err => {
        err && console.log(err);
        // res.status(200).json({message:"Avatar atualizado com sucesso!"})
        // next()
        return;
      });
    } else {
      next();
      return;
    }
  });
};

module.exports = { deleteImgAvatar };
