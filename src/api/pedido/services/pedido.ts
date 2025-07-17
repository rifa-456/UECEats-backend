import {factories} from '@strapi/strapi';

export const pedidoServices = {

  async calculatePrice(comidas: Record<string, number>) {
    let sumPrecos = 0;
    for (const [comidaId, quantidade] of Object.entries(comidas)) {
      const comida = await strapi.entityService.findOne('api::comida.comida', comidaId, {
        fields: ['preco'],
      });
      sumPrecos += comida.preco * quantidade;
    }
    return sumPrecos;
  },

};

export default factories.createCoreService('api::pedido.pedido', () => ({
  ...
  pedidoServices
}));
