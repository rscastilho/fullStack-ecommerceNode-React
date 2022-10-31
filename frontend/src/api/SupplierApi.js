import webApi from './webApi';


const getAllSuppliers = async () => {
    try {

        const result = await webApi('/suppliers')
        return result.data

    } catch (error) {
        return error.response.data
    }
}

const getAllSuppliersCategories = async()=>{
    try {
        const result = await webApi('/suppliers/fornecedorescategorias')
        return result.data
        
    } catch (error) {
        
        return error.response.data
    }
}

export {getAllSuppliers, getAllSuppliersCategories}