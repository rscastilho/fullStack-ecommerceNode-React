const _productRepository = require('../../estoque.data/repositories/productsRepository');
const sql = require('../../estoque.data/db/DbContext');
const { deleteImgProduct } = require('../../estoque.crosscutting/uploadImages/deleteImgProduct');
const { deleteImgAvatar } = require('../../estoque.crosscutting/uploadImages/deleteImgAvatar');

exports.getAllProducts = async (req, res) => {
  try {
    const itensPorPagina = parseInt(req.query.itensPorPagina);
    const pagina = parseInt(req.query.pagina);
    const result = await _productRepository.getAllProducts(itensPorPagina, pagina);
    let quantidade = 0;
    sql.query(result.query, result.fields, (err, data) => {
      err && res.status(404).json({ message: 'Erro ', err });
      if (data.length < 1) {
        res.status(404).json({ message: 'Nenhum produto encontrado' });
      } else {
        _productRepository.getCountProducts().then(qtd => {
          sql.query(qtd.query, (err, dataQtd) => {
            err && res.status(404).json({ message: 'Erro ', err });
            quantidade = dataQtd[0].quantidade;
            res.status(200).json({ quantidade, registros: data.length, data });
          });
        });
      }
    });
  } catch (error) {
    return error;
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await _productRepository.getProductById(id);
    sql.query(result.query, result.fields, (err, data) => {
      err && res.status(404).json({ erro: err });
      if (data.length < 1) {
        res.status(404).json({ erro: 'Nenhum produto encontrado' });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (error) {
    return error;
  }
};

exports.getProductByIdAll = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await _productRepository.getProductByIdAll(id);
    sql.query(result.query, result.fields, (err, data) => {
      err && res.status(404).json({ erro: err });
      if (data.length < 1) {
        res.status(404).json({ erro: 'Nenhum produto encontrado' });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (error) {
    return error;
  }
};

exports.getProductByDescricao = async (req, res) => {
  try {
    const descricao = req.params.descricao;
    const result = await _productRepository.getProductByDescricao(`%${descricao}%`);
    sql.query(result.query, result.fields, (err, data) => {
      err && console.log(err);
      err && res.status(500).json({ message: 'Erro ao carregar produtos', err });
      if (!data) {
        res.status(404).json({ message: 'Nenhum produto encontrado' });
        return;
      } else {
        res.status(200).json({ registros: data.length, data });
        return;
      }
    });
  } catch (error) {
    return error;
  }
};

exports.getProductsByCategoriaId = async (req, res) => {
  try {
    const { categoriaId } = req.params;
    if (categoriaId === NaN) {
      res.status(400).json({ message: 'Formato não permitido.', err });
      return;
    }
    const result = await _productRepository.getProductsByCategoriaId(categoriaId);
    sql.query(result.query, result.fields, (err, data) => {
      err && res.status(400).json({ message: 'Erro ao processar informações', err });
      if (data.length < 1) {
        res.status(404).json({
          registros: data.length,
          message: 'Categoria não encontrada',
        });
        return;
      } else {
        res.status(200).json({ registros: data.length, data });
        return;
      }
    });
  } catch (error) {
    return error;
  }
};

exports.createProduct = async (req, res) => {
  try {
    console.log('cheguei no post');
    const { descricao, quantidadeEstoque, quantidadeMinima, valor, categoriaId, fornecedorId } = req.body;
    const createAt = new Date();
    const imagemUrl = 'cadastraImagem.jpg';
    const valorTotal = +quantidadeEstoque * +valor;
    const result = await _productRepository.postCreateProduct(
      createAt,
      descricao,
      quantidadeEstoque,
      quantidadeMinima,
      valor,
      valorTotal,
      categoriaId,
      imagemUrl,
      fornecedorId,
    );
    sql.query(result.query, result.fields, (err, data) => {
      err && res.status(404).json({ message: 'Erro ao cadastrar produto', err });
      if (!data) {
        res.status(404).json({ message: 'Não foi possivel cadastrar o produto', err });
      } else {
        _productRepository.getProductById(data.insertId).then(data => {
          sql.query(data.query, data.fields, (err, data) => {
            err && err.status(404).json({ message: 'Erro', err });
            res.status(200).json({ message: 'Produto cadastrado com sucesso!', data });
            return;
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let imagemUrl = null;
    //verifica se existe alguma foto enviada
    if (req.file) {
      console.log('testeste', req.file);
      imagemUrl = req.file.filename;
      console.log('teste', imagemUrl);
    }

    let { descricao, quantidadeEstoque, quantidadeMinima, valor, valorTotal, categoriaId, fornecedorId, imagemDestaque, destacarImagem, deleted } = req.body;
    const pegarProduto = await _productRepository.getProductById(id);
    sql.query(pegarProduto.query, pegarProduto.fields, (err, data) => {
      err && res.status(400).json({ message: 'Erro ao processar informacoes', err });
      data.map(prod => {
        const updateAt = new Date();
        descricao ? descricao : (descricao = prod.Produto);
        quantidadeEstoque ? quantidadeEstoque : (quantidadeEstoque = prod.QuantidadeEstoque);
        quantidadeMinima ? quantidadeMinima : (quantidadeMinima = prod.QuantidadeMinima);
        valor ? valor : (valor = prod.Valor);
        valorTotal = quantidadeEstoque * valor;
        categoriaId ? categoriaId : (categoriaId = prod.categoriaId);
        //deleta a imagem existente e atualiza a nova

        fornecedorId ? fornecedorId : (fornecedorId = prod.fornecedorid);
        imagemDestaque ? imagemDestaque : (imagemDestaque = prod.ImagemDestaque);
        destacarImagem ? destacarImagem : (destacarImagem = prod.DestacarImagem);
        deleted ? deleted : (deleted = prod.deleted);

        _productRepository
          .putProduct(
            updateAt,
            descricao,
            quantidadeEstoque,
            quantidadeMinima,
            valor,
            valorTotal,
            categoriaId,
            fornecedorId,
            imagemDestaque,
            destacarImagem,
            deleted,
            id,
          )
          .then(result => {
            sql.query(result.query, result.fields, (err, data) => {
              err && res.status(404).json({ message: 'Erro ao atualizar produto', err });
              res.status(200).json({
                message: `Produto ${prod.Produto} atualizado com sucesso!`,
              });
            });
          });
      });
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.saveProductImagem = async (req, res) => {
  try {
    const { id } = req.params;
    let imagemUrl = '';
    if (req.file) {
      imagemUrl = req.file.filename;
    }
    const updateAt = new Date();
    const pegarProduto = await _productRepository.getProductById(id);
    sql.query(pegarProduto.query, pegarProduto.fields, (err, data) => {
      err && err.status(400).json({ message: 'Erro ao carregar produto', err });
      if (imagemUrl) {
        deleteImgProduct('', '', '', id).then(x => {});
      } else {
        imagemUrl = data.ImagemUrl;
        return;
      }
      _productRepository.putImageProduct(updateAt, imagemUrl, id).then(result => {
        sql.query(result.query, result.fields, (err, data) => {
          err && res.status(400).json({ message: 'Erro ao processar imagens', err });
          data && res.status(200).json({ message: 'Imagem atualizada com sucesso!' });
          return;
        });
      });
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAt = new Date();
    const deleted = true;
    const result = await _productRepository.deleteProduct(deletedAt, deleted, id);
    sql.query(result.query, result.fields, (err, data) => {
      err && res.status(400).json({ message: 'Erro ao deletar produto', err });
      if (data) {
        res.status(200).json({ message: 'Deletado com sucesso!', data });
      } else {
        res.status(404).json({ message: 'Erro ao deletar produto', data });
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
