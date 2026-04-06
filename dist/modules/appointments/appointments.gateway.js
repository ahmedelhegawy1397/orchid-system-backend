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
var AppointmentsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let AppointmentsGateway = AppointmentsGateway_1 = class AppointmentsGateway {
    constructor() {
        this.logger = new common_1.Logger(AppointmentsGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    emitAppointmentCreated(appointment) {
        this.server.emit('appointmentCreated', {
            appointment,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Appointment created event emitted: ${appointment._id}`);
    }
    emitAppointmentUpdated(appointment) {
        this.server.emit('appointmentUpdated', {
            appointment,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Appointment updated event emitted: ${appointment._id}`);
    }
    emitAppointmentCancelled(appointment) {
        this.server.emit('appointmentCancelled', {
            appointment,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Appointment cancelled event emitted: ${appointment._id}`);
    }
    emitAppointmentDeleted(appointmentId) {
        this.server.emit('appointmentDeleted', {
            appointmentId,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Appointment deleted event emitted: ${appointmentId}`);
    }
};
exports.AppointmentsGateway = AppointmentsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppointmentsGateway.prototype, "server", void 0);
exports.AppointmentsGateway = AppointmentsGateway = AppointmentsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true,
        },
        namespace: '/appointments',
    })
], AppointmentsGateway);
//# sourceMappingURL=appointments.gateway.js.map