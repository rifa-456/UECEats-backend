import Stripe from "stripe";
import {env} from "@strapi/utils";
import utils from "@strapi/utils";
import {pedidoServices} from "../../pedido/services/pedido";
import {stripeServices} from "../services/stripe";
const { ValidationError } = utils.errors;
const stripe = new Stripe(env("STRIPE_KEY"));
const testWebhookSecret = env("TEST_STRIPE_WEBHOOK_SECRET") as string;
const unparsed = Symbol.for('unparsedBody')

export default {
  async webhook(ctx) {
    const LOG_PREFIX = '[stripe webhook Controller]';
    strapi.log.info(`${LOG_PREFIX} Processing Stripe webhook`);
    const sig = ctx.request.headers['stripe-signature'];
    const rawData = ctx.request.body[unparsed];
    let event: Stripe.Event;
    try {
      strapi.log.debug(`${LOG_PREFIX} Attempting to verify webhook signature`);
      event = stripe.webhooks.constructEvent(
        rawData, 
        sig,
        testWebhookSecret
      );
    } catch (err) {
      strapi.log.error(`${LOG_PREFIX} Error verifying webhook signature: ${err.message}`);
      throw new ValidationError(`Webhook signature verification failed: ${err.message}`);
    }
    strapi.log.verbose(`${LOG_PREFIX} Event received: ${event.type}`);
    if (event.type === 'checkout.session.completed') {
      strapi.log.info(`${LOG_PREFIX} Processing checkout.session.completed event`);
      const session = event.data.object;
      const paymentID = session.metadata.paymentId;
      await strapi.documents("api::pagamento.pagamento").update({
        documentId: paymentID,
        data: {
          isPago: true,
          status: 'confirmado',
          metadata: {
            ...session.metadata,
            stripeSessionId: session.id,
            stripeCustomerId: session.customer as string,
          }
        }
      });
      strapi.log.info(`${LOG_PREFIX} Stripe checkout session processed successfully`);
      return ctx.send({message: `Stripe checkout session processed successfully`});
    } else {
      strapi.log.debug(`${LOG_PREFIX} Unhandled event type ${event.type}`);
      return ctx.send({message: `Unhandled event type ${event.type}`});
    }
  },

  async pedido(ctx) {
    const LOG_PREFIX = '[stripe pedido Controller]';
    const { restaurante, cliente, comidas, isRetirada, endereco, observacao, successUrl, cancelUrl} = ctx.request.body;
    const preco = await pedidoServices.calculatePrice(comidas);
    const estudantes = await strapi.documents('api::estudante.estudante').findMany({
      populate: {
        usuario: true
      }
    });
    const estudante = estudantes.find(estudante => estudante.usuario.documentId === cliente);
    const comidasId = Object.keys(comidas);
    const pedido = await strapi.documents('api::pedido.pedido').create({
      data: {
        restaurante: restaurante,
        cliente: estudante.documentId,
        comidas: { connect: comidasId },
        comidasPedidas: comidas,
        endereco: endereco,
        isRetirada: isRetirada,
        observacao: observacao,
        statusPedido: 'pendente'
      }
    });
    const payment = await strapi.documents('api::pagamento.pagamento').create({
      data: {
        gateway: 'stripe',
        meioDePagamento: 'cartao',
        isPago: 'false',
        valor: preco,
        usuario: cliente,
        statusPagamento: 'pendente'
      }
    })
    await strapi.documents('api::pedido.pedido').update({
      documentId: pedido.documentId,
      data: {
        pagamento: payment.id
      }
    })
    try {
      const session = await stripeServices.createCheckoutSession({
        successUrl,
        cancelUrl,
        currency: 'brl',
        price: preco,
        paymentId: payment.documentId,
      });
      strapi.log.info(`${LOG_PREFIX} Checkout session created successfully`);
      return ctx.send({
        url: session.url
      });
    } catch (error) {
      strapi.log.error(`${LOG_PREFIX} Error creating subscription: `, error.message);
      strapi.log.debug(error.stack);
    }
  },

  async handleRedirect(ctx) {
    const { app_redirect: appRedirectUrl } = ctx.query;
    strapi.log.info(`Redirecting to deep link: ${appRedirectUrl}`);
    return ctx.redirect(appRedirectUrl);
  }

};
