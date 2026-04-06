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
exports.PatientPrescriptionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objectid_1 = require("../../common/utils/objectid");
const patient_prescription_schema_1 = require("./schemas/patient-prescription.schema");
const patients_gateway_1 = require("../patients/patients.gateway");
let PatientPrescriptionsService = class PatientPrescriptionsService {
    constructor(patientPrescriptionModel, patientsGateway) {
        this.patientPrescriptionModel = patientPrescriptionModel;
        this.patientsGateway = patientsGateway;
    }
    async findByPatient(patientId) {
        return this.patientPrescriptionModel
            .find({ patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId') })
            .populate('doctorId', 'name nameAr')
            .populate('appointmentId', 'date startTime')
            .sort({ datePrescribed: -1 })
            .lean();
    }
    async create(patientId, dto) {
        const appointmentId = dto.appointmentId ? (0, objectid_1.toObjectIdOrUndefined)(dto.appointmentId) : undefined;
        if (dto.appointmentId && !appointmentId) {
            throw new common_1.BadRequestException('appointmentId must be a valid MongoDB ObjectId (24 hex characters)');
        }
        const today = new Date().toISOString().split('T')[0];
        const prescription = await this.patientPrescriptionModel.create({
            patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId'),
            doctorId: (0, objectid_1.toObjectIdOrThrow)(dto.doctorId, 'doctorId'),
            appointmentId,
            medication: dto.medication,
            strength: dto.strength,
            form: dto.form,
            dosage: dto.dosage,
            duration: dto.duration,
            datePrescribed: today,
            notes: dto.notes,
            status: 'active',
        });
        const result = await this.patientPrescriptionModel
            .findById(prescription._id)
            .populate('doctorId', 'name nameAr')
            .populate('appointmentId', 'date startTime')
            .lean();
        this.patientsGateway.emitPatientUpdated(patientId, { patientPrescriptionAdded: true });
        return result;
    }
    async findOne(patientId, prescriptionId) {
        const prescription = await this.patientPrescriptionModel
            .findOne({
            _id: (0, objectid_1.toObjectIdOrThrow)(prescriptionId, 'prescriptionId'),
            patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId'),
        })
            .populate('doctorId', 'name nameAr')
            .populate('appointmentId', 'date startTime')
            .lean();
        if (!prescription)
            throw new common_1.NotFoundException('Patient prescription not found');
        return prescription;
    }
    async update(patientId, prescriptionId, dto) {
        const prescription = await this.patientPrescriptionModel.findOneAndUpdate({
            _id: (0, objectid_1.toObjectIdOrThrow)(prescriptionId, 'prescriptionId'),
            patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId'),
        }, { $set: dto }, { new: true })
            .populate('doctorId', 'name nameAr')
            .populate('appointmentId', 'date startTime')
            .lean();
        if (!prescription)
            throw new common_1.NotFoundException('Patient prescription not found');
        this.patientsGateway.emitPatientUpdated(patientId, { patientPrescriptionUpdated: true });
        return prescription;
    }
    async remove(patientId, prescriptionId) {
        const deleted = await this.patientPrescriptionModel.findOneAndDelete({
            _id: (0, objectid_1.toObjectIdOrThrow)(prescriptionId, 'prescriptionId'),
            patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId'),
        });
        if (!deleted)
            throw new common_1.NotFoundException('Patient prescription not found');
        this.patientsGateway.emitPatientUpdated(patientId, { patientPrescriptionDeleted: true });
    }
    async deleteByPatient(patientId) {
        await this.patientPrescriptionModel.deleteMany({ patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId') });
    }
};
exports.PatientPrescriptionsService = PatientPrescriptionsService;
exports.PatientPrescriptionsService = PatientPrescriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(patient_prescription_schema_1.PatientPrescription.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => patients_gateway_1.PatientsGateway))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        patients_gateway_1.PatientsGateway])
], PatientPrescriptionsService);
//# sourceMappingURL=patient-prescriptions.service.js.map