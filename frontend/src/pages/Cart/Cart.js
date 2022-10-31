import React, { useState, useContext } from 'react';
import styles from './Cart.module.css';
import { AuthContext } from '../../context/AuthContext';
import ValorPrazoFrete from './../../components/ValorPrazoFrete/ValorPrazoFrete';
import moment from 'moment';
import { UtilService } from './../../utils/UtilService';
import PageTitle from './../../components/Title/PageTitle';
import { useNavigate } from 'react-router-dom';
import { limparCarrinho, incrementQuantity, decrementQuantity, finalizarCompra } from '../../utils/FuncoesCart';

const Cart = () => {
  const navigate = useNavigate();
  let valorFreteCalculado = 0;
  let valorTotal = 0;
  const [itensCart, setItensCart] = useState(JSON.parse(localStorage.getItem('@carrinho')) || []);
  const { setItensCarrinho, itensCarrinho } = useContext(AuthContext);
  const [tiposPagamentos, setTiposPagamentos] = useState(0);
  const [valorFrete, setValorFrete] = useState([]);
  const [quantidade, setQuantidade] = useState(0);
  const [valorTotalAtualizado, setValorTotalAtualizado] = useState(0);

  return (
    <div className={`${styles.principal}`}>
      <div className={`${styles.table}`}>
        {itensCart && itensCart.length < 1 ? (
          <>
            <div className={`${styles.carrinhoVazio}`}>
              <p className={`${styles.carrinhoVazioTexto}`}>Seu Carrinho está vazio!</p>
              <p>você será redirecionado em 2 segundos...</p>
              <div>
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                  Voltar
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <PageTitle title={'Finalize sua compra'} subtitle={'check-out para finalização do seu pedido'} />
            <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Valor Unit.</th>
                  <th>Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {itensCart &&
                  itensCart.map((item, i) => (
                    <tr key={i}>
                      <td style={{ textAlign: 'left' }}>{UtilService.getUpperCase(item.Produto)}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className={`${styles.buttonDecrement} btn btn-sm btn-outline-info me-2`}
                          onClick={() =>
                            decrementQuantity(itensCart, item.Id, setItensCarrinho, setItensCart, navigate, setQuantidade, setValorTotalAtualizado)
                          }
                        >
                          {' '}
                          -{' '}
                        </button>
                        {item.quantidade}
                        <button
                          className={`${styles.buttonIncrement} btn btn-sm btn-outline-info ms-2`}
                          onClick={() => incrementQuantity(itensCart, item.Id, setQuantidade, setValorTotalAtualizado)}
                        >
                          {' '}
                          +{' '}
                        </button>
                      </td>
                      <td style={{ textAlign: 'center' }}>{UtilService.formatCurrency(item.Valor)}</td>
                      <td style={{ textAlign: 'right' }}>{UtilService.formatCurrency(item.valorTotal)}</td>
                    </tr>
                  ))}
              </tbody>
              <span className={`${styles.itensCarrinho}`}>
                Seu carrinho possui {itensCarrinho} {itensCarrinho <= 1 ? 'item' : 'itens'}
              </span>
            </table>
            <span className={`${styles.valorTotal}`}>
              {itensCart.forEach(x => (valorTotal += x.Valor * x.quantidade))}
              {UtilService.formatCurrency(valorTotal)}
            </span>
            <hr />
            <div className={`${styles.frete}`}>
              <div className={`${styles.formaPagamento}`}>
                <span>Forma de pagamento: </span>
                <span>
                  <select
                    className={`${styles.select} form-select`}
                    onChange={e => {
                      setTiposPagamentos(e.target.value);
                    }}
                  >
                    <option defaultValue={0}>Cartão de crédito</option>
                    {UtilService.pagamentos.map((x, i) => (
                      <option key={i} value={x.id}>
                        {x.descricao}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
              <div className={`${styles.cep}`}>
                <ValorPrazoFrete setValorFrete={setValorFrete} valorFrete={valorFrete} />
              </div>
              <div>
                {valorFrete &&
                  valorFrete.map((info, i) => (
                    <div key={i}>
                      {(valorFreteCalculado = info.Valor)}
                      <span className={`${styles.infosEntrega}`}>Valor do Frete: {info.Valor}</span>

                      <span className={`${styles.infosEntrega}`}>Prazo de entrega:{info.PrazoEntrega} dias</span>
                      <span className={`${styles.infosEntrega}`}>
                        Previsto para:{' '}
                        {moment()
                          .add(+info.PrazoEntrega, 'days')
                          .locale('pt-br')
                          .format('DD/MM/YYYY')}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <hr />
            <div className={`${styles.botoes}`}>
              <div>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    limparCarrinho(setItensCart, setItensCarrinho);
                    navigate('/');
                  }}
                >
                  Limpar carrinho
                </button>
              </div>
              <div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={e => finalizarCompra(e, itensCart, valorTotal, tiposPagamentos, setItensCarrinho, navigate)}
                >
                  Finalizar compra
                </button>
              </div>
              <div>
                <div>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/')}>
                    Continuar comprando
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
