"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyCloseoutsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const daily_closeout_schema_1 = require("./schemas/daily-closeout.schema");
const invoice_schema_1 = require("../invoices/schemas/invoice.schema");
const invoice_payment_schema_1 = require("../invoices/schemas/invoice-payment.schema");
const expense_schema_1 = require("../expenses/schemas/expense.schema");
const doctor_schema_1 = require("../doctors/schemas/doctor.schema");
const daily_closeouts_service_1 = require("./daily-closeouts.service");
const daily_closeouts_controller_1 = require("./daily-closeouts.controller");
const daily_closeouts_gateway_1 = require("./daily-closeouts.gateway");
let DailyCloseoutsModule = class DailyCloseoutsModule {
};
exports.DailyCloseoutsModule = DailyCloseoutsModule;
exports.DailyCloseoutsModule = DailyCloseoutsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: daily_closeout_schema_1.DailyCloseout.name, schema: daily_closeout_schema_1.DailyCloseoutSchema },
                { name: invoice_schema_1.Invoice.name, schema: invoice_schema_1.InvoiceSchema },
                { name: invoice_payment_schema_1.InvoicePayment.name, schema: invoice_payment_schema_1.InvoicePaymentSchema },
                { name: expense_schema_1.Expense.name, schema: expense_schema_1.ExpenseSchema },
                { name: doctor_schema_1.Doctor.name, schema: doctor_schema_1.DoctorSchema },
            ]),
        ],
        controllers: [daily_closeouts_controller_1.DailyCloseoutsController],
        providers: [daily_closeouts_service_1.DailyCloseoutsService, daily_closeouts_gateway_1.DailyCloseoutsGateway],
        exports: [daily_closeouts_service_1.DailyCloseoutsService, daily_closeouts_gateway_1.DailyCloseoutsGateway, mongoose_1.MongooseModule],
    })
], DailyCloseoutsModule);
//# sourceMappingURL=daily-closeouts.module.js.map