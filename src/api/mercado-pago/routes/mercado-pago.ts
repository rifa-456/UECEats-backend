export default {
  routes: [
    {
      method: "POST",
      path: "/mercado-pago/webhook",
      handler: "mercado-pago.webhook",
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: "POST",
      path: "/mercado-pago/pagamento",
      handler: "mercado-pago.pagamento",
      config: {
        policies: [],
        middlewares: []
      }
    },
  ],
};
