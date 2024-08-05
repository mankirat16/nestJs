import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class MyGateway {
  @WebSocketServer()
  server: Server;
  socketId: string;
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`new connection established with socket id ${socket.id}`);
      this.socketId = socket.id;
      socket.join(socket.id);
    });
  }
  @SubscribeMessage('event')
  onEvent(@MessageBody() message: any, @ConnectedSocket() client: Socket) {
    // this.server.emit('onEvent', message);
    // console.log(client);
    client.broadcast.emit('onEvent', message);
  }
}
