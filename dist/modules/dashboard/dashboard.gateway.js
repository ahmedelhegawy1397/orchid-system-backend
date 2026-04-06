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
var DashboardGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let DashboardGateway = DashboardGateway_1 = class DashboardGateway {
    constructor() {
        this.logger = new common_1.Logger(DashboardGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    emitDashboardUpdated(data) {
        this.server.emit('dashboardUpdated', {
            data,
            timestamp: new Date().toISOString(),
        });
        this.logger.log('Dashboard updated event emitted');
    }
    emitAppointmentChanged(appointment) {
        this.server.emit('appointmentChanged', {
            appointment,
            timestamp: new Date().toISOString(),
        });
        this.logger.log('Appointment changed event emitted');
    }
    emitRevenueChanged(payment) {
        this.server.emit('revenueChanged', {
            payment,
            timestamp: new Date().toISOString(),
        });
        this.logger.log('Revenue changed event emitted');
    }
    emitExpenseChanged(expense) {
        this.server.emit('expenseChanged', {
            expense,
            timestamp: new Date().toISOString(),
        });
        this.logger.log('Expense changed event emitted');
    }
};
exports.DashboardGateway = DashboardGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DashboardGateway.prototype, "server", void 0);
exports.DashboardGateway = DashboardGateway = DashboardGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true,
        },
        namespace: '/dashboard',
    })
], DashboardGateway);
//# sourceMappingURL=dashboard.gateway.js.map