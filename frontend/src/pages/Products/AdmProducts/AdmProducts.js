import React, { useEffect, useState } from 'react';
import styles from './AdmProducts.module.css';
import { GetAll } from '../../../api/ProductsApi';
import PageTitle from './../../../components/Title/PageTitle';
import { UtilService } from './../../../utils/UtilService';
import ModalEdit from '../EditProduct/ModalEdit';
import ModalAdd from '../AddProduct/ModalAdd';
import { CgAdd } from 'react-icons/cg';
import { RiDeleteBinFill } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import ModalDelete from './ModalDelete';
import GetProductsByDescription from '../../../components/GetProductsByDescription/GetProductsByDescription';
import Paginacao from '../../../components/Paginacao/Paginacao';
import Loading from '../../../components/Loading/Loading';

const AdmProducts = () => {
  const [products, setProducts] = useState([]);
  const [registros, setRegistros] = useState('');
  const [id, setId] = useState('');
  const [produto, setProduto] = useState('');
  const [loop, setLoop] = useState(false);
  const [exibirAcao, setExibirAcao] = useState(false);
  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [pagina, setPagina] = useState(0);
  const [isloading, setIsloading] = useState(false);

  const acao = () => {
    setExibirAcao(!exibirAcao);
  };

  const getAllProducts = async () => {
    try {
      const result = await GetAll(itensPorPagina, pagina);
      setRegistros(result.quantidade);
      setProducts(result.data);
      setIsloading(true);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    setIsloading(false);
    getAllProducts();
  }, [itensPorPagina, pagina]);

  useEffect(() => {
    setIsloading(false);
    getAllProducts();
  }, [loop]);

  return (
    <div>
      <div>
        {isloading ? (
          <>
            <PageTitle title={'Área para gestão do estoque'} subtitle={'Gestão de estoque dos produtos'} />
            <div className={`${styles.acoes}`}>
              <div className={`${styles.search}`}>
                <GetProductsByDescription setProducts={setProducts} setRegistros={setRegistros} />
              </div>
              <div></div>
              <div>
                <button className="btn" data-bs-toggle="modal" data-bs-target="#modalAdd">
                  <CgAdd size={'1.5em'} className={`me-1`} /> Novo Produto
                </button>
              </div>
            </div>

            <hr />
            <div>
              <table className="table table-sm table-hover">
                <thead>
                  <tr>
                    <th>Produtos</th>
                    <th>Qtd. Estoque</th>
                    <th>Qtd. Minima</th>
                    <th>Fornecedores</th>
                    <th>Valor unit.</th>
                    <th>Valor Total</th>
                    <th>Deletado</th>
                    <th>Categorias</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products
                    ? products.map((item, i) => (
                        <tr key={item.Id} className={item.QuantidadeEstoque < 1 ? `${styles.estoqueZero}` : ''}>
                          <td onClick={acao}>{item.produto}</td>
                          <td onClick={acao} style={{ textAlign: 'center' }}>
                            {item.QuantidadeEstoque}
                          </td>
                          <td onClick={acao} style={{ textAlign: 'center' }}>
                            {item.QuantidadeMinima}
                          </td>
                          <td onClick={acao} style={{ textAlign: 'right' }}>
                            {item.RazaoSocial}
                          </td>
                          <td onClick={acao} style={{ textAlign: 'right' }}>
                            {UtilService.formatCurrency(item.Valor)}
                          </td>
                          <td onClick={acao} style={{ textAlign: 'right' }}>
                            {UtilService.formatCurrency(item.ValorTotal)}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <input className="form-check-input" type="checkbox" checked={item.deleted} disabled />
                          </td>
                          <td onClick={acao} style={{ textAlign: 'right' }}>
                            {item.categoria}
                          </td>
                          {exibirAcao && (
                            <>
                              <td>
                                <button
                                  className="btn btn-sm btn-warning me-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalEdit"
                                  onClick={() => {
                                    setId(item.Id);
                                  }}
                                >
                                  <TbEdit size={`1.5em`} />
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalDelete"
                                  onClick={() => {
                                    setId(item.Id);
                                    setProduto(item.produto);
                                  }}
                                >
                                  <RiDeleteBinFill size={`1.5em`} />
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))
                    : ''}
                </tbody>
              </table>
              <div className={`${styles.itensPorPagina}`}>
                <span>{itensPorPagina} produtos carregados</span>
              </div>
            </div>
            <div></div>
            <Paginacao
              itensPorPagina={itensPorPagina}
              pagina={pagina}
              registros={registros}
              setItensPorPagina={setItensPorPagina}
              setPagina={setPagina}
              tipo={'produtos'}
            />
            <>
              <div>
                <ModalAdd setLoop={setLoop} loop={loop} />
              </div>

              <ModalEdit id={id} loop={loop} setLoop={setLoop} setId={setId} />
              <ModalDelete id={id} produto={produto} loop={loop} setLoop={setLoop} />
            </>
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
      </div>
    </div>
  );
};

export default AdmProducts;
