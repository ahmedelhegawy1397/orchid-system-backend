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
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objectid_1 = require("../../common/utils/objectid");
const patient_schema_1 = require("./schemas/patient.schema");
const appointment_schema_1 = require("../appointments/schemas/appointment.schema");
const invoice_schema_1 = require("../invoices/schemas/invoice.schema");
const invoice_payment_schema_1 = require("../invoices/schemas/invoice-payment.schema");
const tooth_procedure_schema_1 = require("../tooth-procedures/schemas/tooth-procedure.schema");
const medical_alert_schema_1 = require("../medical-alerts/schemas/medical-alert.schema");
const waiting_list_item_schema_1 = require("../waiting-list/schemas/waiting-list-item.schema");
const patient_notes_service_1 = require("../patient-notes/patient-notes.service");
const patient_prescriptions_service_1 = require("../patient-prescriptions/patient-prescriptions.service");
const patients_gateway_1 = require("./patients.gateway");
const enums_1 = require("../../enums");
let PatientsService = class PatientsService {
    constructor(patientModel, appointmentModel, invoiceModel, invoicePaymentModel, toothProcedureModel, medicalAlertModel, waitingListModel, patientNotesService, patientPrescriptionsService, patientsGateway) {
        this.patientModel = patientModel;
        this.appointmentModel = appointmentModel;
        this.invoiceModel = invoiceModel;
        this.invoicePaymentModel = invoicePaymentModel;
        this.toothProcedureModel = toothProcedureModel;
        this.medicalAlertModel = medicalAlertModel;
        this.waitingListModel = waitingListModel;
        this.patientNotesService = patientNotesService;
        this.patientPrescriptionsService = patientPrescriptionsService;
        this.patientsGateway = patientsGateway;
    }
    async findBirthdays(date) {
        const filter = { dateOfBirth: { $exists: true, $ne: '' } };
        if (date?.trim()) {
            const monthDay = date.length >= 10 ? date.slice(5, 10) : date;
            filter.dateOfBirth = { $regex: new RegExp(`^\\d{4}-${monthDay}$`) };
        }
        const patients = await this.patientModel
            .find(filter)
            .select('_id name nameAr dateOfBirth phone assignedDoctorId')
            .populate('assignedDoctorId', 'name nameAr')
            .sort({ dateOfBirth: 1 })
            .lean();
        return patients.map((p) => ({
            id: p._id != null ? String(p._id) : undefined,
            name: p.name,
            nameAr: p.nameAr,
            dateOfBirth: p.dateOfBirth,
            phone: p.phone,
            assignedDoctorId: p.assignedDoctorId,
        }));
    }
    async findAll(query) {
        const filter = {};
        const doctorId = (0, objectid_1.toObjectIdOrUndefined)(query.assignedDoctorId);
        if (doctorId)
            filter.assignedDoctorId = doctorId;
        const searchTrimmed = query.search?.trim();
        const SINGLE_LETTER_LIMIT = 20;
        if (searchTrimmed) {
            const escaped = searchTrimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const re = new RegExp(escaped, 'i');
            filter.$or = [
                { name: re },
                { nameAr: re },
                { phone: { $regex: escaped } },
            ];
        }
        const page = Math.max(1, query.page || 1);
        const effectiveLimit = searchTrimmed?.length === 1 ? Math.min(SINGLE_LETTER_LIMIT, Math.max(1, query.limit || 20)) : Math.min(100, Math.max(1, query.limit || 20));
        const skip = (page - 1) * effectiveLimit;
        const [items, total] = await Promise.all([
            this.patientModel.find(filter).skip(skip).limit(effectiveLimit).sort({ createdAt: -1 }).populate('assignedDoctorId', 'name nameAr specialty color').lean(),
            this.patientModel.countDocuments(filter),
        ]);
        const patientIds = items.map((p) => p._id);
        const remainingBalances = await this.invoiceModel.aggregate([
            { $match: { patientId: { $in: patientIds } } },
            { $group: { _id: '$patientId', remainingBalance: { $sum: '$remaining' } } },
        ]);
        const balanceMap = new Map();
        remainingBalances.forEach((rb) => {
            balanceMap.set(rb._id.toString(), rb.remainingBalance);
        });
        const itemsWithBalance = items.map((patient) => ({
            ...patient,
            remainingBalance: balanceMap.get((patient._id).toString()) ?? 0,
        }));
        return { items: itemsWithBalance, total, page, limit: effectiveLimit };
    }
    async create(dto) {
        const assignedDoctorId = (0, objectid_1.toObjectIdOrUndefined)(dto.assignedDoctorId);
        if (dto.assignedDoctorId && !assignedDoctorId) {
            throw new common_1.BadRequestException('assignedDoctorId must be a valid MongoDB ObjectId (24 hex characters). Get doctor IDs from GET /api/doctors');
        }
        const patient = await this.patientModel.create({
            ...dto,
            assignedDoctorId,
        });
        const result = patient.toObject();
        this.patientsGateway.emitPatientCreated(result);
        this.patientsGateway.emitPatientsListUpdated();
        return result;
    }
    async findOne(id) {
        const patientId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const patient = await this.patientModel
            .findById(patientId)
            .populate('assignedDoctorId', 'name nameAr specialty color')
            .lean();
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        const today = new Date().toISOString().split('T')[0];
        const [appointments, invoices, toothProcedures, alerts, prescriptions, nextAppointmentFromWaitingList, lastVisitAppointment] = await Promise.all([
            this.appointmentModel.find({ patientId }).populate('doctorId', 'name nameAr color').sort({ date: -1, startTime: -1 }).lean(),
            this.invoiceModel.find({ patientId }).populate('doctorId', 'name nameAr').sort({ createdAt: -1 }).lean(),
            this.toothProcedureModel.find({ patientId }).populate('doctorId', 'name nameAr').sort({ date: -1 }).lean(),
            this.medicalAlertModel.find({ patientId }).lean(),
            this.patientPrescriptionsService.findByPatient(id),
            this.waitingListModel
                .findOne({ patientId, preferredDate: { $gte: today } })
                .sort({ preferredDate: 1, urgency: -1 })
                .lean(),
            this.appointmentModel
                .findOne({
                patientId,
                status: enums_1.AppointmentStatus.Completed,
                date: { $lte: today }
            })
                .sort({ date: -1, startTime: -1 })
                .lean(),
        ]);
        const medicalAlerts = alerts.map((a) => ({
            id: a._id != null ? String(a._id) : undefined,
            type: a.type,
            description: a.description,
            severity: a.severity,
        }));
        const dentalTreatments = {};
        for (const tp of toothProcedures) {
            const nums = tp.toothNumbers ?? [];
            for (const toothNum of nums) {
                if (!dentalTreatments[toothNum])
                    dentalTreatments[toothNum] = [];
                dentalTreatments[toothNum].push({
                    id: tp._id != null ? String(tp._id) : undefined,
                    procedureType: tp.procedureType ?? tp.type,
                    date: tp.date,
                    appointmentId: tp.appointmentId != null ? String(tp.appointmentId) : undefined,
                    notes: tp.notes,
                    cost: tp.price,
                });
            }
        }
        const nextAppointment = nextAppointmentFromWaitingList ? {
            id: nextAppointmentFromWaitingList._id != null ? String(nextAppointmentFromWaitingList._id) : undefined,
            preferredDate: nextAppointmentFromWaitingList.preferredDate,
            preferredTimeRange: nextAppointmentFromWaitingList.preferredTimeRange,
            urgency: nextAppointmentFromWaitingList.urgency,
            notes: nextAppointmentFromWaitingList.notes,
            duration: nextAppointmentFromWaitingList.duration,
        } : null;
        const lastVisit = lastVisitAppointment ? lastVisitAppointment.date : null;
        return {
            ...patient,
            lastVisit,
            nextAppointment,
            appointments,
            invoices,
            toothProcedures,
            medicalAlerts,
            dentalTreatments,
            prescriptions,
        };
    }
    async update(id, dto) {
        const patientId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const update = { ...dto };
        if (dto.assignedDoctorId !== undefined) {
            if (dto.assignedDoctorId) {
                const oid = (0, objectid_1.toObjectIdOrUndefined)(dto.assignedDoctorId);
                if (!oid)
                    throw new common_1.BadRequestException('assignedDoctorId must be a valid MongoDB ObjectId (24 hex characters)');
                update.assignedDoctorId = oid;
            }
            else {
                update.assignedDoctorId = null;
            }
        }
        if (dto.questionnaire) {
            const existingPatient = await this.patientModel.findById(patientId).lean();
            if (existingPatient) {
                update.questionnaire = {
                    ...existingPatient.questionnaire,
                    ...dto.questionnaire,
                };
            }
        }
        const patient = await this.patientModel.findByIdAndUpdate(patientId, { $set: update }, { new: true }).lean();
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        this.patientsGateway.emitPatientUpdated(id, patient);
        this.patientsGateway.emitPatientsListUpdated();
        return patient;
    }
    async setHiddenTeeth(id, teeth) {
        const patientId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const patient = await this.patientModel.findByIdAndUpdate(patientId, { $set: { hiddenTeeth: teeth } }, { new: true }).lean();
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        this.patientsGateway.emitPatientUpdated(id, { hiddenTeeth: teeth });
        return { hiddenTeeth: patient.hiddenTeeth };
    }
    async addHiddenTooth(id, toothNumber) {
        const patientId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const patient = await this.patientModel.findByIdAndUpdate(patientId, { $addToSet: { hiddenTeeth: toothNumber } }, { new: true }).lean();
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        const hiddenTeeth = patient.hiddenTeeth;
        this.patientsGateway.emitPatientUpdated(id, { hiddenTeeth });
        return { hiddenTeeth };
    }
    async removeHiddenTooth(id, toothNumber) {
        const patientId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const patient = await this.patientModel.findByIdAndUpdate(patientId, { $pull: { hiddenTeeth: toothNumber } }, { new: true }).lean();
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        const hiddenTeeth = patient.hiddenTeeth;
        this.patientsGateway.emitPatientUpdated(id, { hiddenTeeth });
        return { hiddenTeeth };
    }
    async remove(id) {
        const patientId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const patient = await this.patientModel.findById(patientId);
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        const [appointmentsCount, invoicesCount] = await Promise.all([
            this.appointmentModel.countDocuments({ patientId }),
            this.invoiceModel.countDocuments({ patientId }),
        ]);
        if (appointmentsCount > 0 || invoicesCount > 0) {
            throw new common_1.ConflictException('Cannot delete patient with existing appointments or invoices. Remove or reassign them first.');
        }
        await Promise.all([
            this.toothProcedureModel.deleteMany({ patientId }),
            this.medicalAlertModel.deleteMany({ patientId }),
            this.patientNotesService.deleteByPatient(id),
            this.patientPrescriptionsService.deleteByPatient(id),
        ]);
        await this.patientModel.findByIdAndDelete(patientId);
        this.patientsGateway.emitPatientDeleted(id);
        this.patientsGateway.emitPatientsListUpdated();
    }
    async forceRemove(id) {
        const patientId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const patient = await this.patientModel.findById(patientId);
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        await Promise.all([
            this.appointmentModel.deleteMany({ patientId }),
            this.invoiceModel.deleteMany({ patientId }),
            this.invoicePaymentModel.deleteMany({ patientId }),
            this.toothProcedureModel.deleteMany({ patientId }),
            this.medicalAlertModel.deleteMany({ patientId }),
            this.waitingListModel.deleteMany({ patientId }),
            this.patientNotesService.deleteByPatient(id),
            this.patientPrescriptionsService.deleteByPatient(id),
        ]);
        await this.patientModel.findByIdAndDelete(patientId);
        this.patientsGateway.emitPatientDeleted(id);
        this.patientsGateway.emitPatientsListUpdated();
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(patient_schema_1.Patient.name)),
    __param(1, (0, mongoose_1.InjectModel)(appointment_schema_1.Appointment.name)),
    __param(2, (0, mongoose_1.InjectModel)(invoice_schema_1.Invoice.name)),
    __param(3, (0, mongoose_1.InjectModel)(invoice_payment_schema_1.InvoicePayment.name)),
    __param(4, (0, mongoose_1.InjectModel)(tooth_procedure_schema_1.ToothProcedure.name)),
    __param(5, (0, mongoose_1.InjectModel)(medical_alert_schema_1.MedicalAlert.name)),
    __param(6, (0, mongoose_1.InjectModel)(waiting_list_item_schema_1.WaitingListItem.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        patient_notes_service_1.PatientNotesService,
        patient_prescriptions_service_1.PatientPrescriptionsService,
        patients_gateway_1.PatientsGateway])
], PatientsService);
//# sourceMappingURL=patients.service.js.map