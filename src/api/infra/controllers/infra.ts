/**
 * A set of functions called "actions" for `infra`
 */

export default {
  ping: async (ctx, next) => {
    ctx.send({
      received: true,
    })
  }
};
