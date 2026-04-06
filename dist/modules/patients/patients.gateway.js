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
var PatientsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let PatientsGateway = PatientsGateway_1 = class PatientsGateway {
    constructor() {
        this.logger = new common_1.Logger(PatientsGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    emitProcedureAdded(patientId, procedure) {
        this.server.emit('procedureAdded', {
            patientId,
            procedure,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Procedure added event emitted for patient: ${patientId}`);
    }
    emitProcedureUpdated(patientId, procedure) {
        this.server.emit('procedureUpdated', {
            patientId,
            procedure,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Procedure updated event emitted for patient: ${patientId}`);
    }
    emitProcedureDeleted(patientId, procedureId) {
        this.server.emit('procedureDeleted', {
            patientId,
            procedureId,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Procedure deleted event emitted for patient: ${patientId}`);
    }
    emitPatientUpdated(patientId, data) {
        this.server.emit('patientUpdated', {
            patientId,
            data,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Patient updated event emitted for patient: ${patientId}`);
    }
    emitPatientCreated(patient) {
        this.server.emit('patientCreated', {
            patient,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Patient created event emitted: ${patient._id}`);
    }
    emitPatientDeleted(patientId) {
        this.server.emit('patientDeleted', {
            patientId,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Patient deleted event emitted: ${patientId}`);
    }
    emitPatientsListUpdated() {
        this.server.emit('patientsListUpdated', {
            timestamp: new Date().toISOString(),
        });
        this.logger.log('Patients list updated event emitted');
    }
};
exports.PatientsGateway = PatientsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PatientsGateway.prototype, "server", void 0);
exports.PatientsGateway = PatientsGateway = PatientsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true,
        },
        namespace: '/patients',
    })
], PatientsGateway);
//# sourceMappingURL=patients.gateway.js.map