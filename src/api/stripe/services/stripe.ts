import Stripe from "stripe";
import { env } from "@strapi/utils";
const stripe = new Stripe(env("STRIPE_KEY"));

export const stripeServices = {
  createCheckoutSession: async (data): Promise<Stripe.Checkout.Session> => {
    try {
      return await stripe.checkout.sessions.create({
        // eslint-disable-next-line camelcase
        payment_method_types: ["card"],
        // eslint-disable-next-line camelcase
        line_items: [
          {
            // eslint-disable-next-line camelcase
            price_data: {
              currency: data.currency.toLowerCase(),
              // eslint-disable-next-line camelcase
              product_data: {
                name: 'Comida',
              },
              // eslint-disable-next-line camelcase
              unit_amount: data.price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        metadata: {
          paymentId: data.paymentId
        },
        // eslint-disable-next-line camelcase
        success_url: data.successUrl,
        // eslint-disable-next-line camelcase
        cancel_url: data.cancelUrl,
      });
    } catch (error) {
      strapi.log.error("[stripe createCheckoutSession service] Error creating checkout session:", error);
      throw error;
    }
  },
}

export default () => ({
  ...
  stripeServices
});
