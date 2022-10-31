import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { contarProdutosPorCategorias } from '../../../api/DashboardApi';
import PageTitle from './../../../components/Title/PageTitle';
import Loading from '../../../components/Loading/Loading';
import ButtonBack from './../../../components/ButtonBack/ButtonBack';
import styles from './ProdutosPorCategoria.module.css';
import GraficoProdutosPorCategoria from './../../Graphics/ProdutosPorCategoria/ProdutosPorCategoria';

const ProdutosPorCategoria = () => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(false);

  const carregarInfos = useCallback(async () => {
    try {
      const result = await contarProdutosPorCategorias();
      setData(result);
      setIsloading(true);
    } catch (error) {}
  }, []);

  useMemo(() => {
    carregarInfos();
  }, []);

  return (
    <div>
      <PageTitle title={'Produtos comprados por categoria'} subtitle={'Quantidade de produtos comprados por categorias'} />
      {isLoading ? (
        <>
          <div className={`${styles.principal}`}>
            <div className={`${styles.grafico}`}>
              <GraficoProdutosPorCategoria />
            </div>
            <ul className="list-group list-group-flush w-50">
              {data &&
                data.map((item, i) => (
                  <li key={i} className="list-group-item">
                    {item.quantidade} produtos - {item.categoria}
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
    </div>
  );
};

export default ProdutosPorCategoria;
