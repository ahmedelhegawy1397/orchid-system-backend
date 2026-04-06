"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientNotesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const patient_note_schema_1 = require("./schemas/patient-note.schema");
const patient_notes_service_1 = require("./patient-notes.service");
const patients_module_1 = require("../patients/patients.module");
let PatientNotesModule = class PatientNotesModule {
};
exports.PatientNotesModule = PatientNotesModule;
exports.PatientNotesModule = PatientNotesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: patient_note_schema_1.PatientNote.name, schema: patient_note_schema_1.PatientNoteSchema }]),
            (0, common_1.forwardRef)(() => patients_module_1.PatientsModule),
        ],
        providers: [patient_notes_service_1.PatientNotesService],
        exports: [patient_notes_service_1.PatientNotesService, mongoose_1.MongooseModule],
    })
], PatientNotesModule);
//# sourceMappingURL=patient-notes.module.js.map