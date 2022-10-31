
import { toast } from 'react-toastify';
import { addPurchaseOrder } from '../api/PurchaseOrderApi';

const limparCarrinho = (setItensCart, setItensCarrinho) => {
    setItensCart([])
    localStorage.removeItem('@carrinho')
    setItensCarrinho('')
    toast.warning(`Carrinho esvaziado com sucesso!`, { autoClose: 1000, position: 'bottom-center' })

}


const incrementQuantity = (itensCart, id, setQuantidade, setValorTotalAtualizado) => {
    const pegarItem = itensCart.find((x) => x.Id === id)
    if (pegarItem) {
        if (pegarItem.quantidade < pegarItem.QuantidadeEstoque) {
            setQuantidade(pegarItem.quantidade += 1)
            setValorTotalAtualizado(pegarItem.valorTotal = (pegarItem.quantidade * pegarItem.Valor))
        } else {
            alert("Quantidade maxima permitida")
            return
        }
    }
    localStorage.setItem('@carrinho', JSON.stringify([...itensCart]))
}

const decrementQuantity = (itensCart, id, setItensCarrinho, setItensCart, navigate, setQuantidade, setValorTotalAtualizado) => {

    const pegarItem = itensCart.find((x) => x.Id === id)
    if (pegarItem) {
        if (pegarItem.quantidade <= 1) {
            let removeItem = itensCart.filter(x => x.Id !== id)
            localStorage.setItem('@carrinho', JSON.stringify(removeItem))
            setItensCarrinho(JSON.parse(localStorage.getItem('@carrinho')).length || '')
            if (JSON.parse(localStorage.getItem('@carrinho')).length < 1) {
                setItensCarrinho('')
                localStorage.removeItem('@carrinho')
                setTimeout(() => {
                    navigate('/')
                }, 2500)
            }
            setItensCart(removeItem)
            return
        }
        pegarItem.quantidade -= 1
        setQuantidade(pegarItem.quantidade)
        setValorTotalAtualizado(pegarItem.valorTotal = pegarItem.quantidade * pegarItem.Valor)
    }
    localStorage.setItem('@carrinho', JSON.stringify([...itensCart]))
}

const finalizarCompra = async (e, itensCart, valorTotal, tiposPagamentos, setItensCarrinho, navigate ) => {
    try {
      let pedido = {}
      e.preventDefault();
      const usuarioId = JSON.parse(localStorage.getItem('@id'));
      pedido = { itensCart, valorTotal, tiposPagamentos, usuarioId }
      const result = await addPurchaseOrder(pedido)
      toast.success(result.message, { autoClose: 2000, position: 'bottom-center' })
      localStorage.removeItem('@carrinho')
      setItensCarrinho('')
      navigate('/')
      return result
    } catch (error) {
      console.log(error)
      return error
    }
  }


export {
    limparCarrinho,
    incrementQuantity,
    decrementQuantity, 
    finalizarCompra
}


