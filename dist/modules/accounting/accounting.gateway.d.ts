import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class AccountingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitInvoiceCreated(invoice: any): void;
    emitInvoiceUpdated(invoice: any): void;
    emitPaymentAdded(payment: any, invoice: any): void;
    emitExpenseCreated(expense: any): void;
    emitExpenseUpdated(expense: any): void;
    emitExpenseDeleted(expenseId: string): void;
    emitAccountingUpdated(): void;
}
