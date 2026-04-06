import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class LabManagementGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitLabRecordCreated(record: any): void;
    emitLabRecordUpdated(record: any): void;
    emitLabRecordDeleted(recordId: string): void;
}
