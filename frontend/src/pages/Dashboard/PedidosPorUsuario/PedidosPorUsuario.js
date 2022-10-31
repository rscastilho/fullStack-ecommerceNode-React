import React, { useCallback, useMemo, useState } from 'react';
import styles from './PedidosPorUsuario.module.css';
import { contarPedidosPorUsuarios } from '../../../api/DashboardApi';
import GraphicContarPedidoPorUsuario from '../../Graphics/ContarPedidosPorUsuario/GraphicContarPedidoPorUsuario';
import Loading from './../../../components/Loading/Loading';
import PageTitle from '../../../components/Title/PageTitle';
import ButtonBack from './../../../components/ButtonBack/ButtonBack';

const PedidosPorUsuario = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const contarPedidos = useCallback(async () => {
    try {
      const result = await contarPedidosPorUsuarios();
      setData(result);
      setIsloading(true);
    } catch (error) {
      return error;
    }
  }, []);

  useMemo(() => {
    contarPedidos();
  }, [contarPedidos]);

  return (
    <>
      {isLoading ? (
        <>
          <PageTitle title={'Pedidos por usuários'} subtitle={'Pedidos emitidos por usuário'} />
          <div className={`${styles.principal}`}>
            <div className={`${styles.area}`}>
              <GraphicContarPedidoPorUsuario dataPedido={data} setIsloading={setIsloading} />
            </div>

            <ul className="list-group list-group-flush w-50">
              {data &&
                data.map((item, i) => (
                  <li key={i} className="list-group-item">
                    {item.quantidade} produtos - {item.usuario}
                  </li>
                ))}
            </ul>

            <ButtonBack local={'/dashboard'} />
          </div>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default PedidosPorUsuario;
