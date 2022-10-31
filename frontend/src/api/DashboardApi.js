import webApi from '../api/webApi';

const contarProdutosPorCategorias = async () => {
  try {
    const result = await webApi.get('/dashboard/produtosPorCategoria');
    return result.data;
  } catch (error) {
    return error;
  }
};

const contarUsuarios = async () => {
  try {
    const result = await webApi.get('/dashboard/contarusuarios');
    return result.data;
  } catch (error) {
    return error;
  }
};

const contarPedidosPorUsuarios = async () => {
  try {
    const result = await webApi.get('/dashboard/contarpedidosporusuario');
    return result.data;
  } catch (error) {
    return error;
  }
};

const valorDoPedidoPorUsuario = async () => {
  try {
    const result = await webApi.get('/dashboard/valorcompradoporusuario');
    return result.data;
  } catch (error) {
    return error;
  }
};

export { contarProdutosPorCategorias, contarUsuarios, contarPedidosPorUsuarios, valorDoPedidoPorUsuario };
