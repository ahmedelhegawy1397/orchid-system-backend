"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const invoice_schema_1 = require("./schemas/invoice.schema");
const invoice_payment_schema_1 = require("./schemas/invoice-payment.schema");
const expense_schema_1 = require("../expenses/schemas/expense.schema");
const invoices_service_1 = require("./invoices.service");
const invoices_controller_1 = require("./invoices.controller");
const accounting_module_1 = require("../accounting/accounting.module");
const dashboard_module_1 = require("../dashboard/dashboard.module");
let InvoicesModule = class InvoicesModule {
};
exports.InvoicesModule = InvoicesModule;
exports.InvoicesModule = InvoicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: invoice_schema_1.Invoice.name, schema: invoice_schema_1.InvoiceSchema },
                { name: invoice_payment_schema_1.InvoicePayment.name, schema: invoice_payment_schema_1.InvoicePaymentSchema },
                { name: expense_schema_1.Expense.name, schema: expense_schema_1.ExpenseSchema },
            ]),
            (0, common_1.forwardRef)(() => accounting_module_1.AccountingModule),
            (0, common_1.forwardRef)(() => dashboard_module_1.DashboardModule),
        ],
        controllers: [invoices_controller_1.InvoicesController],
        providers: [invoices_service_1.InvoicesService],
        exports: [invoices_service_1.InvoicesService, mongoose_1.MongooseModule],
    })
], InvoicesModule);
//# sourceMappingURL=invoices.module.js.map