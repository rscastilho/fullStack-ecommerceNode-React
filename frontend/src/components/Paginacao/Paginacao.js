import React from 'react';
import styles from './Paginacao.module.css';

const Paginacao = ({ itensPorPagina, setPagina, setItensPorPagina, registros, pagina, tipo }) => {
  const proximaPagina = e => {
    e.preventDefault();
    if (pagina + itensPorPagina >= registros) {
      return;
    } else {
      setPagina(pagina + +itensPorPagina);
    }
  };

  const paginaAnterior = e => {
    e.preventDefault();
    if (pagina === 0) {
      return;
    } else {
      setPagina(pagina - +itensPorPagina);
    }
  };
  return (
    <div>
      <span className={`${styles.qtdRegistros}`}>Você possui {registros && registros} {tipo} </span>
      <hr />
      <div className={`${styles.paginacao} mt-3`}>
        <div className={`${styles.itensPorPagina}`}>
          <span>itens por página</span>
          <select
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            onChange={e => {
              setItensPorPagina(+e.target.value);
            }}
          >
            <option defaultValue={10}> 10 </option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
            <option value={registros}>Tudo {registros}</option>
          </select>
        </div>
        <button
          className={`btn btn btn-outline-${pagina === 0 ? `warning border-0 ` : `info`}`}
          onClick={e => paginaAnterior(e)}
          disabled={pagina === 0 ? true : false}
          hidden ={pagina === 0 ? true : false}
          
          >
          anterior
        </button>

        <button
          className={`btn btn-sm btn-outline-${pagina + itensPorPagina >= registros ? `warning border-0 ` : `info`}`}
          onClick={e => proximaPagina(e)}
          disabled={pagina + itensPorPagina >= registros ? true : false}
        >
          Proxima
        </button>
      </div>
    </div>
  );
};

export default Paginacao;
