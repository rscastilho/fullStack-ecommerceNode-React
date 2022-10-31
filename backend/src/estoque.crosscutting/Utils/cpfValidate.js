const { cpf } = require('cpf-cnpj-validator');

const cpfValidator = cpfNumber => {
  const validar = cpf.isValid(cpfNumber);
  if (validar) {
    return true;
  } else {
    return false;
  }
};

module.exports = cpfValidator;
