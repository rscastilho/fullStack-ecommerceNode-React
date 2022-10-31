const { calcularPrecoPrazo } = require('correios-brasil');

const consultarPrecoPrazo = async args => {
  try {
    const result = await calcularPrecoPrazo(args);
    if (!result) {
      console.log('erro');
      return;
    } else {
      return result;
    }
  } catch (error) {
    return error;
  }
};

module.exports = consultarPrecoPrazo;
