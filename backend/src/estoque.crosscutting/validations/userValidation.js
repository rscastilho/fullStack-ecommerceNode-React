const { body } = require('express-validator');

const userRegisterValidation = () => {
  return [
    body('nome').isString().withMessage('Campo nome é obrigatório').isLength({ min: 5, max: 60 }).withMessage('Campo nome, minimo 5 e maximo 60 caracteres'),
    body('email').isString().withMessage('Campo email é obrigatório').isEmail().withMessage('Insira um email em formato válido'),
    body('cpf').isString().withMessage('Campo CPF é obrigatório').isLength({ min: 11, max: 14 }).withMessage('Campo CPF, minimo 11 e maximo 14 caracteres'),
    body('senha').isString().withMessage('Campo senha é obrigatório').isLength({ min: 4, max: 15 }).withMessage('Campo senha, minimo 4 e máximo 15 caracteres'),
    body('confirmarSenha')
      .isString()
      .withMessage('Confirmação da senha é obrigatória')
      .custom((value, { req }) => {
        if (value !== req.body.senha) {
          throw new Error('As senhas devem ser iguais');
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body('email').isString().withMessage('Prenchimento do email é obrigatório').isEmail().withMessage('Informe um email válido'),
    body('senha').isString().withMessage('Preenchimento da senha é obrigatório'),
  ];
};

const updateUserValidation = () => {
  return [
    body('nome').optional().isLength({ min: 5, max: 60 }).withMessage('Campo nome, minimo 5 e maximo 60 caracteres'),
    body('email').optional().isEmail().withMessage('Insira um email em formato válido'),
    body('imagemPerfil').optional(),
  ];
};

module.exports = { userRegisterValidation, loginValidation, updateUserValidation };
