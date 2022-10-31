import React from 'react'
import { putImageProduct } from '../../api/ProductsApi'

export const AddProductImage = async (id, data, setLoop, loop) => {

    try {
        const result = await putImageProduct(id, data)
        return result;
    } catch (error) {
        return error
    }
}
