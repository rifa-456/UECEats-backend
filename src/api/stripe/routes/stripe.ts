export default {
  routes: [
    {
      method: "POST",
      path: "/stripe/webhook",
      handler: "stripe.webhook",
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: "POST",
      path: "/stripe/pedido",
      handler: "stripe.pedido",
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/stripe/redirect/success',
      handler: 'stripe.handleRedirect',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/stripe/redirect/cancel',
      handler: 'stripe.handleRedirect',
      config: {
        auth: false,
      },
    },
  ],
};
