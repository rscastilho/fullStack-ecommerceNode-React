import React, { useRef, useState } from 'react'
import styles from './GetProductsByDescription.module.css'
import { FcSearch } from 'react-icons/fc';
import { GetProductByDescription, GetAll } from '../../api/ProductsApi'

const GetProductsByDescription = ({ setProducts, setRegistros }) => {

    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef();
    const [descricao, setDescricao] = useState('')

    const focusSearch = () => {
        setShowInput(!showInput)
        if (!showInput) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 400)
        }
    }

    const searchProducts = async (e) => {
        try {
            setDescricao(e.target.value)
            if (descricao.trim().length >= 2) {
                const result = await GetProductByDescription(descricao);
                setRegistros(result.registros)
                setProducts(result.data || result)
            } else if (descricao.length < 3) {
                const result = await GetAll();
                setRegistros(result.registros)
                setProducts(result.data || result)
            }
        } catch (error) {
            console.log(error.message)
            return
        }
    }


    return (
        <div className={`${styles.inputFocus}`}>
            <FcSearch
                size={`1.9em`}
                className={`me-2`}
                onClick={focusSearch}
            />
            {showInput &&
                <input
                    type="text"
                    value={descricao}
                    placeholder={`Pesquisar`}
                    onChange={searchProducts}
                    className={`form-control`}
                    ref={inputRef}
                />
            }


        </div>
    )
}

export default GetProductsByDescription