export default {

  async webhook(ctx) {
    // const LOG_PREFIX = '[mercadopago webhook Controller]';
    return ctx.send({
      status: "received"
    });
  },

  async pagamento(ctx) {
    // const LOG_PREFIX = '[mercadopago payment Controller]';
    return ctx.send({
      status: "received"
    });
  },

};

