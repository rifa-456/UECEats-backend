export default {
  routes: [
    {
      method: 'POST',
      path: `/estudantes/avaliar/:pedidoID`,
      handler: 'estudante.avaliarPedido',
    },
    {
      method: 'GET',
      path: `/estudantes/pedidos/:estudanteDocumentId`,
      handler: 'estudante.getPedidos',
    }
  ]
}
