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
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const appointments_service_1 = require("./appointments.service");
const create_appointment_dto_1 = require("./dto/create-appointment.dto");
const update_appointment_dto_1 = require("./dto/update-appointment.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const enums_1 = require("../../enums");
let AppointmentsController = class AppointmentsController {
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    findAll(date, doctorId, patientId, status, user) {
        const doctorIdFilter = user?.role === enums_1.UserRole.Doctor ? user?.doctorId : undefined;
        return this.appointmentsService.findAll({ date, doctorId, patientId, status }, doctorIdFilter);
    }
    create(dto, user) {
        if (user?.role === enums_1.UserRole.Doctor && user?.doctorId) {
            if (dto.doctorId && dto.doctorId !== user.doctorId) {
                throw new common_1.ForbiddenException('Doctors can only create appointments for themselves');
            }
            dto = { ...dto, doctorId: user.doctorId };
        }
        return this.appointmentsService.create(dto);
    }
    update(id, dto, user) {
        const doctorIdFilter = user?.role === enums_1.UserRole.Doctor ? user?.doctorId : undefined;
        return this.appointmentsService.update(id, dto, doctorIdFilter);
    }
    cancel(id, user) {
        const doctorIdFilter = user?.role === enums_1.UserRole.Doctor ? user?.doctorId : undefined;
        return this.appointmentsService.cancel(id, doctorIdFilter);
    }
    remove(id, user) {
        const doctorIdFilter = user?.role === enums_1.UserRole.Doctor ? user?.doctorId : undefined;
        return this.appointmentsService.remove(id, doctorIdFilter);
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List appointments with optional filters' }),
    (0, swagger_1.ApiQuery)({ name: 'date', required: false, example: '2025-03-15' }),
    (0, swagger_1.ApiQuery)({ name: 'doctorId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'patientId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['scheduled', 'completed', 'cancelled', 'no_show', 'in_progress'] }),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Query)('doctorId')),
    __param(2, (0, common_1.Query)('patientId')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create an appointment' }),
    (0, swagger_1.ApiBody)({ type: create_appointment_dto_1.CreateAppointmentDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_dto_1.CreateAppointmentDto, Object]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update appointment by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Appointment MongoDB ObjectId' }),
    (0, swagger_1.ApiBody)({ type: update_appointment_dto_1.UpdateAppointmentDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appointment_dto_1.UpdateAppointmentDto, Object]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel appointment by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Appointment MongoDB ObjectId' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "cancel", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete appointment by ID (remove from calendar)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Appointment MongoDB ObjectId' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "remove", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, swagger_1.ApiTags)('Appointments'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/appointments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Doctor, enums_1.UserRole.Assistant, enums_1.UserRole.Admin),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map