const bcrypt = require('bcrypt');

exports.hashPassword = async senha => {
  try {
    const salt = bcrypt.genSaltSync();
    const senhaHash = await bcrypt.hashSync(senha, salt);
    return senhaHash;
  } catch (error) {
    console.log('Erro ao hashear senha', error);
  }
};
