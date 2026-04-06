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
exports.ToothProcedureSchema = exports.ToothProcedure = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../../enums");
function validateFDITooth(v) {
    const valid = new Set([11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48]);
    return valid.has(v);
}
let ToothProcedure = class ToothProcedure extends mongoose_2.Document {
};
exports.ToothProcedure = ToothProcedure;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Patient', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ToothProcedure.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], ToothProcedure.prototype, "toothNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [Number],
        default: [],
        validate: {
            validator: (arr) => arr.every(validateFDITooth),
            message: 'Invalid FDI tooth number',
        },
    }),
    __metadata("design:type", Array)
], ToothProcedure.prototype, "toothNumbers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ToothProcedure.prototype, "procedure", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ToothProcedure.prototype, "procedureAr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(enums_1.ProcedureCategory) }),
    __metadata("design:type", String)
], ToothProcedure.prototype, "procedureType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], ToothProcedure.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0, default: 0 }),
    __metadata("design:type", Number)
], ToothProcedure.prototype, "discount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ToothProcedure.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Doctor', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ToothProcedure.prototype, "doctorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Appointment' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ToothProcedure.prototype, "appointmentId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ToothProcedure.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'EGP' }),
    __metadata("design:type", String)
], ToothProcedure.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false, required: false }),
    __metadata("design:type", Boolean)
], ToothProcedure.prototype, "isPediatric", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false, required: false }),
    __metadata("design:type", Boolean)
], ToothProcedure.prototype, "isComplete", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false, required: false }),
    __metadata("design:type", Boolean)
], ToothProcedure.prototype, "isLab", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], ToothProcedure.prototype, "labManagementId", void 0);
exports.ToothProcedure = ToothProcedure = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ToothProcedure);
exports.ToothProcedureSchema = mongoose_1.SchemaFactory.createForClass(ToothProcedure);
exports.ToothProcedureSchema.index({ patientId: 1, toothNumbers: 1 });
//# sourceMappingURL=tooth-procedure.schema.js.map