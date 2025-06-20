import Stripe from "stripe";
// import { env } from "@strapi/utils";
// const stripe = new Stripe(env("STRIPE_KEY"));

export const stripeServices = {
  createCheckoutSession: async (data): Promise<Stripe.Checkout.Session> => {
    // const LOG_PREFIX = '[stripe createCheckoutSession Service]';
    // TODO Implement the logic to create a checkout session
    return {} as Stripe.Checkout.Session;
  },
}

export default () => ({
  ...
  stripeServices
});
