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
exports.PatientNotesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objectid_1 = require("../../common/utils/objectid");
const patient_note_schema_1 = require("./schemas/patient-note.schema");
const patients_gateway_1 = require("../patients/patients.gateway");
let PatientNotesService = class PatientNotesService {
    constructor(patientNoteModel, patientsGateway) {
        this.patientNoteModel = patientNoteModel;
        this.patientsGateway = patientsGateway;
    }
    async findByPatient(patientId) {
        return this.patientNoteModel
            .find({ patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId') })
            .sort({ createdAt: -1 })
            .lean();
    }
    async create(patientId, dto) {
        const note = await this.patientNoteModel.create({
            patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId'),
            content: dto.content,
        });
        const result = note.toObject();
        this.patientsGateway.emitPatientUpdated(patientId, { patientNoteAdded: true });
        return result;
    }
    async update(patientId, noteId, dto) {
        const note = await this.patientNoteModel.findOneAndUpdate({ _id: (0, objectid_1.toObjectIdOrThrow)(noteId, 'noteId'), patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId') }, { $set: dto }, { new: true }).lean();
        if (!note)
            throw new common_1.NotFoundException('Patient note not found');
        this.patientsGateway.emitPatientUpdated(patientId, { patientNoteUpdated: true });
        return note;
    }
    async remove(patientId, noteId) {
        const deleted = await this.patientNoteModel.findOneAndDelete({
            _id: (0, objectid_1.toObjectIdOrThrow)(noteId, 'noteId'),
            patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId'),
        });
        if (!deleted)
            throw new common_1.NotFoundException('Patient note not found');
        this.patientsGateway.emitPatientUpdated(patientId, { patientNoteDeleted: true });
    }
    async deleteByPatient(patientId) {
        await this.patientNoteModel.deleteMany({ patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId') });
    }
};
exports.PatientNotesService = PatientNotesService;
exports.PatientNotesService = PatientNotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(patient_note_schema_1.PatientNote.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => patients_gateway_1.PatientsGateway))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        patients_gateway_1.PatientsGateway])
], PatientNotesService);
//# sourceMappingURL=patient-notes.service.js.map