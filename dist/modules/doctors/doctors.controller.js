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
exports.DoctorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const doctors_service_1 = require("./doctors.service");
const create_doctor_dto_1 = require("./dto/create-doctor.dto");
const update_doctor_dto_1 = require("./dto/update-doctor.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const decorators_1 = require("../../common/decorators");
const enums_1 = require("../../enums");
let DoctorsController = class DoctorsController {
    constructor(doctorsService) {
        this.doctorsService = doctorsService;
    }
    findAll() {
        return this.doctorsService.findAll();
    }
    findOne(id) {
        return this.doctorsService.findOne(id);
    }
    create(dto) {
        return this.doctorsService.create(dto);
    }
    update(id, dto) {
        return this.doctorsService.update(id, dto);
    }
    async remove(id) {
        await this.doctorsService.remove(id);
    }
};
exports.DoctorsController = DoctorsController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all doctors (public, for registration form)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get one doctor by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Create a doctor (Owner/Admin only)' }),
    (0, swagger_1.ApiBody)({ type: create_doctor_dto_1.CreateDoctorDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_doctor_dto_1.CreateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Update a doctor by ID (Owner/Admin only)' }),
    (0, swagger_1.ApiBody)({ type: update_doctor_dto_1.UpdateDoctorDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_doctor_dto_1.UpdateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a doctor (Owner/Admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorsController.prototype, "remove", null);
exports.DoctorsController = DoctorsController = __decorate([
    (0, swagger_1.ApiTags)('Doctors'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/doctors'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [doctors_service_1.DoctorsService])
], DoctorsController);
//# sourceMappingURL=doctors.controller.js.map