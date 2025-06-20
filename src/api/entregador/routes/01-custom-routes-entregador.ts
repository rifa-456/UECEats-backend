export default {
  routes: [
    {
      method: 'GET',
      path: `/entregadores/desempenho`,
      handler: 'entregador.desempenho',
    },
    {
      method: 'GET',
      path: `/entregadores/avaliacoes`,
      handler: 'entregador.avaliacao',
    },
    {
      method: 'PUT',
      path: `/entregadores/aceitar/:pedidoID`,
      handler: 'entregador.aceitarPedido',
    },
    {
      method: 'PUT',
      path: `/entregadores/desistir/:pedidoID`,
      handler: 'entregador.desistirPedido',
    },
  ]
}
