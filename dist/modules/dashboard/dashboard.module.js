"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dashboard_controller_1 = require("./dashboard.controller");
const dashboard_service_1 = require("./dashboard.service");
const dashboard_gateway_1 = require("./dashboard.gateway");
const invoice_schema_1 = require("../invoices/schemas/invoice.schema");
const invoice_payment_schema_1 = require("../invoices/schemas/invoice-payment.schema");
const expense_schema_1 = require("../expenses/schemas/expense.schema");
const appointment_schema_1 = require("../appointments/schemas/appointment.schema");
const doctor_schema_1 = require("../doctors/schemas/doctor.schema");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: invoice_schema_1.Invoice.name, schema: invoice_schema_1.InvoiceSchema },
                { name: invoice_payment_schema_1.InvoicePayment.name, schema: invoice_payment_schema_1.InvoicePaymentSchema },
                { name: expense_schema_1.Expense.name, schema: expense_schema_1.ExpenseSchema },
                { name: appointment_schema_1.Appointment.name, schema: appointment_schema_1.AppointmentSchema },
                { name: doctor_schema_1.Doctor.name, schema: doctor_schema_1.DoctorSchema },
            ]),
        ],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService, dashboard_gateway_1.DashboardGateway],
        exports: [dashboard_gateway_1.DashboardGateway],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map