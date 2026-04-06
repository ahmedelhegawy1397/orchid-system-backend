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
exports.PatientSchema = exports.Patient = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../../enums");
let Patient = class Patient extends mongoose_2.Document {
};
exports.Patient = Patient;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Patient.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Patient.prototype, "nameAr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Patient.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0, max: 150 }),
    __metadata("design:type", Number)
], Patient.prototype, "age", void 0);
__decorate([
    (0, mongoose_1.Prop)({ lowercase: true, trim: true }),
    __metadata("design:type", String)
], Patient.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Patient.prototype, "dateOfBirth", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(enums_1.PatientGender) }),
    __metadata("design:type", String)
], Patient.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Patient.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Patient.prototype, "lastVisit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Doctor' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Patient.prototype, "assignedDoctorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Patient.prototype, "hasCompletedOnboarding", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Patient.prototype, "job", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Patient.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            diabetes: Boolean,
            heartDisease: Boolean,
            bloodPressure: Boolean,
            hepatitis: Boolean,
            kidneyDisease: Boolean,
            allergies: Boolean,
            other: Boolean,
        },
    }),
    __metadata("design:type", Object)
], Patient.prototype, "medicalConditions", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            takingMedication: { type: String, enum: ['yes', 'no'] },
            medicationDetails: { type: String },
            pregnant: { type: String, enum: ['yes', 'no', 'n/a'] },
            breastfeeding: { type: String, enum: ['yes', 'no'] },
            smoking: { type: String, enum: ['yes', 'no'] },
        },
    }),
    __metadata("design:type", Object)
], Patient.prototype, "questionnaire", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Number], default: [] }),
    __metadata("design:type", Array)
], Patient.prototype, "hiddenTeeth", void 0);
exports.Patient = Patient = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Patient);
exports.PatientSchema = mongoose_1.SchemaFactory.createForClass(Patient);
exports.PatientSchema.index({ phone: 1 });
exports.PatientSchema.index({ name: 'text', nameAr: 'text' });
//# sourceMappingURL=patient.schema.js.map