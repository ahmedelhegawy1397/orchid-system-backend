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
exports.PatientsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const patients_service_1 = require("./patients.service");
const tooth_procedures_service_1 = require("../tooth-procedures/tooth-procedures.service");
const medical_alerts_service_1 = require("../medical-alerts/medical-alerts.service");
const create_patient_dto_1 = require("./dto/create-patient.dto");
const update_patient_dto_1 = require("./dto/update-patient.dto");
const update_hidden_teeth_dto_1 = require("./dto/update-hidden-teeth.dto");
const create_tooth_procedure_dto_1 = require("../tooth-procedures/dto/create-tooth-procedure.dto");
const create_medical_alert_dto_1 = require("../medical-alerts/dto/create-medical-alert.dto");
const patient_notes_service_1 = require("../patient-notes/patient-notes.service");
const create_patient_note_dto_1 = require("../patient-notes/dto/create-patient-note.dto");
const update_patient_note_dto_1 = require("../patient-notes/dto/update-patient-note.dto");
const patient_prescriptions_service_1 = require("../patient-prescriptions/patient-prescriptions.service");
const create_patient_prescription_dto_1 = require("../patient-prescriptions/dto/create-patient-prescription.dto");
const update_patient_prescription_dto_1 = require("../patient-prescriptions/dto/update-patient-prescription.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const enums_1 = require("../../enums");
let PatientsController = class PatientsController {
    constructor(patientsService, toothProceduresService, medicalAlertsService, patientNotesService, patientPrescriptionsService) {
        this.patientsService = patientsService;
        this.toothProceduresService = toothProceduresService;
        this.medicalAlertsService = medicalAlertsService;
        this.patientNotesService = patientNotesService;
        this.patientPrescriptionsService = patientPrescriptionsService;
    }
    findAll(search, assignedDoctorId, page, limit) {
        return this.patientsService.findAll({ search, assignedDoctorId, page, limit });
    }
    getBirthdays(date) {
        return this.patientsService.findBirthdays(date);
    }
    create(dto) {
        return this.patientsService.create(dto);
    }
    findOne(id) {
        return this.patientsService.findOne(id);
    }
    update(id, dto) {
        return this.patientsService.update(id, dto);
    }
    async remove(id) {
        await this.patientsService.remove(id);
    }
    async forceRemove(id) {
        await this.patientsService.forceRemove(id);
    }
    getToothProcedures(id) {
        return this.toothProceduresService.findByPatient(id);
    }
    setHiddenTeeth(id, dto) {
        return this.patientsService.setHiddenTeeth(id, dto.hiddenTeeth);
    }
    addHiddenTooth(id, toothNumber) {
        return this.patientsService.addHiddenTooth(id, toothNumber);
    }
    removeHiddenTooth(id, toothNumber) {
        return this.patientsService.removeHiddenTooth(id, toothNumber);
    }
    addToothProcedure(id, dto) {
        return this.toothProceduresService.create(id, dto);
    }
    getAlerts(id) {
        return this.medicalAlertsService.findByPatient(id);
    }
    addAlert(id, dto) {
        return this.medicalAlertsService.create(id, dto);
    }
    getNotes(id) {
        return this.patientNotesService.findByPatient(id);
    }
    addNote(id, dto) {
        return this.patientNotesService.create(id, dto);
    }
    updateNote(id, noteId, dto) {
        return this.patientNotesService.update(id, noteId, dto);
    }
    async removeNote(id, noteId) {
        await this.patientNotesService.remove(id, noteId);
    }
    getPrescriptions(id) {
        return this.patientPrescriptionsService.findByPatient(id);
    }
    addPrescription(id, dto) {
        return this.patientPrescriptionsService.create(id, dto);
    }
    getPrescription(id, prescriptionId) {
        return this.patientPrescriptionsService.findOne(id, prescriptionId);
    }
    updatePrescription(id, prescriptionId, dto) {
        return this.patientPrescriptionsService.update(id, prescriptionId, dto);
    }
    async removePrescription(id, prescriptionId) {
        await this.patientPrescriptionsService.remove(id, prescriptionId);
    }
};
exports.PatientsController = PatientsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List patients with optional filters. Search supports one or more characters (name, nameAr, phone).' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Search by name, nameAr, or phone; works with one or more letters' }),
    (0, swagger_1.ApiQuery)({ name: 'assignedDoctorId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('assignedDoctorId')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('birthday'),
    (0, swagger_1.ApiOperation)({ summary: 'List patients with birthdays; optional date filter (YYYY-MM-DD) for that month-day' }),
    (0, swagger_1.ApiQuery)({ name: 'date', required: false, description: 'Filter to birthdays on this date (e.g. today)' }),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "getBirthdays", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new patient' }),
    (0, swagger_1.ApiBody)({ type: create_patient_dto_1.CreatePatientDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_dto_1.CreatePatientDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get patient by ID (includes appointments, invoices, tooth procedures, alerts, prescriptions, dentalTreatments)',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Patient MongoDB ObjectId' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update patient by ID' }),
    (0, swagger_1.ApiBody)({ type: update_patient_dto_1.UpdatePatientDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_patient_dto_1.UpdatePatientDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete patient by ID (fails if patient has appointments or invoices)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/force'),
    (0, swagger_1.ApiOperation)({ summary: 'Force delete patient by ID (deletes patient with all appointments, invoices, and related data)' }),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Admin),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "forceRemove", null);
__decorate([
    (0, common_1.Get)(':id/tooth-procedures'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tooth procedures for patient' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "getToothProcedures", null);
__decorate([
    (0, common_1.Patch)(':id/hidden-teeth'),
    (0, swagger_1.ApiOperation)({ summary: 'Replace the full hidden teeth list for a patient' }),
    (0, swagger_1.ApiBody)({ type: update_hidden_teeth_dto_1.UpdateHiddenTeethDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hidden_teeth_dto_1.UpdateHiddenTeethDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "setHiddenTeeth", null);
__decorate([
    (0, common_1.Post)(':id/hidden-teeth/:toothNumber'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a single tooth to the hidden teeth list' }),
    (0, swagger_1.ApiParam)({ name: 'toothNumber', description: 'FDI tooth number (11-48)', type: Number }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('toothNumber', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "addHiddenTooth", null);
__decorate([
    (0, common_1.Delete)(':id/hidden-teeth/:toothNumber'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a single tooth from the hidden teeth list' }),
    (0, swagger_1.ApiParam)({ name: 'toothNumber', description: 'FDI tooth number (11-48)', type: Number }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('toothNumber', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "removeHiddenTooth", null);
__decorate([
    (0, common_1.Post)(':id/tooth-procedures'),
    (0, swagger_1.ApiOperation)({ summary: 'Add tooth procedure for patient' }),
    (0, swagger_1.ApiBody)({ type: create_tooth_procedure_dto_1.CreateToothProcedureDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_tooth_procedure_dto_1.CreateToothProcedureDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "addToothProcedure", null);
__decorate([
    (0, common_1.Get)(':id/alerts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get medical alerts for patient' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "getAlerts", null);
__decorate([
    (0, common_1.Post)(':id/alerts'),
    (0, swagger_1.ApiOperation)({ summary: 'Add medical alert for patient' }),
    (0, swagger_1.ApiBody)({ type: create_medical_alert_dto_1.CreateMedicalAlertDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_medical_alert_dto_1.CreateMedicalAlertDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "addAlert", null);
__decorate([
    (0, common_1.Get)(':id/notes'),
    (0, swagger_1.ApiOperation)({ summary: 'List notes for patient (dental chart)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "getNotes", null);
__decorate([
    (0, common_1.Post)(':id/notes'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a note for patient' }),
    (0, swagger_1.ApiBody)({ type: create_patient_note_dto_1.CreatePatientNoteDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_patient_note_dto_1.CreatePatientNoteDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "addNote", null);
__decorate([
    (0, common_1.Patch)(':id/notes/:noteId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a patient note' }),
    (0, swagger_1.ApiBody)({ type: update_patient_note_dto_1.UpdatePatientNoteDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('noteId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_patient_note_dto_1.UpdatePatientNoteDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "updateNote", null);
__decorate([
    (0, common_1.Delete)(':id/notes/:noteId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a patient note' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('noteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "removeNote", null);
__decorate([
    (0, common_1.Get)(':id/prescriptions'),
    (0, swagger_1.ApiOperation)({ summary: 'List prescriptions for patient' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "getPrescriptions", null);
__decorate([
    (0, common_1.Post)(':id/prescriptions'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a prescription for patient' }),
    (0, swagger_1.ApiBody)({ type: create_patient_prescription_dto_1.CreatePatientPrescriptionDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_patient_prescription_dto_1.CreatePatientPrescriptionDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "addPrescription", null);
__decorate([
    (0, common_1.Get)(':id/prescriptions/:prescriptionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get prescription by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('prescriptionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "getPrescription", null);
__decorate([
    (0, common_1.Patch)(':id/prescriptions/:prescriptionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a prescription' }),
    (0, swagger_1.ApiBody)({ type: update_patient_prescription_dto_1.UpdatePatientPrescriptionDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('prescriptionId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_patient_prescription_dto_1.UpdatePatientPrescriptionDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "updatePrescription", null);
__decorate([
    (0, common_1.Delete)(':id/prescriptions/:prescriptionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a prescription' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('prescriptionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "removePrescription", null);
exports.PatientsController = PatientsController = __decorate([
    (0, swagger_1.ApiTags)('Patients'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/patients'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Doctor, enums_1.UserRole.Assistant, enums_1.UserRole.Admin),
    __metadata("design:paramtypes", [patients_service_1.PatientsService,
        tooth_procedures_service_1.ToothProceduresService,
        medical_alerts_service_1.MedicalAlertsService,
        patient_notes_service_1.PatientNotesService,
        patient_prescriptions_service_1.PatientPrescriptionsService])
], PatientsController);
//# sourceMappingURL=patients.controller.js.map