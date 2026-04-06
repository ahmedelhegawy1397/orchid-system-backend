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
exports.MedicalAlertsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objectid_1 = require("../../common/utils/objectid");
const medical_alert_schema_1 = require("./schemas/medical-alert.schema");
let MedicalAlertsService = class MedicalAlertsService {
    constructor(medicalAlertModel) {
        this.medicalAlertModel = medicalAlertModel;
    }
    async findByPatient(patientId) {
        return this.medicalAlertModel.find({ patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId') }).sort({ createdAt: -1 }).lean();
    }
    async create(patientId, dto) {
        const alert = await this.medicalAlertModel.create({
            patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId'),
            ...dto,
        });
        return alert.toObject();
    }
    async remove(id) {
        const deleted = await this.medicalAlertModel.findByIdAndDelete((0, objectid_1.toObjectIdOrThrow)(id, 'id'));
        if (!deleted)
            throw new common_1.NotFoundException('Medical alert not found');
    }
};
exports.MedicalAlertsService = MedicalAlertsService;
exports.MedicalAlertsService = MedicalAlertsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(medical_alert_schema_1.MedicalAlert.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MedicalAlertsService);
//# sourceMappingURL=medical-alerts.service.js.map