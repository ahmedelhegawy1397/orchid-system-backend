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
exports.ClinicSettingsSchema = exports.ClinicSettings = exports.WorkingHoursDay = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let WorkingHoursDay = class WorkingHoursDay {
};
exports.WorkingHoursDay = WorkingHoursDay;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WorkingHoursDay.prototype, "open", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WorkingHoursDay.prototype, "close", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], WorkingHoursDay.prototype, "isOpen", void 0);
exports.WorkingHoursDay = WorkingHoursDay = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], WorkingHoursDay);
const WorkingHoursDaySchema = mongoose_1.SchemaFactory.createForClass(WorkingHoursDay);
let ClinicSettings = class ClinicSettings extends mongoose_2.Document {
};
exports.ClinicSettings = ClinicSettings;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ClinicSettings.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ClinicSettings.prototype, "nameAr", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ClinicSettings.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ClinicSettings.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ClinicSettings.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Map, of: WorkingHoursDaySchema }),
    __metadata("design:type", Map)
], ClinicSettings.prototype, "workingHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Number], default: [15, 30, 45, 60, 90, 120] }),
    __metadata("design:type", Array)
], ClinicSettings.prototype, "appointmentDurations", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, min: 0 }),
    __metadata("design:type", Number)
], ClinicSettings.prototype, "sterilizationBuffer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 20, min: 0, max: 100 }),
    __metadata("design:type", Number)
], ClinicSettings.prototype, "clinicSharePercentage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'EGP' }),
    __metadata("design:type", String)
], ClinicSettings.prototype, "currency", void 0);
exports.ClinicSettings = ClinicSettings = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ClinicSettings);
exports.ClinicSettingsSchema = mongoose_1.SchemaFactory.createForClass(ClinicSettings);
//# sourceMappingURL=clinic-settings.schema.js.map