import { env } from "@strapi/utils";
import axios from 'axios';
import FormData from 'form-data';

module.exports = (plugin) => {
  const rawAuth = plugin.controllers.auth({ strapi });
  plugin.controllers.auth = () => {
    return {
      ...rawAuth,
      callback: async (ctx) => {
        const accessToken = ctx.request.query.access_token;
        let response: Response;
        try {
          response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        } catch (error) {
          return ctx.badRequest("Falha ao validar token da Google, ", error.message);
        }
        const userData: any = await response.json();
        const { email, picture } = userData;
        const domain = email.split('@')[1] || '';
        if (!domain.toLowerCase().includes('uece')) {
          return ctx.badRequest("Somente emails da UECE são permitidos");
        }
        await rawAuth.callback(ctx);
        const users = await strapi.documents('plugin::users-permissions.user').findMany({
          populate: ['avatar'],
        });
        const user = users.find((user) => user.email === email);
        if (user && picture && !user.avatar) {
          const imageResponse = await axios.get(picture, {
            responseType: 'arraybuffer',
          });
          const contentType = imageResponse.headers['content-type'] || 'image/png';
          const extension = contentType.split('/')[1] || 'png';
          const formData = new FormData();
          const buffer = Buffer.from(imageResponse.data);
          formData.append('files', buffer, {
            filename: `avatar-${user.username}.${extension}`,
            contentType,
          });
          const uploadResponse = await axios.post(
            `${strapi.config.server.absoluteUrl}/api/upload`,
            formData,
            {
              headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${env('FULL_ACCESS_TOKEN')}`,
              },
            }
          );
          const fileId = uploadResponse.data[0].id;
          await strapi.documents('plugin::users-permissions.user').update({
            documentId: user.documentId,
            data: {
              avatar: fileId,
            }
          })
        }
      }
    };
  };

  plugin.controllers.user.me = async (ctx) => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }
    ctx.body = await strapi.documents('plugin::users-permissions.user').findOne({
      documentId: ctx.state.user.documentId,
      populate: {
        avatar: true,
        notifications: true,
      }
    })
  };
  return plugin;
};