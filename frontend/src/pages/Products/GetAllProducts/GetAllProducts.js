import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetAll, getProductsByCategoriyId } from '../../../api//ProductsApi';
import { getAllCategories } from '../../../api/CategoryApi';
import styles from './GetAllProducts.module.css';
import imgError from './../../../Assets/Images/imageNotFound.png';
import { UtilService } from './../../../utils/UtilService';
import { useNavigate } from 'react-router-dom';
import Carousel from './../Carousel/Carousel';
import GetProductsByDescription from './../../../components/GetProductsByDescription/GetProductsByDescription';
import Loading from '../../../components/Loading/Loading';
import Paginacao from './../../../components/Paginacao/Paginacao';
import AOS from 'aos'
import 'aos/dist/aos.css'


AOS.refresh()


const GetAllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [registros, setRegistros] = useState();
  const [categories, setCategories] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [pagina, setPagina] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProducts = useCallback(async () => {
    try {
      const result = await GetAll(itensPorPagina, pagina);
      setRegistros(result.quantidade);
      setProducts(result.data);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
      return error;
    }
  }, [pagina, itensPorPagina]);

  const getAllCAtegories = async () => {
    try {
      const result = await getAllCategories();
      setCategories(result.data);
    } catch (error) {
      return error;
    }
  };

  const getProductByCategoryId = async categoryId => {
    try {
      const result = await getProductsByCategoriyId(categoryId);
      setRegistros(result.registros);
      setProducts(result.data || result);
    } catch (error) {
      return error;
    }
  };

  useEffect(()=>{
    AOS.init({
      // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
    
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 1400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    })
  },[])

  useMemo(() => {
    getAllCAtegories();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <div>
      {!isLoading ? (
        <Loading />
      ) : (
        <>
          <Carousel />
          <div className={`${styles.searchBar}`}>
            <div>
              {categories && products ? (
                <>
                  <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    onChange={e => {
                      if (e.target.value === '0') {
                        getAllProducts();
                      } else {
                        getProductByCategoryId(+e.target.value);
                      }
                    }}
                  >
                    <option defaultValue value={0}>
                      {' '}
                      Selecione a categoria:{' '}
                    </option>
                    {categories.map(item => (
                      <option key={item.Id} value={item.Id}>
                        {item.Descricao}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                ''
              )}
            </div>
            <div></div>
            <div>
              <GetProductsByDescription setProducts={setProducts} setRegistros={setRegistros} />
            </div>
          </div>
          <hr />
          <div>
            {products && products.length > 0 ? (
              <>
                <div className={`${styles.boxPrincipal}`} data-aos='slide-up' >
                  {products.map((item, i) => (
                    <>
                      {!item.deleted && (
                        <div className={`${styles.product} card m-1 shadow`} key={i} onClick={() => navigate(`/product/${item.Id}`)}>
                          <div className={`${styles.img} card-img-top`}>
                            <img
                              className={`${styles.imgProduct}`}
                              src={`http://localhost:5000/imagensprodutos/${item.ImagemUrl}`}
                              alt={item.ImagemUrl}
                              onError={e => {
                                e.target.onError = null;
                                e.target.src = imgError;
                              }}
                            />
                          </div>
                          <div className={`card-body ${styles.body}`}>
                            <h5 className="card-title h-100">{item.produto}</h5>
                            <h6 className="card-text h-100">{UtilService.formatCurrency(item.Valor)}</h6>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                </div>
                <div>
                  <Paginacao
                    itensPorPagina={itensPorPagina}
                    registros={registros}
                    pagina={pagina}
                    setItensPorPagina={setItensPorPagina}
                    setPagina={setPagina}
                    tipo={'produtos'}
                  />
                </div>
              </>
            ) : (
              <>
                <span>
                  <p className={`${styles.erroAutorizacao} alert alert-danger w-75`}>{products.message}</p>
                </span>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GetAllProducts;
