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
exports.LabRecordSchema = exports.LabRecord = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../../enums");
let LabRecord = class LabRecord extends mongoose_2.Document {
};
exports.LabRecord = LabRecord;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Doctor', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], LabRecord.prototype, "doctorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Patient', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], LabRecord.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Number], default: [] }),
    __metadata("design:type", Array)
], LabRecord.prototype, "teethNumbers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LabRecord.prototype, "toothCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LabRecord.prototype, "procedure", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], LabRecord.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LabRecord.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LabRecord.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(enums_1.LabRecordStatus), default: enums_1.LabRecordStatus.Pending }),
    __metadata("design:type", String)
], LabRecord.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], LabRecord.prototype, "completedAt", void 0);
exports.LabRecord = LabRecord = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], LabRecord);
exports.LabRecordSchema = mongoose_1.SchemaFactory.createForClass(LabRecord);
exports.LabRecordSchema.index({ patientId: 1 });
exports.LabRecordSchema.index({ doctorId: 1 });
exports.LabRecordSchema.index({ date: 1 });
//# sourceMappingURL=lab-record.schema.js.map