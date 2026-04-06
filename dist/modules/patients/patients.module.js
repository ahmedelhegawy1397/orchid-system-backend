"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const patient_schema_1 = require("./schemas/patient.schema");
const patients_service_1 = require("./patients.service");
const patients_controller_1 = require("./patients.controller");
const patients_gateway_1 = require("./patients.gateway");
const appointment_schema_1 = require("../appointments/schemas/appointment.schema");
const invoice_schema_1 = require("../invoices/schemas/invoice.schema");
const invoice_payment_schema_1 = require("../invoices/schemas/invoice-payment.schema");
const tooth_procedure_schema_1 = require("../tooth-procedures/schemas/tooth-procedure.schema");
const medical_alert_schema_1 = require("../medical-alerts/schemas/medical-alert.schema");
const waiting_list_item_schema_1 = require("../waiting-list/schemas/waiting-list-item.schema");
const tooth_procedures_module_1 = require("../tooth-procedures/tooth-procedures.module");
const medical_alerts_module_1 = require("../medical-alerts/medical-alerts.module");
const patient_notes_module_1 = require("../patient-notes/patient-notes.module");
const patient_prescriptions_module_1 = require("../patient-prescriptions/patient-prescriptions.module");
let PatientsModule = class PatientsModule {
};
exports.PatientsModule = PatientsModule;
exports.PatientsModule = PatientsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: patient_schema_1.Patient.name, schema: patient_schema_1.PatientSchema },
                { name: appointment_schema_1.Appointment.name, schema: appointment_schema_1.AppointmentSchema },
                { name: invoice_schema_1.Invoice.name, schema: invoice_schema_1.InvoiceSchema },
                { name: invoice_payment_schema_1.InvoicePayment.name, schema: invoice_payment_schema_1.InvoicePaymentSchema },
                { name: tooth_procedure_schema_1.ToothProcedure.name, schema: tooth_procedure_schema_1.ToothProcedureSchema },
                { name: medical_alert_schema_1.MedicalAlert.name, schema: medical_alert_schema_1.MedicalAlertSchema },
                { name: waiting_list_item_schema_1.WaitingListItem.name, schema: waiting_list_item_schema_1.WaitingListItemSchema },
            ]),
            tooth_procedures_module_1.ToothProceduresModule,
            medical_alerts_module_1.MedicalAlertsModule,
            patient_notes_module_1.PatientNotesModule,
            patient_prescriptions_module_1.PatientPrescriptionsModule,
        ],
        controllers: [patients_controller_1.PatientsController],
        providers: [patients_service_1.PatientsService, patients_gateway_1.PatientsGateway],
        exports: [patients_service_1.PatientsService, patients_gateway_1.PatientsGateway, mongoose_1.MongooseModule],
    })
], PatientsModule);
//# sourceMappingURL=patients.module.js.map