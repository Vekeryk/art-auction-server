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
      if (user) {
        client.data.user = user;
        client.data.lotId = lotId;
        const room = this.server.sockets.adapter.rooms.get(lotId);
        this.server.to(lotId).emit('usersCount', room.size);
      }
    } catch (err) {
      client.emit('error', 'Handshake authentication failed');
    }
  }

  handleDisconnect(client: Socket) {
    const user = client.data.user;
    const lotId = client.data.lotId;
    const room = this.server.sockets.adapter.rooms.get(lotId);
    if (room) {
      this.server.emit('usersCount', room.size);
    }
    console.log(user ? `${user.email} disconnected` : 'anonymous disconnected');
  }

  @SubscribeMessage('placeBid')
  async handlePlaceBid(
    @MessageBody() placeBidDto: PlaceBidDto,
    @ConnectedSocket() client: Socket,
  ) {
    // console.log(this.server.to(placeBidDto.lotId));
    // const fetchSockets = await this.server.in(placeBidDto.lotId).fetchSockets();
    // console.log(fetchSockets);
    // console.log(fetchSockets.length);
    // console.log(client.rooms);
    // console.log(this.server.sockets.adapter.rooms);
    // console.log(this.server.sockets.adapter.rooms.get(placeBidDto.lotId));
    // console.log(this.server.sockets.adapter.rooms.get(placeBidDto.lotId).size);
    const user = client.data.user;
    if (!user) {
      client.emit('error', 'Authentication required');
      return;
    }
    try {
      const updatedLot = await this.bidsService.placeBid(user, placeBidDto);
      this.server.emit('bidUpdate', updatedLot);
    } catch (e) {
      client.emit('error', e.message);
    }
  }
}
