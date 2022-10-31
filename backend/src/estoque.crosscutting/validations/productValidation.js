const { body } = require('express-validator');

const productCreateValidation = () => {
  return [
    body('descricao')
      .isString()
      .withMessage('Campo descrição é obrigatório')
      .isLength({ min: 5, max: 60 })
      .withMessage('Campo descrição, minimo 5 e máximo 60 caracteres')
      .notEmpty()
      .trim()
      .withMessage('Não pode ser em branco'),
    body('quantidadeEstoque').isNumeric().withMessage('Campo quantidade estoque é obrigatório'),
    body('quantidadeMinima').isNumeric().withMessage('Campo quantidade Minima é obrigatório'),
    body('valor').isNumeric().withMessage('Campo valor é obrigatório'),
    body('categoriaId').isNumeric().withMessage('Categoria obrigatório'),
    body('fornecedorId').isNumeric().withMessage('Fornecedor obrigatório').notEmpty().trim().withMessage('Não pode ser em branco'),
  ];
};

const productPutValidation = () => {
  return [
    body('descricao')
      .optional()
      .optional()
      .isLength({ min: 5, max: 60 })
      .withMessage('Campo descrição, minimo 5 e máximo 60 caracteres')
      .notEmpty()
      .trim()
      .withMessage('Não pode ser em branco'),
    body('quantidadeEstoque').optional(),
    body('quantidadeMinima').optional(),
    body('valor').optional(),
    body('categoriaId').optional(),
    body('fornecedorId').optional(),
  ];
};
module.exports = { productCreateValidation, productPutValidation };
