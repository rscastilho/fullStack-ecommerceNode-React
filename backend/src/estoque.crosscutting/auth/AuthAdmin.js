const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const userRepository = require('../../estoque.data/repositories/usersRepository');
const mysql = require('../../estoque.data/db/DbContext');

const AuthAdmin = async (req, res, next) => {
  const pegaToken = req.headers.authorization;
  const token = pegaToken && pegaToken.split(' ')[1];
  if (!token) return res.status(404).json({ message: 'acesso negado' });
  try {
    const validarToken = jwt.verify(token, jwtSecret);
    const resultado = await userRepository.userByEmail(validarToken.email);
    mysql.query(resultado.query, resultado.fields, (err, data) => {
      err && res.status(404).json({ message: 'Erro ao validar', err });
      if (data.length > 0 && validarToken.perfil === 'Administrador') {
        next();
      } else {
        res.status(404).json({ message: 'Acesso restrito ao administrador do sistema' });
        return;
      }
    });
  } catch (error) {
    res.status(404).json({ message: 'Token expirado' });
  }
};
module.exports = AuthAdmin;
