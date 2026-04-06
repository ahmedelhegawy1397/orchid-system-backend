"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalAlertsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const medical_alert_schema_1 = require("./schemas/medical-alert.schema");
const medical_alerts_service_1 = require("./medical-alerts.service");
const medical_alerts_controller_1 = require("./medical-alerts.controller");
let MedicalAlertsModule = class MedicalAlertsModule {
};
exports.MedicalAlertsModule = MedicalAlertsModule;
exports.MedicalAlertsModule = MedicalAlertsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: medical_alert_schema_1.MedicalAlert.name, schema: medical_alert_schema_1.MedicalAlertSchema }])],
        controllers: [medical_alerts_controller_1.MedicalAlertsController],
        providers: [medical_alerts_service_1.MedicalAlertsService],
        exports: [medical_alerts_service_1.MedicalAlertsService, mongoose_1.MongooseModule],
    })
], MedicalAlertsModule);
//# sourceMappingURL=medical-alerts.module.js.map