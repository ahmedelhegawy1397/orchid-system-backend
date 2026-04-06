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
exports.DailyCloseoutsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const daily_closeouts_service_1 = require("./daily-closeouts.service");
const create_daily_closeout_dto_1 = require("./dto/create-daily-closeout.dto");
const update_daily_closeout_dto_1 = require("./dto/update-daily-closeout.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const enums_1 = require("../../enums");
let DailyCloseoutsController = class DailyCloseoutsController {
    constructor(dailyCloseoutsService) {
        this.dailyCloseoutsService = dailyCloseoutsService;
    }
    findAll(date) {
        return this.dailyCloseoutsService.findAll(date);
    }
    getPreview(date, user) {
        const roleFilter = user
            ? { role: user.role, userId: user.id, doctorId: user.doctorId }
            : undefined;
        return this.dailyCloseoutsService.getPreview(date, roleFilter);
    }
    getByDate(date, user) {
        const roleFilter = user
            ? { role: user.role, userId: user.id, doctorId: user.doctorId }
            : undefined;
        return this.dailyCloseoutsService.getByDate(date, roleFilter);
    }
    async removeByDate(date) {
        await this.dailyCloseoutsService.removeByDate(date);
    }
    updateByDate(date, dto, user) {
        const roleFilter = { role: user.role, userId: user.id, doctorId: user.doctorId };
        return this.dailyCloseoutsService.updateByDate(date, dto, roleFilter);
    }
    create(dto, user) {
        const roleFilter = { role: user.role, userId: user.id, doctorId: user.doctorId };
        return this.dailyCloseoutsService.create(dto.date, user.id, roleFilter);
    }
};
exports.DailyCloseoutsController = DailyCloseoutsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List daily closeouts with optional date filter' }),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DailyCloseoutsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('preview/:date'),
    (0, swagger_1.ApiOperation)({ summary: 'Preview payments and expenses for a date (includes unpaid invoices)' }),
    __param(0, (0, common_1.Param)('date')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DailyCloseoutsController.prototype, "getPreview", null);
__decorate([
    (0, common_1.Get)(':date'),
    (0, swagger_1.ApiOperation)({ summary: 'Get daily closeout by date (returns payment and expense snapshots)' }),
    __param(0, (0, common_1.Param)('date')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DailyCloseoutsController.prototype, "getByDate", null);
__decorate([
    (0, common_1.Delete)(':date'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete daily closeout by date' }),
    __param(0, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DailyCloseoutsController.prototype, "removeByDate", null);
__decorate([
    (0, common_1.Patch)(':date'),
    (0, swagger_1.ApiOperation)({ summary: 'Update daily closeout (amounts and/or refresh expense snapshot)' }),
    (0, swagger_1.ApiBody)({ type: update_daily_closeout_dto_1.UpdateDailyCloseoutDto }),
    __param(0, (0, common_1.Param)('date')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_daily_closeout_dto_1.UpdateDailyCloseoutDto, Object]),
    __metadata("design:returntype", void 0)
], DailyCloseoutsController.prototype, "updateByDate", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create daily closeout' }),
    (0, swagger_1.ApiBody)({ type: create_daily_closeout_dto_1.CreateDailyCloseoutDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_daily_closeout_dto_1.CreateDailyCloseoutDto, Object]),
    __metadata("design:returntype", void 0)
], DailyCloseoutsController.prototype, "create", null);
exports.DailyCloseoutsController = DailyCloseoutsController = __decorate([
    (0, swagger_1.ApiTags)('Daily Closeouts'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/daily-closeouts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Assistant, enums_1.UserRole.Admin),
    __metadata("design:paramtypes", [daily_closeouts_service_1.DailyCloseoutsService])
], DailyCloseoutsController);
//# sourceMappingURL=daily-closeouts.controller.js.map