/**
 * restaurante controller
 */

import { factories } from '@strapi/strapi'
import utils from "@strapi/utils";
const { ValidationError } = utils.errors;

export default factories.createCoreController('api::restaurante.restaurante', () => ({

  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    const dataWithAverage = await Promise.all(
      data.map(async (restaurant) => {
        const averageReview = 0;
        return {
          ...restaurant,
          averageReview,
        };
      })
    );
    return { data: dataWithAverage, meta };
  },

  async getCardapio(ctx) {
    // @ts-expect-error this works
    const {documentId} = ctx.request.params;
    if (!documentId) {
      throw new ValidationError('O Request não possui documentId, por favor tente novamente.');
    }
    const restaurante = await strapi.documents('api::restaurante.restaurante').findOne({
      documentId,
      populate: {
        usuario: {
          populate: {
            avatar: true
          }
        },
        cardapio: true
      },
    });
    return ctx.send(restaurante);
  },

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

