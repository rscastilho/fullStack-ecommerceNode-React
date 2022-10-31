import React, { useState } from 'react';
import styles from './Footer.module.css';
import { FaCopyright } from 'react-icons/fa';

const Footer = () => {
  const fullYear = new Date();
  const [year] = useState(fullYear.getFullYear());

  return (
    <div className={styles.boxPrincipal}>
      <div></div>
      <div className={styles.year}>
       
      Copyright  <FaCopyright /> Your App  {year}.
      </div>
      <div className={styles.developer}>rCastilho@gmail.com</div>
    </div>
  );
};

export default Footer;
