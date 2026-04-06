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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const clinic_settings_schema_1 = require("./schemas/clinic-settings.schema");
const settings_gateway_1 = require("./settings.gateway");
let SettingsService = class SettingsService {
    constructor(clinicSettingsModel, gateway) {
        this.clinicSettingsModel = clinicSettingsModel;
        this.gateway = gateway;
    }
    async get() {
        const settings = await this.clinicSettingsModel.findOne().lean();
        if (!settings)
            throw new common_1.NotFoundException('Clinic settings not found. Run seed.');
        return settings;
    }
    async update(dto) {
        const settings = await this.clinicSettingsModel.findOneAndUpdate({}, { $set: dto }, { new: true }).lean();
        if (!settings)
            throw new common_1.NotFoundException('Clinic settings not found. Run seed.');
        this.gateway.emitSettingsUpdated(settings);
        return settings;
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(clinic_settings_schema_1.ClinicSettings.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        settings_gateway_1.SettingsGateway])
], SettingsService);
//# sourceMappingURL=settings.service.js.map