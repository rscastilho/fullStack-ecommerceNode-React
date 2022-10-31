import React, { useState, useContext, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPurchaseOrdersByUserId } from '../../../api/PurchaseOrderApi';
import PageTitle from '../../../components/Title/PageTitle';
import { AuthContext } from '../../../context/AuthContext';
import { UtilService } from './../../../utils/UtilService';
import styles from './PurchaseOrderByUserId.module.css';
import Paginacao from './../../../components/Paginacao/Paginacao';
import { MdPriceCheck, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { BsCalendarDate, BsCartCheck } from 'react-icons/bs';

const PurchaseOrderByUserId = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { itensPorPagina, setItensPorPagina } = useContext(AuthContext);
  const [purchaseOrder, setPurchaseOrders] = useState([]);
  const [registros, setRegistros] = useState('');
  const [pagina, setPagina] = useState(0);
  const [paginas, setPaginas] = useState('');

  const carregarPedidosByUserId = useCallback(async () => {
    try {
      const result = await getPurchaseOrdersByUserId(userId, itensPorPagina, pagina);
      setPurchaseOrders(result.data || result);
      setRegistros(result.quantidade);
      setPaginas(Math.ceil(registros / itensPorPagina));
    } catch (error) {
      console.log(error);
    }
  }, [itensPorPagina, pagina, registros, userId]);

  useMemo(() => {
    carregarPedidosByUserId();
  }, [carregarPedidosByUserId]);

  return (
    <div>
      {purchaseOrder && purchaseOrder.length > 0 ? (
        <>
          <PageTitle title={'Pedidos'} subtitle={`Você tem ${registros} pedidos processados`} />
          <div>
            <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <th>
                    <MdOutlineProductionQuantityLimits size={30} color={'blue'} className={`mb-2`} /> <br /> Pedido nº
                  </th>
                  <th>
                    <BsCalendarDate size={30} color={'blue'} className={`mb-2`} /> <br />
                    Emissão do pedido
                  </th>
                  <th>
                    <MdPriceCheck size={30} color={'blue'} className={`mb-2`} /> <br />
                    Valor do pedido
                  </th>
                  <th>
                    <BsCartCheck size={30} color={'blue'} className={`mb-2`} /> <br /> Status do pedido
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrder &&
                  purchaseOrder.map(po => (
                    <tr key={po.id} onClick={() => navigate(`/purchaseorders/detail/${po.id}`)}>
                      <td style={{ textAlign: 'center', width: '80px' }}> {po.id}</td>
                      <td style={{ textAlign: 'center' }}> {UtilService.formatShortDate(po.createAt)}</td>
                      <td style={{ textAlign: 'center' }}>{UtilService.formatCurrency(po.valorTotal)}</td>
                      <td style={{ textAlign: 'center' }}> {UtilService.statusPedido(po.statusPedidos)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <Paginacao
              itensPorPagina={itensPorPagina}
              setPagina={setPagina}
              setItensPorPagina={setItensPorPagina}
              registros={registros}
              pagina={pagina}
              tipo={'pedidos'}
            />
          </div>
        </>
      ) : (
        <>
          <span>
            <p className={`${styles.erroAutorizacao} alert alert-danger w-75`}>{purchaseOrder.message}</p>
          </span>
        </>
      )}
    </div>
  );
};

export default PurchaseOrderByUserId;
