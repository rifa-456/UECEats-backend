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

  async getPedidos(ctx) {
    // @ts-expect-error this works
    const {estudanteDocumentId} = ctx.request.params;
    const pedidos = await strapi.documents('api::pedido.pedido').findMany({
      populate: {
        cliente: {
          populate: {
            usuario: true
          }
        },
        restaurante: {
          populate: {
            usuario: true
          }
        },
        comidas: true,
        entregador: {
          populate: {
            usuario: true
          }
        },
        avaliacaoEntregador: true,
        avaliacaoRestaurante: true,
        pagamento: true
      }
    });
    const estudantePedidos = pedidos.filter(pedido =>
      pedido.cliente.usuario.documentId === estudanteDocumentId
    );
    const transformed = estudantePedidos.map(pedido => {
      const qtyMap = pedido.comidasPedidas ?? {};
      const fullComidas: any[] = pedido.comidas;
      const comidasPedidas: any[] = Object.entries(qtyMap).map(
        ([comidaId, quantity]) => {
          const match = fullComidas.find(
            c => String(c.id) === comidaId
          );
          if (!match) {
            return null;
          }
          return {
            ...match,
            quantity,
          } as any;
        }
      ).filter((x): x is any => x !== null);
      return {
        ...pedido,
        comidasPedidas,
      };
    });
    return ctx.send(transformed);
  },

  async getUsuario(ctx) {
    // @ts-expect-error this works
    const {usuarioDocumentId} = ctx.request.params;
    const estudantes = await strapi.documents('api::estudante.estudante').findMany({
      populate: {
        usuario:  true
      },
    });
    const estudante = estudantes.filter(estudante =>
      estudante.usuario.documentId === usuarioDocumentId
    );
    return ctx.send(estudante);
  },

}));
