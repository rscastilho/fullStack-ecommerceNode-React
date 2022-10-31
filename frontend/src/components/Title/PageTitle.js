import React from 'react';
import styles from './PageTitle.module.css';

const PageTitle = ({ title, subtitle}) => {
  return (
    <>
      <div className={`${styles.title}`}>
        <div className={`${styles.titulo}`}>{title}</div>
        <div className={`${styles.subtitulo}`}>{subtitle}</div>
      </div>
      <hr />
    </>
  );
};

export default PageTitle;
