import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class DoctorsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitDoctorCreated(doctor: any): void;
    emitDoctorUpdated(doctor: any): void;
    emitDoctorDeleted(doctorId: string): void;
    emitDoctorsListUpdated(): void;
}
