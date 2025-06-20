export default {
  routes: [
    {
      method: 'POST',
      path: `/estudantes/avaliar/:pedidoID`,
      handler: 'estudante.avaliarPedido',
    },
    {
      method: 'POST',
      path: `/estudantes/pagar/:pedidoID`,
      handler: 'estudante.pagarPedido',
    }
  ]
}
