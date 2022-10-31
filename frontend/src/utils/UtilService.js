const dateComplete = () => {
  const dateComplete = new Date().toLocaleDateString();
  return dateComplete;
};

const cnpj = cnpj => {
  cnpj = cnpj.replace(/\D/g, '');
  cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
  cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
  return cnpj;
};
const cpf = cpf => {
  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return cpf;
};

const formatLongDate = dataCrida => {
  const date = new Date(dataCrida);
  const retornaData = Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dataFinal = retornaData.format(date);
  return dataFinal;
};

const formatShortDate = dataCrida => {
  const date = new Date(dataCrida);
  const retornaData = Intl.DateTimeFormat('pt-BR', {
    // weekday: "short",
    year: '2-digit',
    month: 'short',
    day: 'numeric',
  });
  const dataFinal = retornaData.format(date);
  return dataFinal;
};

const hoje = () => {
  let data = new Date();
  let dia = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = data.getFullYear();
  let dataAtual = `${dia}/${mes}/${ano}`;
  return dataAtual;
};

const abreviar = texto => {
  let resultado = texto.substring(0, 15) + '...';
  return resultado;
};

const calcularPercentual = (menorValor, mariorValor) => {
  let percentual = Math.ceil((menorValor / mariorValor - 1) * 100 + 100) + '%';
  return percentual;
};

const getUpperCase = text => {
  let upper = text.toUpperCase();
  return upper;
};

const formatCurrency = value => {
  if (Number.isNaN(value) || value === null || value === '' || value === 'NaN') {
    return 0;
  }
  value = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return value;
};

const pagamentos = [
  { id: 1, descricao: 'PIX' },
  { id: 2, descricao: 'Débito em conta' },
  { id: 3, descricao: 'Transferência em conta' },
];

const tipoPagamento = status => {
  switch (status) {
    case 0:
      return 'Cartão de crédito';
    case 1:
      return 'Boleto';
    case 2:
      return 'PIX';
    case 3:
      return 'Transferência em conta';
    default:
      return;
  }
};

const statusPedido = status =>{
  switch (status) {
    case 0:
      return 'Pedido recebido';
    case 1:
      return 'Pedido processado';
    case 2:
      return 'Pedido cancelado';
    case 3:
      return 'Pedido finalizado';
    default:
      return;
  }
}

export const UtilService = {
  dateComplete,
  cnpj,
  cpf,
  formatLongDate,
  formatShortDate,
  abreviar,
  calcularPercentual,
  hoje,
  formatCurrency,
  getUpperCase,
  tipoPagamento,
  pagamentos,
  statusPedido
};

export default UtilService;
