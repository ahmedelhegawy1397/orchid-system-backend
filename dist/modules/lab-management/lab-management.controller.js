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
exports.LabManagementController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lab_management_service_1 = require("./lab-management.service");
const create_lab_record_dto_1 = require("./dto/create-lab-record.dto");
const update_lab_record_dto_1 = require("./dto/update-lab-record.dto");
const query_lab_records_dto_1 = require("./dto/query-lab-records.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const enums_1 = require("../../enums");
let LabManagementController = class LabManagementController {
    constructor(labManagementService) {
        this.labManagementService = labManagementService;
    }
    create(createLabRecordDto) {
        return this.labManagementService.create(createLabRecordDto);
    }
    findAll(query) {
        return this.labManagementService.findAll(query);
    }
    findOne(id) {
        return this.labManagementService.findOne(id);
    }
    update(id, updateLabRecordDto) {
        return this.labManagementService.update(id, updateLabRecordDto);
    }
    remove(id) {
        return this.labManagementService.remove(id);
    }
};
exports.LabManagementController = LabManagementController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new lab record' }),
    (0, swagger_1.ApiBody)({ type: create_lab_record_dto_1.CreateLabRecordDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lab_record_dto_1.CreateLabRecordDto]),
    __metadata("design:returntype", void 0)
], LabManagementController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lab records with optional filters' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: 'Start date (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: 'End date (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'patientId', required: false, description: 'Filter by patient ID' }),
    (0, swagger_1.ApiQuery)({ name: 'doctorId', required: false, description: 'Filter by doctor ID' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_lab_records_dto_1.QueryLabRecordsDto]),
    __metadata("design:returntype", void 0)
], LabManagementController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lab record by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LabManagementController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update lab record' }),
    (0, swagger_1.ApiBody)({ type: update_lab_record_dto_1.UpdateLabRecordDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lab_record_dto_1.UpdateLabRecordDto]),
    __metadata("design:returntype", void 0)
], LabManagementController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete lab record' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LabManagementController.prototype, "remove", null);
exports.LabManagementController = LabManagementController = __decorate([
    (0, swagger_1.ApiTags)('Lab Management'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/lab-management'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Doctor, enums_1.UserRole.Assistant, enums_1.UserRole.Admin),
    __metadata("design:paramtypes", [lab_management_service_1.LabManagementService])
], LabManagementController);
//# sourceMappingURL=lab-management.controller.js.map