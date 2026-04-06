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
exports.DoctorSchema = exports.Doctor = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../../enums");
let Doctor = class Doctor extends mongoose_2.Document {
};
exports.Doctor = Doctor;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Doctor.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Doctor.prototype, "nameAr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Doctor.prototype, "specialty", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Doctor.prototype, "specialtyAr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(enums_1.DoctorColor) }),
    __metadata("design:type", String)
], Doctor.prototype, "color", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Doctor.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Doctor.prototype, "isOwner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(enums_1.DoctorRole) }),
    __metadata("design:type", String)
], Doctor.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 20, min: 0, max: 100 }),
    __metadata("design:type", Number)
], Doctor.prototype, "clinicSharePercent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 80, min: 0, max: 100 }),
    __metadata("design:type", Number)
], Doctor.prototype, "doctorSharePercent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Doctor.prototype, "userId", void 0);
exports.Doctor = Doctor = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Doctor);
exports.DoctorSchema = mongoose_1.SchemaFactory.createForClass(Doctor);
//# sourceMappingURL=doctor.schema.js.map