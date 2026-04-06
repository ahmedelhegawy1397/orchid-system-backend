import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class PatientsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitProcedureAdded(patientId: string, procedure: any): void;
    emitProcedureUpdated(patientId: string, procedure: any): void;
    emitProcedureDeleted(patientId: string, procedureId: string): void;
    emitPatientUpdated(patientId: string, data: any): void;
    emitPatientCreated(patient: any): void;
    emitPatientDeleted(patientId: string): void;
    emitPatientsListUpdated(): void;
}
