import { io, Socket } from 'socket.io-client';

export class SocketIOClient {
  private socket: Socket | null = null;
  private readonly serverUrl: string;

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  connect(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io(this.serverUrl, {
        auth: { token },
        transports: ['websocket'],
      });
      this.socket.on('connect', () => {
        console.log('Connected to socket server');
        resolve();
      });
      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        reject(error);
      });
      this.socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketIOClient = new SocketIOClient('http://localhost:1337');
socketIOClient.connect('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzQ0MjI5MjI4LCJleHAiOjIwNTk4MDUyMjh9.257vtcsMez4ODw5zIixL0WChlw5k9LeGUsHI0sATCXs')