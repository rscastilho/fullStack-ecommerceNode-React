import React from 'react'
import styles from './ModalDelete.module.css'
import { deleteProduct } from '../../../api/ProductsApi'
import { toast } from 'react-toastify';

const ModalDelete = ({ id, produto, loop, setLoop }) => {

    const deleteProd = async () => {
        try {
            const result = await deleteProduct(+id)
            setLoop(!loop)
            toast.success(result.message, { autoClose: 2000 })
            return result

        } catch (error) {
            console.log(error)
            return error
        }
    }

    return (
        <div className="modal fade" id="modalDelete" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ModalLabel">Confirmar exclusão Id: {id}?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h5>Deseja realmente excluir {produto}? </h5>

                    </div>
                    <div className={`modal-footer ${styles.botoes}`}>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Fechar
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={deleteProd}
                            data-bs-dismiss="modal"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete