import React, { useCallback, useState, useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { GetById } from '../../../api/ProductsApi'
import styles from './DetailsProducts.module.css'
import imgError from './../../../Assets/Images/imageNotFound.png';
import { useNavigate } from 'react-router-dom'
import UtilService from '../../../utils/UtilService';
import { AuthContext } from './../../../context/AuthContext';
import ValorPrazoFrete from '../../../components/ValorPrazoFrete/ValorPrazoFrete';
import moment from 'moment'
import { toast } from 'react-toastify';


const DetailsProducts = () => {
  const { id } = useParams();
  const { authenticated, setItensCarrinho } = useContext(AuthContext)
  const navigate = useNavigate();
  const [product, setProduct] = useState('');
  const [valorTotal, setValorTotal] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [carregaItens, setCarregaItens] = useState(JSON.parse(localStorage.getItem('@carrinho')) || []);
  const itensCarrinho = [...carregaItens];

  const addToCard = async (products) => {
    let item = itensCarrinho.find((x) => x.Id === products.Id)
    if (item === undefined) {
      await itensCarrinho.push({ ...products, quantidade: +quantidade, valorTotal: valorTotal })
      localStorage.setItem('@carrinho', JSON.stringify(itensCarrinho))
      setItensCarrinho(JSON.parse(localStorage.getItem('@carrinho')).length)
    } else if (+quantidade === +item.quantidade) {
      return
    } else {
      if (itensCarrinho.Id === product.Id) {
        toast.warning(`O produto ${products.Produto} já foi adicionado no carrinho. Acesse o carrinho para alterar ou exclui-lo.`, { autoClose: 800, position: 'top-center' })
        return
      }
      setQuantidade(item.quantidade += 1)
      item.valorTotal = valorTotal
      itensCarrinho.push(...itensCarrinho)
    }
    toast.success(`Produto ${products.Produto} adicionado no carrinho`, { autoClose: 700, position: 'bottom-center' })
    localStorage.setItem('@carrinho', JSON.stringify(itensCarrinho))
    navigate('/')
    return
  }

  const productById = useCallback(async () => {
    try {
      if (id) {
        const result = await GetById(id);
        setProduct(result)
      }
    } catch (error) {
      return error
    }
  }, [id])

  useMemo(() => {
    productById()
  }, [productById])

  return (
    <div className={`${styles.cardPrincipal}`}>
      {product &&
        <>
          {product.map((product) => (
            <div key={product.Id} className={`card ${styles.cards} shadow-lg`}>
              <div className="card-img-top">
                <img
                  className={`${styles.imgProduct}`}
                  src={`http://localhost:5000/imagensprodutos/${product.ImagemUrl}`}
                  alt={product.ImagemUrl}
                  onError={(e) => { e.target.onError = null; e.target.src = imgError }}
                />
              </div>
              <div className="card-body">
                <div className="card-text">
                  <div className="card-text">
                    <span>Produto:</span>
                    {UtilService.getUpperCase(product.Produto)}
                  </div>
                  <span>Categoria:</span>
                  {UtilService.getUpperCase(product.Categoria)}
                </div>
                <div className="card-text">
                  <span>Quantidade disponivel:</span>
                  {product.QuantidadeEstoque === 0 ? "Estoque zerado" : `${product.QuantidadeEstoque} unids.`} 
                </div>
                <div className="card-text">
                  <span>Valor:</span>
                  {UtilService.formatCurrency(product.Valor)}
                </div>
                <div className="card-text">
                  <span>Fornecedor:</span>
                  {UtilService.getUpperCase(product.RazaoSocial)}
                </div>
              </div>
              {authenticated &&
                <div className={`card-footer ${styles.botoes}`}>
                  <>

                    <div className={`${styles.quantidadeValor}`}>
                      <div></div>
                      <div className={`${styles.CamposQuantidade}`}>
                        <label>Quantidade:</label>
                        <input
                          className={`form-control ${styles.quantidade}`}
                          type="number"
                          value={quantidade}
                          min={0}
                          max={product.QuantidadeEstoque}
                          width="300"
                          onChange={(e) => {
                            e.preventDefault()
                            setValorTotal(e.target.value * product.Valor)
                            setQuantidade(e.target.value)
                          }}
                          disabled={product.QuantidadeEstoque === 0 ? true : false}
                        />
                      </div>
                      {valorTotal ?
                        <>
                          <div className={`${styles.valorTotal}`}>
                            <span>Valor total:</span>
                            {UtilService.formatCurrency(valorTotal)}
                          </div>
                        </>
                        :
                        <div></div>
                      }
                    </div>
                    <button
                      className="btn btn-primary"
                      disabled={product.QuantidadeEstoque === 0 || quantidade === '0' || !quantidade ? true : false}
                      onClick={() => addToCard(product)}
                    >Adicionar no carrinho
                    </button>
                  </>
                </div>
              }
              <button
                className="btn btn-outline-warning mt-1"
                onClick={() => navigate('/products/allproducts')}
              >{!authenticated ? 'Voltar' : 'Continuar comprando'}
              </button>
            </div>
          ))}
        </>
      }
    </div>
  )
}
export default DetailsProducts