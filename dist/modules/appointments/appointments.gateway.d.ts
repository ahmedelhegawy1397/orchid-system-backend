import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class AppointmentsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitAppointmentCreated(appointment: any): void;
    emitAppointmentUpdated(appointment: any): void;
    emitAppointmentCancelled(appointment: any): void;
    emitAppointmentDeleted(appointmentId: string): void;
}
