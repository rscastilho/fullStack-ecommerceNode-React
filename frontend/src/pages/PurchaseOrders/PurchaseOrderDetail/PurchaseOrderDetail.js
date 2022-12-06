import React, { useEffect, useState } from 'react';
import styles from './PurchaseOrderDetail.module.css';
import PageTitle from './../../../components/Title/PageTitle';
import { useParams, useNavigate } from 'react-router-dom';
import { getPurchaseOrderById } from '../../../api/PurchaseOrderApi';
import { UtilService } from './../../../utils/UtilService';
import imgError from './../../../Assets/Images/imageNotFound.png';
import { GrDocumentPdf, GrDocumentCsv, GrDocumentExcel } from 'react-icons/gr';
import { FaOpencart } from 'react-icons/fa';
import PurchaseOrderPdf from '../PurchaseOrderPdf/PurchaseOrderPdf';
// import PurchaseOrderCsv from '../PurchaseOrderCSV/PurchaseOrderCsv';
import PurchaseOrderCsv from './../PurchaseOrderCSV/PurchaseOrderCsv';
import { CSVLink, CSVDownload } from 'react-csv';

const PurchaseOrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = JSON.parse(localStorage.getItem('@id'));
  const [pedido, setPedido] = useState([]);
  const [qtdItens, setQtdItens] = useState();
  const [itensPedido, setitensPedido] = useState([]);


  const pedidoPdf = {
    pedido,
    itensPedido
  }

  console.log(itensPedido)

  const data = [
    itensPedido.map((item) => {
      return(
        [
          item.descricao,
          item.quantidade
        ]
      )


    })
  ]



  const carregarPedido = async () => {
    try {
      const result = await getPurchaseOrderById(id);
      setQtdItens(result.itens);
      setPedido(result.pedido);
      setitensPedido(result.itensPedido);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    carregarPedido();
  }, []);

  return (
    <div>
      <PageTitle title={`Detalhes do pedido nº ${id}`}>
        <FaOpencart />
      </PageTitle>

      <div className="card shadow-lg w-75 m-auto">
        <div className="card-body">
          <div className="card">
            <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <th style={{ padding: '10px', backgroundColor: '#1E90FF', border: '1px solid blue', color: 'white', fontWeight: 300 }}>Valor do pedido</th>
                  <th style={{ padding: '10px', backgroundColor: '#1E90FF', border: '1px solid blue', color: 'white', fontWeight: 300 }}>Nome usuario</th>
                  <th style={{ padding: '10px', backgroundColor: '#1E90FF', border: '1px solid blue', color: 'white', fontWeight: 300 }}>Tipo Pagamento</th>
                  <th style={{ padding: '10px', backgroundColor: '#1E90FF', border: '1px solid blue', color: 'white', fontWeight: 300 }}>Status Pedido</th>
                </tr>
              </thead>
              <tbody>
                {pedido &&
                  pedido.map(itemPedido => (
                    <tr key={itemPedido.produtoId}>
                      <td style={{ textAlign: 'center' }}>{UtilService.formatCurrency(itemPedido.valorTotal)}</td>
                      <td style={{ textAlign: 'center' }}>{itemPedido.nome}</td>
                      <td>{UtilService.tipoPagamento(itemPedido.tiposPagamentos)}</td>
                      <td>{UtilService.statusPedido(itemPedido.statusPedidos)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="card mt-1">
            <div className="card-body">
              <span></span>
              <span className={`${styles.quantidadeItens}`}>
                <FaOpencart size={45} className={`me-3`} color={'blue'} />
                Este pedido possui {qtdItens} {qtdItens > 1 ? 'itens' : 'item'}
              </span>
            </div>
          </div>
          <div className="card mt-1">
            <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Miniatura</th>
                  <th style={{ width: '200px', textAlign: 'center' }}>Descrição</th>
                  <th> Quantidade</th>
                  <th>Valor</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {itensPedido &&
                  itensPedido.map((itemPedido, i) => (
                    <tr key={itemPedido.produtoId}>
                      <td>#{i + 1}</td>
                      <td style={{ width: '380px', textAlign: 'center', height: '100px' }}>
                        <img
                          className={`${styles.imgProduct}`}
                          src={`http://localhost:5000/imagensprodutos/${itemPedido.imagemUrl}`}
                          alt={itemPedido.imagemUrl}
                          onError={e => {
                            e.target.onError = null;
                            e.target.src = imgError;
                          }}
                        />
                      </td>
                      <td style={{ width: '200px', textAlign: 'center' }}>{itemPedido.descricao}</td>
                      <td>{itemPedido.quantidade}</td>
                      <td>{UtilService.formatCurrency(itemPedido.valor)}</td>
                      <td style={{ width: '200px', textAlign: 'center' }}>{UtilService.formatCurrency(itemPedido.valor * itemPedido.quantidade)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className={`${styles.buttonExport}`}>
              <button className="btn btn-sm btn-outline-primary mb-1" onClick={() => PurchaseOrderPdf(pedidoPdf)}>
                <GrDocumentPdf size={25} className={`m-2`} />
                Gerar .pdf
              </button>
              <button className="btn btn-sm btn-outline-primary mb-1" onClick={() => navigate(`/purchaseorders/${userId}`)}>
                <GrDocumentExcel size={25} className={`m-2`} />
                Gerar .xls
              </button>
              <button className="btn btn-sm btn-outline-primary mb-1" onClick={() => (pedidoPdf)}>
                <CSVLink data={data} filename={`PedidoNumero${pedido && pedido.map((x) => x.id)}`} separator={';'} target='_blank'>
                  <GrDocumentCsv size={25} className={`m-2`} />
                  Gerar .csv
                </CSVLink>

              </button>
            </div>
            <button className="btn btn btn-secondary m-1" onClick={() => navigate(`/purchaseorders/${userId}`)}>
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetail;
