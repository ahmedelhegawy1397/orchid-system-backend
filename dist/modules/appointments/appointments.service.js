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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const appointment_schema_1 = require("./schemas/appointment.schema");
const patient_schema_1 = require("../patients/schemas/patient.schema");
const enums_1 = require("../../enums");
const fdi_validator_1 = require("../../common/utils/fdi.validator");
const objectid_1 = require("../../common/utils/objectid");
const appointments_gateway_1 = require("./appointments.gateway");
const dashboard_gateway_1 = require("../dashboard/dashboard.gateway");
const patients_gateway_1 = require("../patients/patients.gateway");
let AppointmentsService = class AppointmentsService {
    constructor(appointmentModel, patientModel, appointmentsGateway, dashboardGateway, patientsGateway) {
        this.appointmentModel = appointmentModel;
        this.patientModel = patientModel;
        this.appointmentsGateway = appointmentsGateway;
        this.dashboardGateway = dashboardGateway;
        this.patientsGateway = patientsGateway;
    }
    async findAll(query, doctorIdFilter) {
        const filter = {};
        if (query.date)
            filter.date = query.date;
        const doctorId = (0, objectid_1.toObjectIdOrUndefined)(query.doctorId);
        if (doctorId)
            filter.doctorId = doctorId;
        const patientId = (0, objectid_1.toObjectIdOrUndefined)(query.patientId);
        if (patientId)
            filter.patientId = patientId;
        if (query.status)
            filter.status = query.status;
        if (doctorIdFilter)
            filter.doctorId = (0, objectid_1.toObjectIdOrThrow)(doctorIdFilter, 'doctorId');
        return this.appointmentModel
            .find(filter)
            .populate('patientId', 'name nameAr phone')
            .populate('doctorId', 'name nameAr color')
            .sort({ date: 1, startTime: 1 })
            .lean();
    }
    async create(dto) {
        const patientId = (0, objectid_1.toObjectIdOrThrow)(dto.patientId, 'patientId');
        const doctorId = (0, objectid_1.toObjectIdOrThrow)(dto.doctorId, 'doctorId');
        const endTime = (0, fdi_validator_1.addMinutesToTime)(dto.startTime, dto.duration || 30);
        const conflicting = await this.appointmentModel.findOne({
            doctorId,
            date: dto.date,
            status: { $ne: enums_1.AppointmentStatus.Cancelled },
            startTime: { $lt: endTime },
            endTime: { $gt: dto.startTime },
        });
        if (conflicting) {
            throw new common_1.ConflictException('Another appointment exists at this time for this doctor.');
        }
        const appointment = await this.appointmentModel.create({
            ...dto,
            patientId,
            doctorId,
            endTime,
            status: enums_1.AppointmentStatus.Scheduled,
        });
        const populatedAppointment = await this.appointmentModel.findById(appointment._id).populate('patientId', 'name nameAr phone').populate('doctorId', 'name nameAr color').lean();
        this.appointmentsGateway.emitAppointmentCreated(populatedAppointment);
        this.dashboardGateway.emitAppointmentChanged(populatedAppointment);
        this.dashboardGateway.emitDashboardUpdated();
        return populatedAppointment;
    }
    async update(id, dto, doctorIdFilter) {
        const appointmentId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const appointment = await this.appointmentModel.findById(appointmentId);
        if (!appointment)
            throw new common_1.NotFoundException('Appointment not found');
        if (doctorIdFilter && !appointment.doctorId.equals((0, objectid_1.toObjectIdOrThrow)(doctorIdFilter, 'doctorId'))) {
            throw new common_1.ForbiddenException('Not your appointment');
        }
        const oldStatus = appointment.status;
        const date = dto.date ?? appointment.date;
        const startTime = dto.startTime ?? appointment.startTime;
        const duration = dto.duration ?? appointment.duration;
        const endTime = (0, fdi_validator_1.addMinutesToTime)(startTime, duration);
        const doctorId = dto.doctorId != null
            ? (0, objectid_1.toObjectIdOrThrow)(dto.doctorId, 'doctorId')
            : appointment.doctorId;
        const conflicting = await this.appointmentModel.findOne({
            _id: { $ne: appointmentId },
            doctorId,
            date,
            status: { $ne: enums_1.AppointmentStatus.Cancelled },
            startTime: { $lt: endTime },
            endTime: { $gt: startTime },
        });
        if (conflicting) {
            throw new common_1.ConflictException('Another appointment exists at this time for this doctor.');
        }
        appointment.date = date;
        appointment.startTime = startTime;
        appointment.duration = duration;
        appointment.endTime = endTime;
        if (dto.patientId != null)
            appointment.patientId = (0, objectid_1.toObjectIdOrThrow)(dto.patientId, 'patientId');
        if (dto.doctorId != null)
            appointment.doctorId = (0, objectid_1.toObjectIdOrThrow)(dto.doctorId, 'doctorId');
        if (dto.billingMode != null)
            appointment.billingMode = dto.billingMode;
        if (dto.procedure != null)
            appointment.procedure = dto.procedure;
        if (dto.procedureAr != null)
            appointment.procedureAr = dto.procedureAr;
        if (dto.notes != null)
            appointment.notes = dto.notes;
        if (dto.sterilizationBuffer != null)
            appointment.sterilizationBuffer = dto.sterilizationBuffer;
        if (dto.toothNumber != null)
            appointment.toothNumber = dto.toothNumber;
        if (dto.status != null)
            appointment.status = dto.status;
        await appointment.save();
        const updatedAppointment = await this.appointmentModel.findById(appointmentId).populate('patientId', 'name nameAr phone').populate('doctorId', 'name nameAr color').lean();
        this.appointmentsGateway.emitAppointmentUpdated(updatedAppointment);
        this.dashboardGateway.emitAppointmentChanged(updatedAppointment);
        this.dashboardGateway.emitDashboardUpdated();
        if (dto.status === enums_1.AppointmentStatus.Completed && oldStatus !== enums_1.AppointmentStatus.Completed) {
            const patientId = appointment.patientId.toString();
            this.patientsGateway.emitPatientUpdated(patientId, { lastVisitUpdated: true });
        }
        return updatedAppointment;
    }
    async cancel(id, doctorIdFilter) {
        const appointmentId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const appointment = await this.appointmentModel.findById(appointmentId);
        if (!appointment)
            throw new common_1.NotFoundException('Appointment not found');
        if (doctorIdFilter && !appointment.doctorId.equals((0, objectid_1.toObjectIdOrThrow)(doctorIdFilter, 'doctorId'))) {
            throw new common_1.ForbiddenException('Not your appointment');
        }
        appointment.status = enums_1.AppointmentStatus.Cancelled;
        await appointment.save();
        const cancelledAppointment = appointment.toObject();
        this.appointmentsGateway.emitAppointmentCancelled(cancelledAppointment);
        this.dashboardGateway.emitAppointmentChanged(cancelledAppointment);
        this.dashboardGateway.emitDashboardUpdated();
        return cancelledAppointment;
    }
    async remove(id, doctorIdFilter) {
        const appointmentId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const appointment = await this.appointmentModel.findById(appointmentId);
        if (!appointment)
            throw new common_1.NotFoundException('Appointment not found');
        if (doctorIdFilter && !appointment.doctorId.equals((0, objectid_1.toObjectIdOrThrow)(doctorIdFilter, 'doctorId'))) {
            throw new common_1.ForbiddenException('Not your appointment');
        }
        await this.appointmentModel.findByIdAndDelete(appointmentId);
        this.appointmentsGateway.emitAppointmentDeleted(id);
        this.dashboardGateway.emitDashboardUpdated();
        return { deleted: true, id };
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(appointment_schema_1.Appointment.name)),
    __param(1, (0, mongoose_1.InjectModel)(patient_schema_1.Patient.name)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => dashboard_gateway_1.DashboardGateway))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => patients_gateway_1.PatientsGateway))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        appointments_gateway_1.AppointmentsGateway,
        dashboard_gateway_1.DashboardGateway,
        patients_gateway_1.PatientsGateway])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map