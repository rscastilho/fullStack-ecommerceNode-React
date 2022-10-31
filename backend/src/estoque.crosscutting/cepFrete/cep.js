const { consultarCep } = require('correios-brasil');

const consultarCEP = async cep => {
  try {
    const result = await consultarCep(cep);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = consultarCEP;
