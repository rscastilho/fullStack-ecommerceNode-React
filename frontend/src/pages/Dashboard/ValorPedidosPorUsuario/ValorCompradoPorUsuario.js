import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './ValorCompradoPorUsuario.module.css';
import { valorDoPedidoPorUsuario } from '../../../api/DashboardApi';
import PageTitle from './../../../components/Title/PageTitle';
import ButtonBack from './../../../components/ButtonBack/ButtonBack';
import { UtilService } from './../../../utils/UtilService';

const ValorCompradoPorUsuario = () => {
  const [data, setData] = useState([]);

  const carregarData = useCallback(async () => {
    try {
      const result = await valorDoPedidoPorUsuario();
      setData(result);
    } catch (error) {
      console.log(error);
      return error;
    }
  }, []);

  useMemo(() => {
    carregarData();
  }, [carregarData]);

  return (
    <div>
      <PageTitle
        title={`${data.qtdePedidos} pedidos recebidos. Valor total de ${UtilService.formatCurrency(+data.total)}`}
        subtitle={'Valores comprados por usuários'}
      />
      <div>
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Nº de pedidos</th>
              <th>Valor total por pedido</th>
            </tr>
          </thead>
          <tbody>
            {data.data &&
              data.data.map((item, i) => (
                <tr>
                  <td style={{ textAlign: 'left' }}>{UtilService.getUpperCase(item.nome)}</td>
                  <td>{item.pedidos}</td>
                  <td style={{ textAlign: 'right' }}>{UtilService.formatCurrency(+item.total)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ButtonBack local={'/dashboard'} />
    </div>
  );
};

export default ValorCompradoPorUsuario;
