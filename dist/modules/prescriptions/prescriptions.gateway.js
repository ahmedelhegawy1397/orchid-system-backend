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
var PrescriptionsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let PrescriptionsGateway = PrescriptionsGateway_1 = class PrescriptionsGateway {
    constructor() {
        this.logger = new common_1.Logger(PrescriptionsGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    emitPrescriptionCreated(prescription) {
        this.server.emit('prescriptionCreated', {
            prescription,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Prescription created event emitted: ${prescription._id}`);
    }
    emitPrescriptionUpdated(prescription) {
        this.server.emit('prescriptionUpdated', {
            prescription,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Prescription updated event emitted: ${prescription._id}`);
    }
    emitPrescriptionDeleted(prescriptionId) {
        this.server.emit('prescriptionDeleted', {
            prescriptionId,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Prescription deleted event emitted: ${prescriptionId}`);
    }
    emitPrescriptionsListUpdated() {
        this.server.emit('prescriptionsListUpdated', {
            timestamp: new Date().toISOString(),
        });
        this.logger.log('Prescriptions list updated event emitted');
    }
};
exports.PrescriptionsGateway = PrescriptionsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PrescriptionsGateway.prototype, "server", void 0);
exports.PrescriptionsGateway = PrescriptionsGateway = PrescriptionsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true,
        },
        namespace: '/prescriptions',
    })
], PrescriptionsGateway);
//# sourceMappingURL=prescriptions.gateway.js.map