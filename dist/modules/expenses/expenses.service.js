"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objectid_1 = require("../../common/utils/objectid");
const expense_schema_1 = require("./schemas/expense.schema");
const accounting_gateway_1 = require("../accounting/accounting.gateway");
const dashboard_gateway_1 = require("../dashboard/dashboard.gateway");
const daily_closeouts_gateway_1 = require("../daily-closeouts/daily-closeouts.gateway");
let ExpensesService = class ExpensesService {
    constructor(expenseModel, accountingGateway, dashboardGateway, dailyCloseoutsGateway) {
        this.expenseModel = expenseModel;
        this.accountingGateway = accountingGateway;
        this.dashboardGateway = dashboardGateway;
        this.dailyCloseoutsGateway = dailyCloseoutsGateway;
    }
    async findAll(query, userId) {
        const filter = {};
        if (query.date) {
            filter.date = query.date;
        }
        else if (query.startDate || query.endDate) {
            const dateFilter = {};
            if (query.startDate)
                dateFilter.$gte = query.startDate;
            if (query.endDate)
                dateFilter.$lte = query.endDate;
            filter.date = dateFilter;
        }
        const createdBy = userId ? (0, objectid_1.toObjectIdOrThrow)(userId, 'userId') : (0, objectid_1.toObjectIdOrUndefined)(query.createdBy);
        if (createdBy)
            filter.createdBy = createdBy;
        if (query.category)
            filter.category = query.category;
        return this.expenseModel.find(filter).populate('createdBy', 'name email').sort({ date: -1 }).lean();
    }
    async create(dto, userId) {
        const expense = await this.expenseModel.create({
            ...dto,
            createdBy: (0, objectid_1.toObjectIdOrThrow)(userId, 'userId'),
            currency: dto.currency ?? 'EGP',
        });
        const populatedExpense = await this.expenseModel.findById(expense._id).populate('createdBy', 'name email').lean();
        this.accountingGateway.emitExpenseCreated(populatedExpense);
        this.accountingGateway.emitAccountingUpdated();
        this.dashboardGateway.emitExpenseChanged(populatedExpense);
        this.dashboardGateway.emitDashboardUpdated();
        this.dailyCloseoutsGateway.emitCloseoutsListUpdated();
        return populatedExpense;
    }
    async update(id, dto, userId, isOwnerOrAdmin) {
        const expenseId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const expense = await this.expenseModel.findById(expenseId);
        if (!expense)
            throw new common_1.NotFoundException('Expense not found');
        if (!isOwnerOrAdmin && !expense.createdBy.equals((0, objectid_1.toObjectIdOrThrow)(userId, 'userId'))) {
            throw new common_1.ForbiddenException('Can only edit your own expenses');
        }
        await this.expenseModel.findByIdAndUpdate(expenseId, { $set: dto });
        const updatedExpense = await this.expenseModel.findById(expenseId).populate('createdBy', 'name email').lean();
        this.accountingGateway.emitExpenseUpdated(updatedExpense);
        this.accountingGateway.emitAccountingUpdated();
        this.dashboardGateway.emitExpenseChanged(updatedExpense);
        this.dashboardGateway.emitDashboardUpdated();
        this.dailyCloseoutsGateway.emitCloseoutsListUpdated();
        return updatedExpense;
    }
    async remove(id, userId, isOwnerOrAdmin) {
        const expenseId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const expense = await this.expenseModel.findById(expenseId);
        if (!expense)
            throw new common_1.NotFoundException('Expense not found');
        if (!isOwnerOrAdmin && !expense.createdBy.equals((0, objectid_1.toObjectIdOrThrow)(userId, 'userId'))) {
            throw new common_1.ForbiddenException('Can only delete your own expenses');
        }
        await this.expenseModel.findByIdAndDelete(expenseId);
        this.accountingGateway.emitExpenseDeleted(id);
        this.accountingGateway.emitAccountingUpdated();
        this.dashboardGateway.emitDashboardUpdated();
        this.dailyCloseoutsGateway.emitCloseoutsListUpdated();
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(expense_schema_1.Expense.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => accounting_gateway_1.AccountingGateway))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => dashboard_gateway_1.DashboardGateway))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => daily_closeouts_gateway_1.DailyCloseoutsGateway))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        accounting_gateway_1.AccountingGateway,
        dashboard_gateway_1.DashboardGateway,
        daily_closeouts_gateway_1.DailyCloseoutsGateway])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map