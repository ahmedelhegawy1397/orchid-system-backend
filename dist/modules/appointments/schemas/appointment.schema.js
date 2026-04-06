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
exports.AppointmentSchema = exports.Appointment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../../enums");
const fdi_validator_1 = require("../../../common/utils/fdi.validator");
function validateFDITooth(v) {
    const valid = new Set([11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48]);
    return valid.has(v);
}
let Appointment = class Appointment extends mongoose_2.Document {
};
exports.Appointment = Appointment;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Patient', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Appointment.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Doctor', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Appointment.prototype, "doctorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: Object.values(enums_1.BillingMode) }),
    __metadata("design:type", String)
], Appointment.prototype, "billingMode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Appointment.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Appointment.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Appointment.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 10, max: 240 }),
    __metadata("design:type", Number)
], Appointment.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(enums_1.AppointmentStatus), default: enums_1.AppointmentStatus.Scheduled }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Appointment.prototype, "procedure", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Appointment.prototype, "procedureAr", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Appointment.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, min: 0 }),
    __metadata("design:type", Number)
], Appointment.prototype, "sterilizationBuffer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ validate: { validator: validateFDITooth, message: 'Invalid FDI tooth number' } }),
    __metadata("design:type", Number)
], Appointment.prototype, "toothNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "treatmentAdded", void 0);
exports.Appointment = Appointment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Appointment);
exports.AppointmentSchema = mongoose_1.SchemaFactory.createForClass(Appointment);
exports.AppointmentSchema.index({ date: 1, doctorId: 1 });
exports.AppointmentSchema.index({ patientId: 1 });
exports.AppointmentSchema.pre('save', function (next) {
    if (this.isModified('startTime') || this.isModified('duration')) {
        this.endTime = (0, fdi_validator_1.addMinutesToTime)(this.startTime, this.duration);
    }
    next();
});
//# sourceMappingURL=appointment.schema.js.map