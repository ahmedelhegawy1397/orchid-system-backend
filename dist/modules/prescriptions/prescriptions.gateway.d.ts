import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class PrescriptionsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitPrescriptionCreated(prescription: any): void;
    emitPrescriptionUpdated(prescription: any): void;
    emitPrescriptionDeleted(prescriptionId: string): void;
    emitPrescriptionsListUpdated(): void;
}
