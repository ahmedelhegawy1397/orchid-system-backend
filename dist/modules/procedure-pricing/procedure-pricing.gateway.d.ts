import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ProcedurePricingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitProcedurePricingCreated(procedurePricing: any): void;
    emitProcedurePricingUpdated(procedurePricing: any): void;
    emitProcedurePricingDeleted(procedurePricingId: string): void;
    emitProcedurePricingBulkUpdated(count: number): void;
    emitProcedurePricingListUpdated(): void;
}
