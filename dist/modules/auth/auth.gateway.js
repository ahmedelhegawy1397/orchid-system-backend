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
var AuthGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let AuthGateway = AuthGateway_1 = class AuthGateway {
    constructor() {
        this.logger = new common_1.Logger(AuthGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected to /auth: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected from /auth: ${client.id}`);
    }
    emitUserCreated(user) {
        this.server.emit('userCreated', {
            user,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`User created event emitted: ${user.email}`);
    }
    emitUserUpdated(user) {
        this.server.emit('userUpdated', {
            user,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`User updated event emitted: ${user.email}`);
    }
    emitUserDeleted(userId) {
        this.server.emit('userDeleted', {
            userId,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`User deleted event emitted: ${userId}`);
    }
    emitUsersListUpdated() {
        this.server.emit('usersListUpdated', {
            timestamp: new Date().toISOString(),
        });
        this.logger.log('Users list updated event emitted');
    }
};
exports.AuthGateway = AuthGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AuthGateway.prototype, "server", void 0);
exports.AuthGateway = AuthGateway = AuthGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true,
        },
        namespace: '/auth',
    })
], AuthGateway);
//# sourceMappingURL=auth.gateway.js.map