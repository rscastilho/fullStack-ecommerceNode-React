const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

exports.validateUserByToken = async (req, res, id, next) => {
  try {
    const pegarToken = req.headers.authorization;
    const token = pegarToken && pegarToken.split(' ')[1];
    if (!pegarToken) {
      res.status(400).json({ message: 'Acesso negado' });
      return false;
    }
    const validaToken = jwt.verify(token, jwtSecret);
    if (!validaToken) {
      res.status(400).json({ message: 'Erro na autenticação do token' });
      return false;
    }
    if (validaToken.id !== id) {
      res.status(400).json({ message: 'Você não pode atualizar informações de outro usuário' }).end();
      return false;
    }
    return;
  } catch (error) {
    return error;
  }
};
