import React, { useCallback, useMemo, useState } from 'react';
import { contarProdutosPorCategorias } from '../../../api/DashboardApi';
import Loading from './../../../components/Loading/Loading';
import styles from './ProdutosPorCategoria.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Qtde de produtos comprados por categorias',
    },
  },
};

const GraficoProdutosPorCategoria = () => {
  const [dataInfos, setDataInfos] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const labels = dataInfos.map(cat => cat.categoria);

  const data = {
    labels,
    datasets: [
      {
        label: 'Categoria',
        data: dataInfos.map(qtd => qtd.quantidade),
        backgroundColor: 'rgba(100, 104, 132, 0.5)',
      },
      //   {
      //     label: 'Categoria',
      //     data: dataInfos.map(x => x.quantidade),
      //     backgroundColor: 'rgba(255, 104, 132, 0.5)',
      //   },
    ],
  };

  const carregarInfos = useCallback(async () => {
    try {
      const result = await contarProdutosPorCategorias();
      setDataInfos(result);
      setIsloading(true);
      
    } catch (error) {
      return error;
    }
  }, []);

  useMemo(() => {
    carregarInfos();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className={`${styles.area}`}>
            <Line options={options} data={data} />
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

export default GraficoProdutosPorCategoria;
