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
exports.ToothProceduresController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tooth_procedures_service_1 = require("./tooth-procedures.service");
const update_tooth_procedure_dto_1 = require("./dto/update-tooth-procedure.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const enums_1 = require("../../enums");
let ToothProceduresController = class ToothProceduresController {
    constructor(toothProceduresService) {
        this.toothProceduresService = toothProceduresService;
    }
    update(id, dto) {
        return this.toothProceduresService.update(id, dto);
    }
    async remove(id) {
        await this.toothProceduresService.remove(id);
    }
};
exports.ToothProceduresController = ToothProceduresController;
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update tooth procedure (e.g. add or edit note)' }),
    (0, swagger_1.ApiBody)({ type: update_tooth_procedure_dto_1.UpdateToothProcedureDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tooth_procedure_dto_1.UpdateToothProcedureDto]),
    __metadata("design:returntype", void 0)
], ToothProceduresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete tooth procedure by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ToothProceduresController.prototype, "remove", null);
exports.ToothProceduresController = ToothProceduresController = __decorate([
    (0, swagger_1.ApiTags)('Tooth Procedures'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/tooth-procedures'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Doctor, enums_1.UserRole.Assistant, enums_1.UserRole.Admin),
    __metadata("design:paramtypes", [tooth_procedures_service_1.ToothProceduresService])
], ToothProceduresController);
//# sourceMappingURL=tooth-procedures.controller.js.map