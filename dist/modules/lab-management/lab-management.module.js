"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabManagementModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const lab_record_schema_1 = require("./schemas/lab-record.schema");
const lab_management_service_1 = require("./lab-management.service");
const lab_management_controller_1 = require("./lab-management.controller");
const lab_management_gateway_1 = require("./lab-management.gateway");
let LabManagementModule = class LabManagementModule {
};
exports.LabManagementModule = LabManagementModule;
exports.LabManagementModule = LabManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: lab_record_schema_1.LabRecord.name, schema: lab_record_schema_1.LabRecordSchema }]),
        ],
        controllers: [lab_management_controller_1.LabManagementController],
        providers: [lab_management_service_1.LabManagementService, lab_management_gateway_1.LabManagementGateway],
        exports: [lab_management_service_1.LabManagementService, lab_management_gateway_1.LabManagementGateway],
    })
], LabManagementModule);
//# sourceMappingURL=lab-management.module.js.map