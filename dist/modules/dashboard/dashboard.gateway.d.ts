import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class DashboardGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitDashboardUpdated(data?: any): void;
    emitAppointmentChanged(appointment: any): void;
    emitRevenueChanged(payment: any): void;
    emitExpenseChanged(expense: any): void;
}
