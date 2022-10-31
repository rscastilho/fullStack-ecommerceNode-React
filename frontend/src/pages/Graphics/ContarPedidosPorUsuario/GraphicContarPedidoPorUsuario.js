import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styles from './GraphicContarPedidosPorUsuario.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphicContarPedidoPorUsuario = ({ dataPedido }) => {
  const data = {
    labels: dataPedido.map(item => item.usuario),

    datasets: [
      {
        data: dataPedido.map(item => item.quantidade),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`${styles.area}`}>
      <Pie data={data} />
    </div>
  );
};

export default GraphicContarPedidoPorUsuario;
