/**
 * entregador controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::entregador.entregador', () => ({

  async desempenho(ctx) {
    return ctx.send({
      status: "received"
    });
  },

  async avaliacao(ctx) {
    return ctx.send({
      status: "received"
    });
  },

  async aceitarPedido(ctx) {
    return ctx.send({
      status: "received"
    });
  },

  async desistirPedido(ctx) {
    return ctx.send({
      status: "received"
    });
  },

}));
