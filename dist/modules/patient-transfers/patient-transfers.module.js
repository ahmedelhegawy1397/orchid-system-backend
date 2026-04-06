"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientTransfersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const patient_transfer_schema_1 = require("./schemas/patient-transfer.schema");
const patient_schema_1 = require("../patients/schemas/patient.schema");
const patient_transfers_service_1 = require("./patient-transfers.service");
const patient_transfers_controller_1 = require("./patient-transfers.controller");
const patients_module_1 = require("../patients/patients.module");
let PatientTransfersModule = class PatientTransfersModule {
};
exports.PatientTransfersModule = PatientTransfersModule;
exports.PatientTransfersModule = PatientTransfersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: patient_transfer_schema_1.PatientTransfer.name, schema: patient_transfer_schema_1.PatientTransferSchema },
                { name: patient_schema_1.Patient.name, schema: patient_schema_1.PatientSchema },
            ]),
            (0, common_1.forwardRef)(() => patients_module_1.PatientsModule),
        ],
        controllers: [patient_transfers_controller_1.PatientTransfersController],
        providers: [patient_transfers_service_1.PatientTransfersService],
        exports: [patient_transfers_service_1.PatientTransfersService, mongoose_1.MongooseModule],
    })
], PatientTransfersModule);
//# sourceMappingURL=patient-transfers.module.js.map