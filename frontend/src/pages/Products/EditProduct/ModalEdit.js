import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './ModalEdit.module.css';
import Input from './../../../components/Form/Input';
import { UtilService } from './../../../utils/UtilService';
import { GetByIdAll } from '../../../api/ProductsApi';
import { getAllCategories } from '../../../api/CategoryApi';
import { getAllSuppliers } from '../../../api/SupplierApi';
import { putProduct } from '../../../api/ProductsApi';
import { toast } from 'react-toastify';
import { AddProductImage } from './../../../components/AddProductImage/AddProductImage';

const ModalEdit = ({ id, setLoop, loop, setId }) => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categoriaId, setCategoriaId] = useState('');
  const [deleteAt, setDeleteAt] = useState('');
  const [deleted, setDeleted] = useState('');
  const [descricao, setDescricao] = useState('');
  const [destacarImagem, setDestacarImagem] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');
  const [imagemDestaque, setImagemDestaque] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [itensCarrinhoId, setItensCarrinhoId] = useState('');
  const [quantidadeEstoque, setQuantidadeEstoque] = useState('');
  const [quantidadeMinima, setQuantidadeMinima] = useState('');
  const [updateAt, setUpdateAt] = useState('');
  const [valor, setValor] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [imagemCarregada, setImagemCarregada] = useState('');
  const [imageFile, setImageFile] = useState();
  const inputRefFile = useRef();

  const productImagem = imageFile;

  const productSave = {
    categoriaId,
    deleteAt,
    deleted,
    descricao,
    destacarImagem,
    fornecedorId,
    id,
    imagemDestaque,
    imagemUrl,
    itensCarrinhoId,
    quantidadeEstoque,
    quantidadeMinima,
    updateAt,
    valor,
    valorTotal,
    imageFile,
  };

  const productById = useCallback(async () => {
    try {
      if (id) {
        const result = await GetByIdAll(id);
        if (result.erro) {
          console.log(result.erro);
          return;
        } else {
          setCategoriaId(result[0].CategoriaId);
          setDeleteAt(result[0].DeleteAt);
          setDeleted(result[0].Deleted);
          setDescricao(result[0].Descricao);
          setDestacarImagem(result[0].DestacarImagem);
          setFornecedorId(result[0].FornecedorId);
          setImagemDestaque(result[0].ImagemDestaque);
          setImagemUrl(result[0].ImagemUrl);
          setItensCarrinhoId(result[0].ItensCarrinhoId);
          setQuantidadeEstoque(result[0].QuantidadeEstoque);
          setQuantidadeMinima(result[0].QuantidadeMinima);
          setUpdateAt(result[0].UpdateAt);
          setValor(result[0].Valor);
          setValorTotal(result[0].ValorTotal);
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }, [id]);

  const file = () => {
    inputRefFile.current.click();
  };

  const carregarImagem = (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      if (e.target.files[0]) {
        const image = e.target.files[0];
        if (
          image.type === 'image/jpeg' ||
          image.type === 'image/png' ||
          image.type === 'image/jpg'
        ) {
          setImagemCarregada(URL.createObjectURL(e.target.files[0]));
          formData.append('imageFile', e.target.files[0]);
          setImageFile(formData);
          setImagemUrl(e.target.value.slice(12).trim());
        } else {
          alert('Formato de imagem não permitido');
          return;
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const mandaImagem = async (id, imageFile, imagemUrl) => {
    try {
      AddProductImage(id, imageFile).then((result) => {
        toast.success(result.message, {
          autoClose: 1500,
          position: 'bottom-center',
        });
        putProduct(id, imagemUrl);
      });
    } catch (error) {
      toast.error(error.message, {
        autoClose: 1500,
        position: 'bottom-center',
      });
    }
  };

  useEffect(() => {
    if (imageFile) {
      mandaImagem(id, productImagem, imagemUrl).then((x) => {});
    }
  }, [imageFile]);

  const carregarCategorias = async () => {
    try {
      const result = await getAllCategories();
      setCategories(result.data);
    } catch (error) {}
  };
  const carregarFornecedores = async () => {
    try {
      const result = await getAllSuppliers();
      setSuppliers(result.data);
    } catch (error) {}
  };

  const handleUpdate = async () => {
    try {
      const result = await putProduct(id, productSave);
      toast.success(result.message, { autoClose: 1000 });
      setLoop(!loop);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useMemo(() => {
    productById();
    carregarCategorias();
    carregarFornecedores();
  }, [productById]);

  return (
    <div
      className='modal fade'
      id='modalEdit'
      tabIndex='-1'
      aria-labelledby='ModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='ModalLabel'>
              Atualizar {descricao}
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div>
              {product && (
                <>
                  <form>
                    <div>
                      <Input
                        inputType={'text'}
                        labelValue={'Produto'}
                        value={productSave.descricao}
                        inputPlaceHolder={'Digite a descrição do produto'}
                        handleFunction={(e) => {
                          setDescricao(e.target.value);
                        }}
                      />
                    </div>
                    <div className={`${styles.formProduct}`}>
                      <div>
                        <div className={`${styles.checkboxes}`}>
                          <div>
                            <Input
                              inputType={'number'}
                              labelValue={'Quantidade estoque'}
                              value={quantidadeEstoque}
                              inputPlaceHolder={
                                'Digite a quantidade de estoque'
                              }
                              handleFunction={(e) => {
                                setQuantidadeEstoque(e.target.value);
                                setValorTotal(quantidadeEstoque * valor);
                              }}
                            />
                          </div>
                          <div>
                            <Input
                              inputType={'number'}
                              labelValue={'Quantidade Minima'}
                              value={quantidadeMinima}
                              inputPlaceHolder={'Digite a quantidade minima'}
                              handleFunction={(e) => {
                                setQuantidadeMinima(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className={`${styles.checkboxes}`}>
                          <div>
                            <Input
                              inputType={'text'}
                              labelValue={'Valor'}
                              value={UtilService.formatCurrency(valor)}
                              inputPlaceHolder={'Digite o valor'}
                              handleFunction={(e) => {
                                setValor(e.target.value);
                                setValorTotal(quantidadeEstoque * valor);
                              }}
                            />
                          </div>
                          <div>
                            <Input
                              inputType={'text'}
                              labelValue={'Valor Total'}
                              value={UtilService.formatCurrency(
                                quantidadeEstoque * valor
                              )}
                              inputPlaceHolder={'Digite 0 valor total'}
                            />
                          </div>
                        </div>
                        <div className={`${styles.imagemBox}`}>
                          <img
                            className={`${styles.imagem}`}
                            src={
                              !imagemCarregada
                                ? `http://localhost:5000/imagensprodutos/${imagemUrl}`
                                : imagemCarregada
                            }
                            onClick={file}
                            alt={imagemUrl}
                          />
                          <input
                            type='file'
                            className={`${styles.inputFile}`}
                            ref={inputRefFile}
                            onChange={carregarImagem}
                          />
                        </div>
                      </div>
                      <div>
                        <div>
                          Categorias:
                          <select
                            className='form-select form-select-sm'
                            aria-label='.form-select-sm example'
                            value={categoriaId}
                            onChange={(e) => setCategoriaId(e.target.value)}
                          >
                            {categories &&
                              categories.map((item) => (
                                <option key={item.Id} value={item.Id}>
                                  {item.Descricao}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div>
                          Fornecedores:
                          <select
                            className='form-select form-select-sm'
                            aria-label='.form-select-sm example'
                            value={fornecedorId}
                            onChange={(e) => setFornecedorId(e.target.value)}
                          >
                            {suppliers &&
                              suppliers.map((item) => (
                                <option key={item.Id} value={item.Id}>
                                  {item.RazaoSocial}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div>
                          <div>
                            <label className='form-check-label'>Deletado</label>
                            <br />
                            <input
                              className='form-check-input'
                              type='checkbox'
                              checked={deleted}
                              onChange={(e) => {
                                setDeleted(deleted ? 0 : 1);
                              }}
                            />
                          </div>
                          <div>
                            <label className='form-check-label'>
                              Destacar Imagem
                            </label>
                            <br />
                            <input
                              className='form-check-input'
                              type='checkbox'
                              checked={destacarImagem}
                              onChange={() =>
                                setDestacarImagem(!destacarImagem)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
          <div className={`modal-footer ${styles.botoes}`}>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
              onClick={() => {
                setImagemCarregada('');
                setId('');
              }}
            >
              Fechar
            </button>
            <button
              type='submit'
              className='btn btn-primary'
              data-bs-dismiss='modal'
              onClick={handleUpdate}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
