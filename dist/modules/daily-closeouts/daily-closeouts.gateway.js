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
var DailyCloseoutsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyCloseoutsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let DailyCloseoutsGateway = DailyCloseoutsGateway_1 = class DailyCloseoutsGateway {
    constructor() {
        this.logger = new common_1.Logger(DailyCloseoutsGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    emitCloseoutCreated(closeout) {
        this.server.emit('closeoutCreated', {
            closeout,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Closeout created event emitted: ${closeout.date}`);
    }
    emitCloseoutUpdated(closeout) {
        this.server.emit('closeoutUpdated', {
            closeout,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Closeout updated event emitted: ${closeout.date}`);
    }
    emitCloseoutDeleted(date) {
        this.server.emit('closeoutDeleted', {
            date,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Closeout deleted event emitted: ${date}`);
    }
    emitCloseoutsListUpdated() {
        this.server.emit('closeoutsListUpdated', {
            timestamp: new Date().toISOString(),
        });
        this.logger.log('Closeouts list updated event emitted');
    }
};
exports.DailyCloseoutsGateway = DailyCloseoutsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DailyCloseoutsGateway.prototype, "server", void 0);
exports.DailyCloseoutsGateway = DailyCloseoutsGateway = DailyCloseoutsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true,
        },
        namespace: '/daily-closeouts',
    })
], DailyCloseoutsGateway);
//# sourceMappingURL=daily-closeouts.gateway.js.map