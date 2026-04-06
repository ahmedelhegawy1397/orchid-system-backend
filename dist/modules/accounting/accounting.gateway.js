"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AccountingGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let AccountingGateway = AccountingGateway_1 = class AccountingGateway {
    constructor() {
        this.logger = new common_1.Logger(AccountingGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    emitInvoiceCreated(invoice) {
        this.server.emit('invoiceCreated', {
            invoice,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Invoice created event emitted: ${invoice._id}`);
    }
    emitInvoiceUpdated(invoice) {
        this.server.emit('invoiceUpdated', {
            invoice,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Invoice updated event emitted: ${invoice._id}`);
    }
    emitPaymentAdded(payment, invoice) {
        this.server.emit('paymentAdded', {
            payment,
            invoice,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Payment added event emitted: ${payment._id}`);
    }
    emitExpenseCreated(expense) {
        this.server.emit('expenseCreated', {
            expense,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Expense created event emitted: ${expense._id}`);
    }
    emitExpenseUpdated(expense) {
        this.server.emit('expenseUpdated', {
            expense,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Expense updated event emitted: ${expense._id}`);
    }
    emitExpenseDeleted(expenseId) {
        this.server.emit('expenseDeleted', {
            expenseId,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Expense deleted event emitted: ${expenseId}`);
    }
    emitAccountingUpdated() {
        this.server.emit('accountingUpdated', {
            timestamp: new Date().toISOString(),
        });
        this.logger.log('Accounting updated event emitted');
    }
};
exports.AccountingGateway = AccountingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AccountingGateway.prototype, "server", void 0);
exports.AccountingGateway = AccountingGateway = AccountingGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true,
        },
        namespace: '/accounting',
    })
], AccountingGateway);
//# sourceMappingURL=accounting.gateway.js.map