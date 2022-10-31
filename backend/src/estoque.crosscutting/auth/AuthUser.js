const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const userRepository = require('../../estoque.data/repositories/usersRepository');
const mysql = require('../../estoque.data/db/DbContext');

const AuthUser = async (req, res, next) => {
  try {
    const pegaToken = req.headers.authorization;
    const token = pegaToken && pegaToken.split(' ')[1];
    if (!token) return res.status(400).json({ message: 'acesso negado' });
    const validarToken = jwt.verify(token, jwtSecret);
    userRepository.userByEmail(validarToken.email).then(resultado => {
      mysql.query(resultado.query, resultado.fields, (err, data) => {
        err && res.status(404).json({ message: 'Erro ao validar', err });
        if ((data.length > 0 && validarToken.perfil === 'Administrador') || validarToken.perfil === 'Visitante') {
          next();
        } else {
          res.status(404).json({ message: 'Você precisa logar no sistema para acessar esta página.' });
          return;
        }
      });
    });
  } catch (error) {
    res.status(400).json({ message: 'Token expirado', error });
  }
};

module.exports = AuthUser;
