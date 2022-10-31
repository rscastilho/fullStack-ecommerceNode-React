import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from './GraphicContarUsuarios.module.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Usuarios cadastrados',
    },
  },
};

const GraphicContarUsuarios = ({ dataUser }) => {
  const labels = Object.keys(dataUser);

  const data = {
    labels,
    datasets: [
      {
        label: 'Quantidade',
        data: dataUser.map(item => item.quantidade),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Deletados',
        data: dataUser.map(item => item.deletados),
        backgroundColor: 'rgba(100, 125, 000, 0.5)',
      },
    ],
  };
  return (
    <div className={`${styles.area}`}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default GraphicContarUsuarios;
