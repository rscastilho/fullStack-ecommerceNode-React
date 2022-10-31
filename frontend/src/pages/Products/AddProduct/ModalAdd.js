import React, { useEffect, useState } from 'react';
import styles from './ModalAdd.module.css';
import { postCreateProduct } from '../../../api/ProductsApi';
import { getAllCategories } from '../../../api/CategoryApi';
import { getAllSuppliers } from '../../../api/SupplierApi';
import { toast } from 'react-toastify';
import Input from './../../../components/Form/Input';
import { UtilService } from './../../../utils/UtilService';

const ModalAdd = ({ setLoop, loop }) => {
  const [descricao, setDescricao] = useState('');
  const [quantidadeEstoque, setQuantidadeEstoque] = useState('');
  const [quantidadeMinima, setQuantidadeMinima] = useState('');
  const [valor, setValor] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  const data = {
    descricao,
    quantidadeEstoque,
    quantidadeMinima,
    valor,
    categoriaId,
    fornecedorId,
  };

  const getAllCategorias = async () => {
    try {
      const result = await getAllCategories();
      if (result) {
        setCategorias(result.data);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const getAllFornecedores = async () => {
    try {
      const result = await getAllSuppliers();
      if (result) {
        setFornecedores(result.data);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const limparForm = () => {
    setDescricao('');
    setQuantidadeEstoque('');
    setQuantidadeMinima('');
    setValor('');
    setCategoriaId('');
    setFornecedorId('');
    setCategorias('');
    setFornecedores('');
  };

  const handleSave = async e => {
    e.preventDefault();
    try {
      const result = await postCreateProduct(data);
      toast.success(result.message, { autoClose: 1000 });
      setLoop(!loop);
      limparForm();
      return result;
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { autoClose: 1000 });
    }
  };

  useEffect(() => {
    getAllCategorias();
    getAllFornecedores();
  }, []);

  return (
    <div className="modal fade" id="modalAdd" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ModalLabel">
              Cadastrar novo produto
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div>
              <form onSubmit={handleSave}>
                <div>
                  <Input
                    labelValue={'Produto'}
                    inputPlaceHolder={'Descrição do produto'}
                    inputType={'text'}
                    value={descricao}
                    handleFunction={e => setDescricao(e.target.value)}
                  />
                </div>
                <div className={`${styles.formProduct}`}>
                  <div>
                    <div>
                      <Input
                        labelValue={'Quantidade estoque'}
                        inputPlaceHolder={'Quantidade estoque'}
                        inputType={'number'}
                        value={quantidadeEstoque}
                        handleFunction={e => setQuantidadeEstoque(e.target.value)}
                      />
                    </div>
                    <div>
                      <Input
                        labelValue={'Quantidade Minima'}
                        inputPlaceHolder={'Quantidade minima'}
                        inputType={'number'}
                        value={quantidadeMinima}
                        handleFunction={e => setQuantidadeMinima(e.target.value)}
                      />
                    </div>
                    <div>
                      <Input
                        labelValue={'Valor'}
                        inputPlaceHolder={'Valor unitário'}
                        inputType={'number'}
                        value={valor}
                        handleFunction={e => setValor(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <Input
                        labelValue={'Valor total'}
                        inputPlaceHolder={'Valor unitário'}
                        inputType={'teste'}
                        value={UtilService.formatCurrency(valor * quantidadeEstoque)}
                      />
                    </div>
                    <div>
                      Categorias:
                      <select
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                        value={categoriaId}
                        onChange={e => setCategoriaId(e.target.value)}
                      >
                        <option selected> Selecione a categoria: </option>
                        {categorias &&
                          categorias.map(item => (
                            <option key={item.Id} value={item.Id}>
                              {item.Descricao}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      Fornecedores:
                      <select
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                        value={fornecedorId}
                        onChange={e => setFornecedorId(e.target.value)}
                      >
                        <option selected> Selecione o fornecedor: </option>
                        {fornecedores &&
                          fornecedores.map(item => (
                            <option key={item.Id} value={item.Id}>
                              {item.RazaoSocial}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div></div>
              </form>
            </div>
          </div>
          <div className={`modal-footer ${styles.botoes}`}>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              {!descricao || !quantidadeEstoque || !quantidadeMinima || !valor || !categoriaId || !fornecedorId ? 'Fechar' : 'Cancelar'}
            </button>

            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleSave}
              disabled={!descricao || !quantidadeEstoque || !quantidadeMinima || !valor || !categoriaId || !fornecedorId ? true : false}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
