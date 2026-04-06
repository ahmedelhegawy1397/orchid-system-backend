import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitUserCreated(user: any): void;
    emitUserUpdated(user: any): void;
    emitUserDeleted(userId: string): void;
    emitUsersListUpdated(): void;
}
