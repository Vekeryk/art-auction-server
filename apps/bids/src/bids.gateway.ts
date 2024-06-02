import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { AuthService } from '@app/common/services/auth.service';

import { BidsService } from './bids.service';
import { PlaceBidDto } from './dto/place-bid.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/bids-service/ws',
})
export class BidsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly authService: AuthService,
    private readonly bidsService: BidsService,
  ) {}

  async handleConnection(client: Socket) {
    const lotId = client.handshake.query.lotId as string;
    const token = client.handshake.query.token as string;
    try {
      console.log(lotId);
      await client.join(lotId);
      const user = await this.authService.validateToken(token);
      const room = this.server.sockets.adapter.rooms.get(lotId);
      console.log(user);
      if (user) {
        client.data.user = user;
        client.data.lotId = lotId;
      }
      if (room) {
        this.server.to(lotId).emit('usersCountUpdate', room.size);
      }
    } catch (err) {
      console.log(err);
      client.emit('error', 'Handshake authentication failed');
    }
  }

  handleDisconnect(client: Socket) {
    const user = client.data.user;
    const lotId = client.data.lotId;
    const room = this.server.sockets.adapter.rooms.get(lotId);
    if (room) {
      this.server.to(lotId).emit('usersCountUpdate', room.size);
    }
    console.log(user ? `${user.email} disconnected` : 'anonymous disconnected');
  }

  @SubscribeMessage('placeBid')
  async handlePlaceBid(
    @MessageBody() placeBidDto: PlaceBidDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    if (!user) {
      client.emit('error', 'Authentication required');
      return;
    }
    try {
      const placedBid = await this.bidsService.placeBid(user, placeBidDto);
      this.server.emit('bidUpdate', { ...placedBid, user });
    } catch (e) {
      client.emit('error', e.message);
    }
  }
}
