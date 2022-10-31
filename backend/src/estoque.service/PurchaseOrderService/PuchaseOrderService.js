const _purchaseOrderRepository = require('../../estoque.data/repositories/purchaseOrderRepository');
const sql = require('../../estoque.data/db/DbContext');
const email = require('../../estoque.crosscutting/sendEmail/sendEmail');
const { pegarQuantidadeEstoque, baixarEstoque } = require('../../estoque.crosscutting/quantidadePedidos/quantidadePedidos');

exports.postCreatePurchaseOrder = async (req, res) => {
  try {
    const { usuarioId, valorTotal, tiposPagamentos } = req.body;
    const itensCarrinho = req.body.itensCart;
    const createAt = new Date();
    const statusPedido = 0;
    let numeroPedido = 0;

    //verifica se o estoque esta abaixo da quantidade comprada
    await pegarQuantidadeEstoque(itensCarrinho);

    const result = await _purchaseOrderRepository.postPurchaseOrder(createAt, usuarioId, valorTotal, +tiposPagamentos, statusPedido);
    sql.query(result.query, result.fields, (err, data) => {
      if (err) {
        console.log('erro na criacao do pedido de compora', err);
        res.status(404).json({ message: 'Erro na criação do pedido de compra', err });
      } else {
        numeroPedido = data.insertId;
        itensCarrinho.map(item => {
          _purchaseOrderRepository.postItensPurchaseOrder(data.insertId, item.Id, item.quantidade, item.Valor).then(result => {
            sql.query(result.query, result.fields, (err, data) => {
              if (err) {
                console.log('erro na criacao dos itens do pedido', err);
                res.status(404).json({ message: 'erro nos itens do pedido', err });
              }
            });
          });
          //abate quantidade comprada do estoque
          baixarEstoque(item.quantidade, item.Id);
          //envia email ao usuario apos o processamento do pedido
          email('rcastilho@gmail.com', `Recebemos seu pedido!! e-commerce webCastDevs`, `Parabéns, seu pedido ${numeroPedido} foi processado com sucesso!`);
        });
        res.status(200).json({ message: `Pedido ${numeroPedido} criado com sucesso!` });
      }
    });
  } catch (error) {
    console.log('erro no purchaseOrderService', error);
    return error;
  }
};

exports.getPedidosByUsuarioId = async (req, res) => {
  try {
    const usuarioId = parseInt(req.params.usuarioId);
    const itensPorPagina = parseInt(req.query.itensPorPagina);
    const pagina = parseInt(req.query.pagina);
    const result = await _purchaseOrderRepository.getPedidosPorUsuarioId(usuarioId, itensPorPagina, pagina);
    let quantidade = 0;
    sql.query(result.query, result.fields, (err, data) => {
      err &&
        res.status(404).json({
          message: 'erro ao processar informações. Usuário não encontrado',
          err,
        });

      if (data && data.length < 1) {
        res.status(400).json({ message: 'Você não tem pedido registrado no sistema' });
        return;
      } else {
        _purchaseOrderRepository.getQuantidadePedidosPorUsuarioId(usuarioId).then(result => {
          sql.query(result.query, result.fields, (err, qtdPedidos) => {
            err && console.log(err);
            quantidade = qtdPedidos[0].quantidade;
            res.status(200).json({
              quantidade,
              Registros: data.length || '',
              data,
            });
          });
        });
        return;
      }
    });
  } catch (error) {
    console.log('erro no purchaseOrderService', error);
    return error;
  }
};

exports.getPedidoByOrderId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await _purchaseOrderRepository.getPedidoPorPedidoId(id);
    sql.query(result.query, result.fields, (err, data) => {
      err &&
        res.status(404).json({
          message: 'erro ao processar informações. Usuário não encontrado',
          err,
        });
      if (!data) {
        res.status(400).json({ message: 'Você não tem pedido registrado no sistema' });
        return;
      } else {
        res.status(200).json({
          Registros: data.length,
          data,
        });
        return;
      }
    });
  } catch (error) {
    console.log('erro no purchaseOrderService', error);
    return error;
  }
};

exports.getPedidoCompletoById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await _purchaseOrderRepository.getPedidoPorPedidoId(id);
    sql.query(result.query, result.fields, (err, data) => {
      err && res.json({ message: 'Erro ao processar carregamento de pedido', err });
      const pedido = data;
      _purchaseOrderRepository.getItensPedidoPorPedidoId(parseInt(data[0].id)).then(itens => {
        sql.query(itens.query, itens.fields, (err, itensPedido) => {
          err &&
            res.json({
              message: 'Erro ao processar carregamento de pedido',
              err,
            });
          res.status(200).json({
            pedido,
            itens: itensPedido.length,
            itensPedido,
          });
        });
      });
      return;
    });
  } catch (error) {
    console.log('erro no purchaseOrderService', error);
    return error;
  }
};
