import webApi from './webApi';

const GetAll = async (itensPorPagina, pagina) => {
  try {
    const result = await webApi.get(`/products/getall?itensPorPagina=${+itensPorPagina}&pagina=${+pagina}`);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const GetById = async id => {
  try {
    const result = await webApi.get(`/products/details/${id}`);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const GetByIdAll = async id => {
  try {
    const result = await webApi.get(`/products/detailsall/${id}`);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const GetProductByDescription = async descricao => {
  try {
    const result = await webApi.get(`/products/getproductbydescricao/${descricao}`);
    return result.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const getProductsByCategoriyId = async categoriaId => {
  try {
    const result = await webApi.get(`/products/getproductsbycategoriaid/${categoriaId}`);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const postCreateProduct = async data => {
  try {
    const result = await webApi.post('/products/', data);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const postCalcularValorFrete = async cep => {
  try {
    const result = await webApi.post('/products/frete', cep);
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const putProduct = async (id, data) => {
  try {
    const result = await webApi.put(`/products/${id}`, data, {});
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const putImageProduct = async (id, data) => {
  try {
    // console.log('api',id, data)
    // let datas = new FormData(data)
    const result = await webApi.patch(`/products/saveimage/${id}`, data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    // console.log(result)
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteProduct = async id => {
  try {
    const result = await webApi.put(`products/delete/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export {
  GetAll,
  GetById,
  GetByIdAll,
  GetProductByDescription,
  getProductsByCategoriyId,
  postCreateProduct,
  postCalcularValorFrete,
  putProduct,
  putImageProduct,
  deleteProduct,
};
