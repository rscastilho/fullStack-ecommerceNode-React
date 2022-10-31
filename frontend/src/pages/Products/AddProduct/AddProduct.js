import React, { useState } from 'react'
import Input from '../../../components/Form/Input'
import styles from './AddProduct.module.css'
import Button from './../../../components/Form/Button';
import { postCreateProduct } from '../../../api/ProductsApi'
import { UtilService } from './../../../utils/UtilService';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddProduct = ({setData}) => {

  const [descricao, setDescricao] = useState('')
  const [quantidadeEstoque, setQuantidadeEstoque] = useState('')
  const [quantidadeMinima, setQuantidadeMinima] = useState('')
  const [valor, setValor] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [fornecedorId, setFornecedorId] = useState('')

  const data = {
    descricao,
    quantidadeEstoque,
    quantidadeMinima,
    valor,
    categoriaId,
    fornecedorId,
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const result = await postCreateProduct(data);
      toast.success(result.message, {autoClose:1000})
      return result;
      
    } catch (error) {
      
    }
  }


  return (
    <div>
      <form onSubmit={handleSave}>

        <div>
          <Input
            labelValue={"Produto"}
            inputPlaceHolder={"Descrição do produto"}
            inputType={"text"}
            value={descricao}
            handleFunction={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div>
          <Input
            labelValue={"Quantidade estoque"}
            inputPlaceHolder={"Quantidade estoque"}
            inputType={"number"}
            value={quantidadeEstoque}
            handleFunction={(e) => setQuantidadeEstoque(e.target.value)}
          />
        </div>
        <div>
          <Input
            labelValue={"Quantidade Minima"}
            inputPlaceHolder={"Quantidade minima"}
            inputType={"number"}
            value={quantidadeMinima}
            handleFunction={(e) => setQuantidadeMinima(e.target.value)}
          />
        </div>
        <div>
          <Input
            labelValue={"Valor"}
            inputPlaceHolder={"Valor unitário"}
            inputType={"number"}
            value={valor}
            handleFunction={(e) => setValor(e.target.value)}
          />
        </div>
        <div>
          <Input
            labelValue={"Valor total"}
            inputPlaceHolder={"Valor total"}
            inputType={"teste"}
            value={UtilService.formatCurrency(valor * quantidadeEstoque)}
          />
        </div>
        <div>
          <Input
            labelValue={"Categoria"}
            inputPlaceHolder={"Categoria"}
            inputType={"number"}
            value={categoriaId}
            handleFunction={(e) => setCategoriaId(e.target.value)}
          />
        </div>
        <div>
          <Input
            labelValue={"Fornecedor"}
            inputPlaceHolder={"Valor unitário"}
            inputType={"number"}
            value={fornecedorId}
            handleFunction={(e) => setFornecedorId(e.target.value)}
          />
        </div>
        
      </form>
    </div>
  )
}

export default AddProduct