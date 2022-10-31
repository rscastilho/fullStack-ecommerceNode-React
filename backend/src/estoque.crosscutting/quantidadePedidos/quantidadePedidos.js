const _purchaseOrderRepository = require('../../estoque.data/repositories/purchaseOrderRepository');
const sql = require('../../estoque.data/db/DbContext');

const pegarQuantidadeEstoque = async itensCarrinho => {
  try {
    itensCarrinho.map(pegaitem => {
      _purchaseOrderRepository.getPegarQuantidadeEstoque(pegaitem.Id).then(itemCarregado => {
        sql.query(itemCarregado.query, itemCarregado.fields, (err, data) => {
          err && console.log('erro aqui', err);
          data.map(quantidadeAtual => {
            if (quantidadeAtual.quantidadeestoque < pegaitem.quantidade) {
              res.status(400).json({ message: 'Quantidade no estoque menor do que você esta pedindo' });
              return;
            }
          });
        });
      });
    });
  } catch (error) {
    return error;
  }
};

const baixarEstoque = async (quantidade, id) => {
  try {
    const result = await _purchaseOrderRepository.postBaixarEstoque(quantidade, id);
    sql.query(result.query, result.fields, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      if (data) {
        return data;
      }
    });
  } catch (error) {
    // res.status(404).json({ error: "Erro ao baixar quantidade do estoque", error })
    console.log(error);
    return error;
  }
};

module.exports = {
  pegarQuantidadeEstoque,
  baixarEstoque,
};
