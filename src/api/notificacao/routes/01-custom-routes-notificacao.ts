export default {
  routes: [
    {
      method: 'GET',
      path: `/notificacoes/usuario/:usuarioDocumentId`,
      handler: 'notificacao.getNotificacoes',
    }
  ]
}
