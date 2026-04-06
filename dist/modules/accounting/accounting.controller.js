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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const accounting_service_1 = require("./accounting.service");
const accounting_filter_query_dto_1 = require("./dto/accounting-filter-query.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const enums_1 = require("../../enums");
let AccountingController = class AccountingController {
    constructor(accountingService) {
        this.accountingService = accountingService;
    }
    getAccountingSummary(query, user) {
        return this.accountingService.getAccountingSummary(query);
    }
};
exports.AccountingController = AccountingController;
__decorate([
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get accounting summary with optional filters',
        description: 'Returns collected amounts, revenue, expenses, pending balance, and invoice counts. All filters are optional.'
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accounting_filter_query_dto_1.AccountingFilterQueryDto, Object]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "getAccountingSummary", null);
exports.AccountingController = AccountingController = __decorate([
    (0, swagger_1.ApiTags)('Accounting'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/accounting'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Admin),
    __metadata("design:paramtypes", [accounting_service_1.AccountingService])
], AccountingController);
//# sourceMappingURL=accounting.controller.js.map