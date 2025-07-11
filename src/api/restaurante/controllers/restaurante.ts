/**
 * restaurante controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::restaurante.restaurante', () => ({

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

}));

