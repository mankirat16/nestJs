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
  socket: Socket;
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`new connection established with socket id ${socket.id}`);
      this.socket = socket;
      this.socketId = socket.id;
    });
  }

  //   @SubscribeMessage('event')
  //   onEvent(@MessageBody() message: any, @ConnectedSocket() client: Socket) {
  //     client.broadcast.emit('onEvent', message);
  //   }
  @SubscribeMessage('room')
  handleRoom(@MessageBody() userId: any) {
    console.log('User has joined room', userId);
    this.socket.join(userId);
  }
  @SubscribeMessage('event')
  onGenOtp(@MessageBody() message: any, @ConnectedSocket() client: Socket) {
    console.log(message);
  }

  sendOtpToAllClients(otp: string, userID: string) {
    console.log('sending otp to client');
    this.server.to(userID).emit('receivedOtp', { otp: otp });
    // this.socket.broadcast.emit('receivedOtp', { otp: otp });
  }
}
