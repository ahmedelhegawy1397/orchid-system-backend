"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const invoice_payment_schema_1 = require("../invoices/schemas/invoice-payment.schema");
const expense_schema_1 = require("../expenses/schemas/expense.schema");
const invoice_schema_1 = require("../invoices/schemas/invoice.schema");
const procedure_pricing_schema_1 = require("../procedure-pricing/schemas/procedure-pricing.schema");
const appointment_schema_1 = require("../appointments/schemas/appointment.schema");
const doctor_schema_1 = require("../doctors/schemas/doctor.schema");
const lab_record_schema_1 = require("../lab-management/schemas/lab-record.schema");
const reports_service_1 = require("./reports.service");
const reports_controller_1 = require("./reports.controller");
const reports_gateway_1 = require("./reports.gateway");
let ReportsModule = class ReportsModule {
};
exports.ReportsModule = ReportsModule;
exports.ReportsModule = ReportsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: invoice_payment_schema_1.InvoicePayment.name, schema: invoice_payment_schema_1.InvoicePaymentSchema },
                { name: expense_schema_1.Expense.name, schema: expense_schema_1.ExpenseSchema },
                { name: invoice_schema_1.Invoice.name, schema: invoice_schema_1.InvoiceSchema },
                { name: procedure_pricing_schema_1.ProcedurePricing.name, schema: procedure_pricing_schema_1.ProcedurePricingSchema },
                { name: appointment_schema_1.Appointment.name, schema: appointment_schema_1.AppointmentSchema },
                { name: doctor_schema_1.Doctor.name, schema: doctor_schema_1.DoctorSchema },
                { name: lab_record_schema_1.LabRecord.name, schema: lab_record_schema_1.LabRecordSchema },
            ]),
        ],
        controllers: [reports_controller_1.ReportsController],
        providers: [reports_service_1.ReportsService, reports_gateway_1.ReportsGateway],
        exports: [reports_service_1.ReportsService, reports_gateway_1.ReportsGateway],
    })
], ReportsModule);
//# sourceMappingURL=reports.module.js.map