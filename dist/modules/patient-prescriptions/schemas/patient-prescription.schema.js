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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientPrescriptionSchema = exports.PatientPrescription = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PatientPrescription = class PatientPrescription extends mongoose_2.Document {
};
exports.PatientPrescription = PatientPrescription;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Patient', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PatientPrescription.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Appointment' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PatientPrescription.prototype, "appointmentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Doctor', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PatientPrescription.prototype, "doctorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], PatientPrescription.prototype, "medication", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], PatientPrescription.prototype, "strength", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], PatientPrescription.prototype, "form", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], PatientPrescription.prototype, "dosage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], PatientPrescription.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PatientPrescription.prototype, "datePrescribed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PatientPrescription.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'active' }),
    __metadata("design:type", String)
], PatientPrescription.prototype, "status", void 0);
exports.PatientPrescription = PatientPrescription = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PatientPrescription);
exports.PatientPrescriptionSchema = mongoose_1.SchemaFactory.createForClass(PatientPrescription);
exports.PatientPrescriptionSchema.index({ patientId: 1 });
exports.PatientPrescriptionSchema.index({ doctorId: 1, datePrescribed: -1 });
//# sourceMappingURL=patient-prescription.schema.js.map