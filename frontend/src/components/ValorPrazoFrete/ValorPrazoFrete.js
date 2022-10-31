import React, { useState } from 'react'
import styles from './ValorPrazoFrete.module.css'
import { postCalcularValorFrete } from '../../api/ProductsApi'

const ValorPrazoFrete = ({ setValorFrete, valorFrete }) => {
    const [cep, setFrete] = useState('')

    const calcular = async (e) => {
        try {
            e.preventDefault();
            const result = await postCalcularValorFrete({ sCepDestino: cep })
            if (result) {
                setValorFrete(result)
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    return (
        <div>
            <form
                className={`${styles.boxCEP}`}
                onSubmit={calcular}>
                <label>CEP:</label>
                <div>
                    <input
                        className={`form-control ${styles.inputCep}`}
                        type="text"
                        value={cep}
                        onChange={(e) => setFrete(e.target.value)}
                        maxLength={9}
                        minLength={8}
                    />
                </div>
                <div>
                    <button
                        className={`${styles.buttonCep} btn btn-sm btn-primary`}
                        type={'submit'}
                        disabled={cep.length < 8 ? true : false}
                    >
                        Calcular frete
                    </button>
                    
                </div>
            </form>
        </div>
    )
}

export default ValorPrazoFrete