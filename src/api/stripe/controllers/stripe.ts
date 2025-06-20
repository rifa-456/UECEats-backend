// import Stripe from "stripe";
// import {env} from "@strapi/utils";

// const stripe = new Stripe(env("STRIPE_KEY"));
// const liveWebhookSecret = env("LIVE_STRIPE_WEBHOOK_SECRET") as string;
// const testWebhookSecret = env("TEST_STRIPE_WEBHOOK_SECRET") as string;
// const unparsed = Symbol.for('unparsedBody')

export default {
  async webhook(ctx) {
    // const LOG_PREFIX = '[stripe webhook Controller]';
    return ctx.send({
      status: "received"
    });
  },

};
