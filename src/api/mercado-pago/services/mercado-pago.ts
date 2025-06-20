// import { MercadoPagoConfig, Payment } from "src/api/mercado-pago/services/mercado-pago";
// import { env } from "@strapi/utils";
// import { PaymentCreateRequest } from "mercadopago/dist/clients/payment/create/types";
// import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
// import { randomInt } from "node:crypto";
import {Data} from "@strapi/types";

export const mercadoPagoServices = {

  async createPaymentPreference(data,user:Data.Entity<'plugin::users-permissions.user'>) {
  //   const client = new MercadoPagoConfig({ accessToken: 'APP_USR-219604203950781-022106-eff9402ef482d8664af5963726dfd5f5-1071515158', options: { timeout: 5000, idempotencyKey: randomInt(100000000).toString() } });
  //   const preferenceAPI = new Payment(client);
  //   const priceUSD = PRICES_USD[data.membershipEnum] || 10;
  //   const exchangeRate = ;
  //   const priceBRL = priceUSD * exchangeRate;
  //   const body: PaymentCreateRequest = {
  //     // eslint-disable-next-line camelcase
  //     transaction_amount: parseFloat(priceBRL.toFixed(2)),
  //     // eslint-disable-next-line camelcase
  //     notification_url: `${env('WEBHOOK_URL')}/api/mercadopago/webhook`,
  //     // eslint-disable-next-line camelcase
  //     payment_method_id: "pix",
  //     payer: {
  //       email: "teste@hotmail.com"
  //     },
  //     metadata: {
  //       membershipEnum: data.membershipEnum,
  //       premiumDocumentID: user.premium?.documentId,
  //     }
  //   };
  //   let response: PaymentResponse;
  //   try {
  //     response = await preferenceAPI.create({ body });
  //   } catch (error) {
  //     strapi.log.error('[createPaymentPreference service] Error:', error);
  //   }
  //   return response
  },

}

export default () => ({
  ...
  mercadoPagoServices,
});
