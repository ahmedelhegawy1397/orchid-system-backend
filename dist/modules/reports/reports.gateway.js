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
var ReportsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let ReportsGateway = ReportsGateway_1 = class ReportsGateway {
    constructor() {
        this.logger = new common_1.Logger(ReportsGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    emitReportsDataUpdated(source) {
        this.server.emit('reportsDataUpdated', {
            source,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Reports data updated event emitted from: ${source}`);
    }
    emitReportGenerated(reportType, params) {
        this.server.emit('reportGenerated', {
            reportType,
            params,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Report generated event emitted: ${reportType}`);
    }
};
exports.ReportsGateway = ReportsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ReportsGateway.prototype, "server", void 0);
exports.ReportsGateway = ReportsGateway = ReportsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true,
        },
        namespace: '/reports',
    })
], ReportsGateway);
//# sourceMappingURL=reports.gateway.js.map