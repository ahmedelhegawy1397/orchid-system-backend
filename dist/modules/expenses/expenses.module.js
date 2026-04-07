"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const expense_schema_1 = require("./schemas/expense.schema");
const expenses_service_1 = require("./expenses.service");
const expenses_controller_1 = require("./expenses.controller");
const accounting_module_1 = require("../accounting/accounting.module");
const dashboard_module_1 = require("../dashboard/dashboard.module");
const daily_closeouts_module_1 = require("../daily-closeouts/daily-closeouts.module");
let ExpensesModule = class ExpensesModule {
};
exports.ExpensesModule = ExpensesModule;
exports.ExpensesModule = ExpensesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: expense_schema_1.Expense.name, schema: expense_schema_1.ExpenseSchema }]),
            (0, common_1.forwardRef)(() => accounting_module_1.AccountingModule),
            (0, common_1.forwardRef)(() => dashboard_module_1.DashboardModule),
            (0, common_1.forwardRef)(() => daily_closeouts_module_1.DailyCloseoutsModule),
        ],
        controllers: [expenses_controller_1.ExpensesController],
        providers: [expenses_service_1.ExpensesService],
        exports: [expenses_service_1.ExpensesService, mongoose_1.MongooseModule],
    })
], ExpensesModule);
//# sourceMappingURL=expenses.module.js.map