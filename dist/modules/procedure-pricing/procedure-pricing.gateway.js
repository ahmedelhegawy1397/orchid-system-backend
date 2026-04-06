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
var ProcedurePricingGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcedurePricingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let ProcedurePricingGateway = ProcedurePricingGateway_1 = class ProcedurePricingGateway {
    constructor() {
        this.logger = new common_1.Logger(ProcedurePricingGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    emitProcedurePricingCreated(procedurePricing) {
        this.server.emit('procedurePricingCreated', {
            procedurePricing,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Procedure pricing created event emitted: ${procedurePricing._id}`);
    }
    emitProcedurePricingUpdated(procedurePricing) {
        this.server.emit('procedurePricingUpdated', {
            procedurePricing,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Procedure pricing updated event emitted: ${procedurePricing._id}`);
    }
    emitProcedurePricingDeleted(procedurePricingId) {
        this.server.emit('procedurePricingDeleted', {
            procedurePricingId,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Procedure pricing deleted event emitted: ${procedurePricingId}`);
    }
    emitProcedurePricingBulkUpdated(count) {
        this.server.emit('procedurePricingBulkUpdated', {
            count,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Procedure pricing bulk updated event emitted: ${count} items`);
    }
    emitProcedurePricingListUpdated() {
        this.server.emit('procedurePricingListUpdated', {
            timestamp: new Date().toISOString(),
        });
        this.logger.log('Procedure pricing list updated event emitted');
    }
};
exports.ProcedurePricingGateway = ProcedurePricingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ProcedurePricingGateway.prototype, "server", void 0);
exports.ProcedurePricingGateway = ProcedurePricingGateway = ProcedurePricingGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true,
        },
        namespace: '/procedure-pricing',
    })
], ProcedurePricingGateway);
//# sourceMappingURL=procedure-pricing.gateway.js.map