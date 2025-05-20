import { Socket  } from 'socket.io';

export const userWebsockets = {
  joinRoom: async (socket:Socket, room: string) => {
    socket.join(room)
    strapi.log.info(`[io] socket user ${socket.data.user.username} attempting to join room ${room}`);
  }
};