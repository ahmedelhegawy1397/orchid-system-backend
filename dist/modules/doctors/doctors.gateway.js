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
var DoctorsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let DoctorsGateway = DoctorsGateway_1 = class DoctorsGateway {
    constructor() {
        this.logger = new common_1.Logger(DoctorsGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    emitDoctorCreated(doctor) {
        this.server.emit('doctorCreated', {
            doctor,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Doctor created event emitted: ${doctor._id}`);
    }
    emitDoctorUpdated(doctor) {
        this.server.emit('doctorUpdated', {
            doctor,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Doctor updated event emitted: ${doctor._id}`);
    }
    emitDoctorDeleted(doctorId) {
        this.server.emit('doctorDeleted', {
            doctorId,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Doctor deleted event emitted: ${doctorId}`);
    }
    emitDoctorsListUpdated() {
        this.server.emit('doctorsListUpdated', {
            timestamp: new Date().toISOString(),
        });
        this.logger.log('Doctors list updated event emitted');
    }
};
exports.DoctorsGateway = DoctorsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DoctorsGateway.prototype, "server", void 0);
exports.DoctorsGateway = DoctorsGateway = DoctorsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true,
        },
        namespace: '/doctors',
    })
], DoctorsGateway);
//# sourceMappingURL=doctors.gateway.js.map