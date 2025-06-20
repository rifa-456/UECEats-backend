/**
 * estudante controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::estudante.estudante', () => ({

  async avaliarPedido(ctx) {
    return ctx.send({
      status: "received"
    });
  },

  async pagarPedido(ctx) {
    return ctx.send({
      status: "received"
    });
  },


}));
