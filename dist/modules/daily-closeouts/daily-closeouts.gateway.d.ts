import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class DailyCloseoutsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitCloseoutCreated(closeout: any): void;
    emitCloseoutUpdated(closeout: any): void;
    emitCloseoutDeleted(date: string): void;
    emitCloseoutsListUpdated(): void;
}
