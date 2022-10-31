import webApi from "./webApi";


const getAllCategories = async () => {
    try {
        const result = await webApi.get('/categories/')
        return result.data
    } catch (error) {
        return error.response.data
    }
}

const getCategoriesById = async (id)=>{
    try {
        const result = await webApi.get('')
    } catch (error) {
        return error.response.data
    }
}

export { getAllCategories } 