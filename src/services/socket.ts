import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const SOCKET_URL = 'https://your-websocket-server.com'; // Replace with your WebSocket server URL

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  auth: {
    userId: uuidv4(), // Generate a unique ID for each user
  },
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};