exports.dashboardData = [
  {
    item: 'Usuários',
    opcao: [
      {
        descricao: 'Usuarios',
        link: '/dashboard/contarusuarios',
      },

      {
        descricao: 'Usuarios que nunca compraram',
        link: '/users/adm',
      },
    ],
  },
  {
    item: 'Produtos',
    opcao: [
      {
        descricao: 'Produtos comprados por categorias',
        link: '/dashboard/produtosporcategoria',
      },
      {
        descricao: 'Produtos cadastrados',
        link: '/products/adm',
      },
      {
        descricao: 'Produtos com estoque zerado',
        link: '/products/adm',
      },
      {
        descricao: 'Produtos deletados',
        link: '/products/adm',
      },
      {
        descricao: 'Produtos no limite de estoque',
        link: '/products/adm',
      },
    ],
  },
  {
    item: 'Pedidos',
    opcao: [
      {
        descricao: 'Pedidos recebidos',
        link: '/products/adm',
      },
      {
        descricao: 'Pedidos pendentes',
        link: '/products/adm',
      },
      {
        descricao: 'Pedidos entregues',
        link: '/products/adm',
      },
      {
        descricao: 'Pedidos por usuários',
        link: '/dashboard/pedidosporusuario',
      },
      {
        descricao: 'Valor de pedidos por usuário',
        link: '/dashboard/valorcompradoporusuario',
      },
    ],
  },
  {
    item: 'Fornecedores',
    opcao: [
      {
        descricao: 'Fornecedores cadastrados',
        link: '/products/adm',
      },
    ],
  },
  {
    item: 'Categorias',
    opcao: [
      {
        descricao: 'Categorias cadastradas',
        link: '/products/adm',
      },
    ],
  },
];
