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
  ],
};
