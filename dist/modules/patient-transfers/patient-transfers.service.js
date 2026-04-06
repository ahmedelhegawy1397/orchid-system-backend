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
exports.PatientTransfersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objectid_1 = require("../../common/utils/objectid");
const patient_transfer_schema_1 = require("./schemas/patient-transfer.schema");
const patient_schema_1 = require("../patients/schemas/patient.schema");
const patients_gateway_1 = require("../patients/patients.gateway");
let PatientTransfersService = class PatientTransfersService {
    constructor(patientTransferModel, patientModel, patientsGateway) {
        this.patientTransferModel = patientTransferModel;
        this.patientModel = patientModel;
        this.patientsGateway = patientsGateway;
    }
    async transfer(patientId, toDoctorId, reason, notes, userId) {
        const patientOid = (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId');
        const toDoctorOid = (0, objectid_1.toObjectIdOrThrow)(toDoctorId, 'toDoctorId');
        const userOid = (0, objectid_1.toObjectIdOrThrow)(userId, 'userId');
        const patient = await this.patientModel.findById(patientOid);
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        const fromDoctorId = patient.assignedDoctorId;
        if (!fromDoctorId)
            throw new common_1.NotFoundException('Patient has no assigned doctor to transfer from');
        const transfer = await this.patientTransferModel.create({
            patientId: patientOid,
            fromDoctorId,
            toDoctorId: toDoctorOid,
            reason,
            notes,
            transferredAt: new Date().toISOString(),
            transferredBy: userOid,
        });
        await this.patientModel.findByIdAndUpdate(patientOid, { assignedDoctorId: toDoctorOid });
        const result = await this.patientTransferModel.findById(transfer._id).populate('fromDoctorId toDoctorId transferredBy', 'name nameAr email').lean();
        this.patientsGateway.emitPatientUpdated(patientId, { patientTransferred: true, newDoctorId: toDoctorId });
        this.patientsGateway.emitPatientsListUpdated();
        return result;
    }
    async findByPatient(patientId) {
        return this.patientTransferModel.find({ patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId') }).populate('fromDoctorId toDoctorId transferredBy', 'name nameAr email').sort({ transferredAt: -1 }).lean();
    }
};
exports.PatientTransfersService = PatientTransfersService;
exports.PatientTransfersService = PatientTransfersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(patient_transfer_schema_1.PatientTransfer.name)),
    __param(1, (0, mongoose_1.InjectModel)(patient_schema_1.Patient.name)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => patients_gateway_1.PatientsGateway))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        patients_gateway_1.PatientsGateway])
], PatientTransfersService);
//# sourceMappingURL=patient-transfers.service.js.map