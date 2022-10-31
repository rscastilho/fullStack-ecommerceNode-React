import { useContext, useEffect } from 'react';
import styles from './NavBar.module.css';
import { FaReact, FaNode } from 'react-icons/fa';
import { SiMysql } from 'react-icons/si';
import { SiExpress } from 'react-icons/si';
import { TbBrandJavascript } from 'react-icons/tb';
import { UtilService } from '../../utils/UtilService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from './../../context/AuthContext';
import { FaUser } from 'react-icons/fa';
import { BsCart4 } from 'react-icons/bs';

const NavBar = () => {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated, setPerfil, perfil, itensCarrinho, itensPorPagina, pagina } = useContext(AuthContext);

  const logout = () => {
    localStorage.clear();
    toast.success('Logout realizado com sucesso!', {
      autoClose: 1000,
      position: 'top-center',
    });
    setAuthenticated(false);
    setPerfil('');
    navigate('/');
  };

  return (
    <>
      <nav className={styles.boxPrincipal}>
        <div className={styles.logo}></div>
        <div className={styles.central}>
          <Link to={'/'}>
            <SiMysql className={`${styles.logoMySql}`} size={'40px'} />
            <SiExpress className={styles.logoReact} size={'40px'} />
            <FaReact className={styles.logoReact} size={'40px'} />
            <FaNode className={styles.logoNode} size={'40px'} />
            by <TbBrandJavascript className={styles.logoJs} size={'38px'} color={'orange'} />
          </Link>
        </div>
        <div className={styles.botoes}>
          {authenticated ? (
            <>
              <div className={styles.logout} onClick={logout}>
                {' '}
                Logout{' '}
              </div>
              <Link to={`/user/details/${localStorage.getItem('@id')}`}>
                <div className={styles.perfil}>
                  <FaUser size={'1.5em'} color={'#000'} /> {perfil}
                </div>
              </Link>
              {itensCarrinho && (
                <>
                  <Link to={`/cart`}>
                    <BsCart4 className={styles.logoNode} size={'23px'} />
                    <span className="translate-middle badge rounded-pill text-bg-danger ms-0">{itensCarrinho}</span>
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/login">
                <div className={styles.login}>Login</div>
              </Link>
            </>
          )}
        </div>
      </nav>
      <nav className={styles.navEspacamento}></nav>
      <nav className={styles.navegacao}>
        <div className={styles.navLeft}></div>
        <div className={styles.navCenter}>
          <div className={styles.links}>
            {authenticated && perfil === 'Administrador' ? (
              <>
                <span>
                  <Link to="/users/allusers"> Usuários </Link>
                </span>
                |
                <span>
                  <Link to="/products/admproducts"> Produtos </Link>
                </span>
                |
                <span>
                  <Link to={`/purchaseorders/${JSON.parse(localStorage.getItem('@id'))}?$itensPorPagina=${itensPorPagina}&pagina=${pagina}`}>
                    {' '}
                    Meus Pedidos{' '}
                  </Link>
                </span>
                |
                <span>
                  <Link to="/suppliers/allsuppliers"> Fornecedores </Link>
                </span>{' '}
                |
                <span>
                  <Link to="/categories/allcategories"> Categorias </Link>
                </span>{' '}
                |
                <span>
                  <Link to="/dashboard"> Dashboard </Link>
                </span>
              </>
            ) : (
              <>
                <span>
                  <Link to={`/products/allproducts?itensPorPagina=${5}&pagina=${0}`}>Produtos</Link>
                </span>{' '}
                |
                {authenticated && (
                  <>
                    <span>
                      <Link to={`/purchaseorders/${JSON.parse(localStorage.getItem('@id'))}?$itensPorPagina=${itensPorPagina}&pagina=${pagina}`}>
                        {' '}
                        Meus Pedidos{' '}
                      </Link>
                    </span>{' '}
                    |
                  </>
                )}
                <span>
                  <Link to="/about"> Sobre </Link>
                </span>
              </>
            )}
          </div>
        </div>
        <div className={styles.navRight}>{UtilService.hoje()}</div>
      </nav>
    </>
  );
};

export default NavBar;
