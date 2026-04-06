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
exports.PatientTransfersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const patient_transfers_service_1 = require("./patient-transfers.service");
const transfer_patient_dto_1 = require("./dto/transfer-patient.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const enums_1 = require("../../enums");
let PatientTransfersController = class PatientTransfersController {
    constructor(patientTransfersService) {
        this.patientTransfersService = patientTransfersService;
    }
    transfer(id, dto, user) {
        return this.patientTransfersService.transfer(id, dto.toDoctorId, dto.reason, dto.notes, user.id);
    }
    findByPatient(id) {
        return this.patientTransfersService.findByPatient(id);
    }
};
exports.PatientTransfersController = PatientTransfersController;
__decorate([
    (0, common_1.Post)(':id/transfer'),
    (0, swagger_1.ApiOperation)({ summary: 'Transfer patient to another doctor' }),
    (0, swagger_1.ApiBody)({ type: transfer_patient_dto_1.TransferPatientDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, transfer_patient_dto_1.TransferPatientDto, Object]),
    __metadata("design:returntype", void 0)
], PatientTransfersController.prototype, "transfer", null);
__decorate([
    (0, common_1.Get)(':id/transfers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get transfer history for patient' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientTransfersController.prototype, "findByPatient", null);
exports.PatientTransfersController = PatientTransfersController = __decorate([
    (0, swagger_1.ApiTags)('Patient Transfers'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/patients'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Doctor, enums_1.UserRole.Assistant, enums_1.UserRole.Admin),
    __metadata("design:paramtypes", [patient_transfers_service_1.PatientTransfersService])
], PatientTransfersController);
//# sourceMappingURL=patient-transfers.controller.js.map