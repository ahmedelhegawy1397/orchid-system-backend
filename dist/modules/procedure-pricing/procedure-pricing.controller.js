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
exports.ProcedurePricingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const procedure_pricing_service_1 = require("./procedure-pricing.service");
const bulk_update_procedure_pricing_dto_1 = require("./dto/bulk-update-procedure-pricing.dto");
const create_procedure_pricing_dto_1 = require("./dto/create-procedure-pricing.dto");
const update_procedure_pricing_dto_1 = require("./dto/update-procedure-pricing.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const enums_1 = require("../../enums");
let ProcedurePricingController = class ProcedurePricingController {
    constructor(procedurePricingService) {
        this.procedurePricingService = procedurePricingService;
    }
    findAll() {
        return this.procedurePricingService.findAll();
    }
    getProcedureTypes() {
        return { procedureTypes: Object.values(enums_1.ProcedureCategory) };
    }
    findOne(id) {
        return this.procedurePricingService.findOne(id);
    }
    create(dto) {
        return this.procedurePricingService.create(dto);
    }
    update(id, dto) {
        return this.procedurePricingService.update(id, dto);
    }
    async remove(id) {
        await this.procedurePricingService.remove(id);
    }
    bulkUpdate(dto) {
        return this.procedurePricingService.bulkUpdate(dto.items);
    }
};
exports.ProcedurePricingController = ProcedurePricingController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all procedure prices' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProcedurePricingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('types'),
    (0, swagger_1.ApiOperation)({ summary: 'Get static procedure types (categories)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProcedurePricingController.prototype, "getProcedureTypes", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get one procedure price by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProcedurePricingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Create a procedure price (Owner/Admin only)' }),
    (0, swagger_1.ApiBody)({ type: create_procedure_pricing_dto_1.CreateProcedurePricingDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_procedure_pricing_dto_1.CreateProcedurePricingDto]),
    __metadata("design:returntype", void 0)
], ProcedurePricingController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Update a procedure price by ID (Owner/Admin only)' }),
    (0, swagger_1.ApiBody)({ type: update_procedure_pricing_dto_1.UpdateProcedurePricingDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_procedure_pricing_dto_1.UpdateProcedurePricingDto]),
    __metadata("design:returntype", void 0)
], ProcedurePricingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a procedure price by ID (Owner/Admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcedurePricingController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk update procedure prices (Owner/Admin only)' }),
    (0, swagger_1.ApiBody)({ type: bulk_update_procedure_pricing_dto_1.BulkUpdateProcedurePricingDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_update_procedure_pricing_dto_1.BulkUpdateProcedurePricingDto]),
    __metadata("design:returntype", void 0)
], ProcedurePricingController.prototype, "bulkUpdate", null);
exports.ProcedurePricingController = ProcedurePricingController = __decorate([
    (0, swagger_1.ApiTags)('Procedure Pricing'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/procedure-pricing'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [procedure_pricing_service_1.ProcedurePricingService])
], ProcedurePricingController);
//# sourceMappingURL=procedure-pricing.controller.js.map