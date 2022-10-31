import React from 'react';
import styles from './ItensDashBoard.module.css';
import { dashboardData } from './dashboardData';
import { Link } from 'react-router-dom';

const ItensDashBoard = () => {
  return (
    <div className={`${styles.principal}`}>
      {dashboardData.map((item, i) => (
        <div key={i} className={`accordion ${styles.accordion} shadow-md`} id="accordionDashboard">
          <div className="accordion-item">
            <h2 className="accordion-header" id={i}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseOne${i}`}
                aria-expanded="true"
                aria-controls={`collapseOne${i}`}
              >
                {item.item}
              </button>
            </h2>
            <div id={`collapseOne${i}`} className="accordion-collapse collapse" aria-labelledby={i} data-bs-parent="#accordionDashboard">
              <div className="accordion-body p-0 mt-1">
                {item.opcao.map((subItem, i) => (
                  <ul key={i} className="list-group">
                    <Link to={`${subItem.link}`}>
                      <li className={`list-group-item ${styles.lista}`}>{subItem.descricao}</li>
                    </Link>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItensDashBoard;
