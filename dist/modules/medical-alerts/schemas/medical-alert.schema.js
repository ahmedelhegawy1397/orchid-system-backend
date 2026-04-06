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
exports.MedicalAlertSchema = exports.MedicalAlert = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../../enums");
let MedicalAlert = class MedicalAlert extends mongoose_2.Document {
};
exports.MedicalAlert = MedicalAlert;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Patient', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], MedicalAlert.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(enums_1.AlertType) }),
    __metadata("design:type", String)
], MedicalAlert.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], MedicalAlert.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(enums_1.AlertSeverity) }),
    __metadata("design:type", String)
], MedicalAlert.prototype, "severity", void 0);
exports.MedicalAlert = MedicalAlert = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], MedicalAlert);
exports.MedicalAlertSchema = mongoose_1.SchemaFactory.createForClass(MedicalAlert);
exports.MedicalAlertSchema.index({ patientId: 1 });
//# sourceMappingURL=medical-alert.schema.js.map