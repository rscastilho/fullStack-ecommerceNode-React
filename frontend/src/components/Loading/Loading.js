import React from 'react';
import RingLoader from 'react-spinners/RingLoader';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={`${styles.principal}`}>
      <RingLoader color={`black`} size={250} aria-label="Carregando..."/>
    </div>
  );
};

export default Loading;
