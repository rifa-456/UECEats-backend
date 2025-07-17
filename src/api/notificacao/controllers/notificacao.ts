/**
 * notificacao controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::notificacao.notificacao', () => ({

  async getNotificacoes(ctx) {
    // @ts-expect-error this works
    const {usuarioDocumentId} = ctx.request.params;
    const notificacoes = await strapi.documents('api::notificacao.notificacao').findMany({
      populate: {
        usuario: true
      }
    });
    const notificacoesUsuario = notificacoes.filter(notificacao =>
      notificacao.usuario.documentId === usuarioDocumentId
    );
    return ctx.send(notificacoesUsuario)
  },

}));