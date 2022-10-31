import webApi from './webApi';

const addPurchaseOrder = async data => {
  try {
    const result = await webApi.post('/purchaseorder/', data);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return error;
  }
};

const getPurchaseOrdersByUserId = async (userId, itensPorPagina, pagina) => {
  try {
    const result = await webApi.get(`/purchaseorder/${userId}?itensPorPagina=${itensPorPagina}&pagina=${pagina}`);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

const getPurchaseOrderById = async(id)=>{
  try {
    const result = await webApi.get(`/purchaseorder/pedido/${id}`)
    return result.data
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
    
  }
}

export { addPurchaseOrder, getPurchaseOrdersByUserId, getPurchaseOrderById };
