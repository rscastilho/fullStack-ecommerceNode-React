import React, { useCallback, useMemo, useState } from 'react';
import ButtonBack from './../../../components/ButtonBack/ButtonBack';
import Title from '../../../components/Title/PageTitle';
import { contarUsuarios } from '../../../api/DashboardApi';
import GraphicContarUsuarios from './../../Graphics/ContarUsuarios/GraphicContarUsuarios';
import styles from './ContarUsuarios.module.css';

const ContarUsuarios = () => {
  const [data, setData] = useState([]);

  const usuariosData = useCallback(async () => {
    const result = await contarUsuarios();
    setData(result);
  }, []);

  useMemo(() => {
    usuariosData();
  }, []);

  return (
    <>
      <Title title={'Dados usuários'} subtitle={'Informações de estado de usuários'} />
      <div className={`${styles.principal}`}>
        <div className={`${styles.area}`}>
          <GraphicContarUsuarios dataUser={data} />
        </div>

        <ul className="list-group list-group-flush w-50">
          {data &&
            data.map((item, i) => (
              <div key={i}>
                <li className="list-group-item" style={{ textAlign: 'center', marginTop: '25px' }}>
                  Informações de usuários cadastrados
                </li>
                <li className="list-group-item">{item.quantidade} - Usuários cadastrados</li>
                <li className="list-group-item">{item.deletados} - Usuários deletados</li>
              </div>
            ))}
        </ul>

        <br />

        <ButtonBack local={'/dashboard'} />
      </div>
    </>
  );
};

export default ContarUsuarios;
