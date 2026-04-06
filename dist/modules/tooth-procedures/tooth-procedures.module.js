"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToothProceduresModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tooth_procedure_schema_1 = require("./schemas/tooth-procedure.schema");
const tooth_procedures_service_1 = require("./tooth-procedures.service");
const tooth_procedures_controller_1 = require("./tooth-procedures.controller");
const patients_module_1 = require("../patients/patients.module");
let ToothProceduresModule = class ToothProceduresModule {
};
exports.ToothProceduresModule = ToothProceduresModule;
exports.ToothProceduresModule = ToothProceduresModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: tooth_procedure_schema_1.ToothProcedure.name, schema: tooth_procedure_schema_1.ToothProcedureSchema }]),
            (0, common_1.forwardRef)(() => patients_module_1.PatientsModule),
        ],
        controllers: [tooth_procedures_controller_1.ToothProceduresController],
        providers: [tooth_procedures_service_1.ToothProceduresService],
        exports: [tooth_procedures_service_1.ToothProceduresService, mongoose_1.MongooseModule],
    })
], ToothProceduresModule);
//# sourceMappingURL=tooth-procedures.module.js.map