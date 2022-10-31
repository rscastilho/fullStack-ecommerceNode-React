const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const gerarToken = async (id, nome, email, perfil) => {
  try {
    return jwt.sign({ id, nome, email, perfil }, jwtSecret, { expiresIn: 10000 });
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = gerarToken;
