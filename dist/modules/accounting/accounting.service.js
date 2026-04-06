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
exports.AccountingService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objectid_1 = require("../../common/utils/objectid");
const date_range_util_1 = require("../../common/utils/date-range.util");
const invoice_schema_1 = require("../invoices/schemas/invoice.schema");
const invoice_payment_schema_1 = require("../invoices/schemas/invoice-payment.schema");
const expense_schema_1 = require("../expenses/schemas/expense.schema");
const lab_record_schema_1 = require("../lab-management/schemas/lab-record.schema");
const doctor_schema_1 = require("../doctors/schemas/doctor.schema");
const enums_1 = require("../../enums");
let AccountingService = class AccountingService {
    constructor(invoiceModel, paymentModel, expenseModel, labRecordModel, doctorModel, configService) {
        this.invoiceModel = invoiceModel;
        this.paymentModel = paymentModel;
        this.expenseModel = expenseModel;
        this.labRecordModel = labRecordModel;
        this.doctorModel = doctorModel;
        this.configService = configService;
    }
    async getAccountingSummary(query) {
        const filter = {};
        const doctorId = (0, objectid_1.toObjectIdOrUndefined)(query.doctorId);
        if (doctorId)
            filter.doctorId = doctorId;
        if (query.startDate || query.endDate) {
            const startStr = query.startDate ?? query.endDate;
            const endStr = query.endDate ?? query.startDate;
            const tz = this.configService.get('clinicTimezone') ?? 'Africa/Cairo';
            const startHour = this.configService.get('workdayStartHour') ?? 6;
            const { start, end } = (0, date_range_util_1.getWorkdayRangeFromDateRange)(startStr, endStr, tz, startHour);
            filter.createdAt = { $gte: start, $lt: end };
        }
        const paymentDateFilter = {};
        if (query.startDate || query.endDate) {
            if (query.startDate)
                paymentDateFilter.$gte = query.startDate;
            if (query.endDate)
                paymentDateFilter.$lte = query.endDate;
        }
        const [aggResult, collectedData, totalExpenses, availableDays, labFees, doctorData] = await Promise.all([
            this.invoiceModel
                .aggregate([
                { $match: filter },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$total' },
                        totalCollected: { $sum: '$paid' },
                        pendingBalance: { $sum: '$remaining' },
                        totalDiscounts: { $sum: { $subtract: ['$subtotal', '$total'] } },
                        pendingInvoicesCount: {
                            $sum: { $cond: [{ $in: ['$status', [enums_1.InvoiceStatus.Partial, enums_1.InvoiceStatus.Unpaid]] }, 1, 0] },
                        },
                        totalInvoicesCount: { $sum: 1 },
                    },
                },
            ])
                .then((r) => r[0]),
            (async () => {
                const paymentFilter = {};
                if (query.startDate || query.endDate) {
                    paymentFilter.paidDate = {};
                    if (query.startDate)
                        paymentFilter.paidDate.$gte = query.startDate;
                    if (query.endDate)
                        paymentFilter.paidDate.$lte = query.endDate;
                }
                if (doctorId) {
                    const doctorInvoices = await this.invoiceModel.find({ doctorId }).select('_id').lean();
                    const invoiceIds = doctorInvoices.map((inv) => inv._id);
                    if (invoiceIds.length === 0) {
                        return { total: 0, cash: 0, vodafoneCash: 0, instapay: 0 };
                    }
                    paymentFilter.invoiceId = { $in: invoiceIds };
                }
                const payments = await this.paymentModel.find(paymentFilter).select('amount method').lean();
                let total = 0;
                let cash = 0;
                let vodafoneCash = 0;
                let instapay = 0;
                for (const p of payments) {
                    total += p.amount;
                    if (p.method === enums_1.PaymentMethod.Cash)
                        cash += p.amount;
                    else if (p.method === enums_1.PaymentMethod.VodafoneCash)
                        vodafoneCash += p.amount;
                    else if (p.method === enums_1.PaymentMethod.Instapay)
                        instapay += p.amount;
                }
                return { total, cash, vodafoneCash, instapay };
            })(),
            doctorId
                ? Promise.resolve(0)
                : this.expenseModel
                    .find(query.startDate && query.endDate
                    ? {
                        $expr: {
                            $and: [
                                { $gte: [{ $substr: [{ $ifNull: ['$date', ''] }, 0, 10] }, query.startDate] },
                                { $lte: [{ $substr: [{ $ifNull: ['$date', ''] }, 0, 10] }, query.endDate] },
                            ],
                        },
                    }
                    : {})
                    .lean()
                    .then((expenses) => expenses.reduce((sum, e) => sum + e.amount, 0)),
            this.invoiceModel
                .find(filter)
                .select('_id')
                .lean()
                .then(async (matchingInvoices) => {
                const ids = matchingInvoices.map((inv) => inv._id);
                if (!ids.length)
                    return [];
                const paymentFilter = { invoiceId: { $in: ids } };
                if (query.startDate || query.endDate) {
                    paymentFilter.paidDate = {};
                    if (query.startDate)
                        paymentFilter.paidDate.$gte = query.startDate;
                    if (query.endDate)
                        paymentFilter.paidDate.$lte = query.endDate;
                }
                const payments = await this.paymentModel
                    .find(paymentFilter)
                    .select('paidDate')
                    .lean();
                const daysSet = new Set();
                for (const p of payments) {
                    if (p.paidDate) {
                        const day = parseInt(p.paidDate.split('-')[2], 10);
                        if (!isNaN(day)) {
                            daysSet.add(day);
                        }
                    }
                }
                return Array.from(daysSet).sort((a, b) => a - b);
            }),
            (async () => {
                const labFilter = {};
                if (doctorId) {
                    labFilter.doctorId = doctorId;
                }
                if (query.startDate || query.endDate) {
                    labFilter.date = {};
                    if (query.startDate)
                        labFilter.date.$gte = query.startDate;
                    if (query.endDate)
                        labFilter.date.$lte = query.endDate;
                }
                const labRecords = await this.labRecordModel.find(labFilter).select('price').lean();
                return labRecords.reduce((sum, record) => sum + (record.price || 0), 0);
            })(),
            doctorId ? this.doctorModel.findById(doctorId).select('doctorSharePercent clinicSharePercent').lean() : Promise.resolve(null),
        ]);
        const agg = aggResult ?? {
            totalRevenue: 0,
            totalCollected: 0,
            pendingBalance: 0,
            totalDiscounts: 0,
            pendingInvoicesCount: 0,
            totalInvoicesCount: 0,
        };
        const collectedAmount = collectedData.total;
        const afterLabFees = collectedAmount - labFees;
        let doctorShare = 0;
        let clinicShare = 0;
        if (doctorData) {
            const doctorPercent = doctorData.doctorSharePercent ?? 80;
            const clinicPercent = doctorData.clinicSharePercent ?? 20;
            doctorShare = (afterLabFees * doctorPercent) / 100;
            clinicShare = (afterLabFees * clinicPercent) / 100;
        }
        else if (afterLabFees > 0) {
            doctorShare = (afterLabFees * 80) / 100;
            clinicShare = (afterLabFees * 20) / 100;
        }
        return {
            collected: collectedAmount,
            collectedByPaymentMethod: {
                cash: collectedData.cash,
                vodafoneCash: collectedData.vodafoneCash,
                instapay: collectedData.instapay,
            },
            totalRevenue: agg.totalRevenue,
            expenses: totalExpenses,
            afterExpenses: collectedAmount - totalExpenses,
            pendingBalance: agg.pendingBalance,
            pendingInvoices: agg.pendingInvoicesCount,
            totalInvoices: agg.totalInvoicesCount,
            totalDiscounts: agg.totalDiscounts,
            labFees,
            doctorShare,
            clinicShare,
            availableDays,
        };
    }
};
exports.AccountingService = AccountingService;
exports.AccountingService = AccountingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invoice_schema_1.Invoice.name)),
    __param(1, (0, mongoose_1.InjectModel)(invoice_payment_schema_1.InvoicePayment.name)),
    __param(2, (0, mongoose_1.InjectModel)(expense_schema_1.Expense.name)),
    __param(3, (0, mongoose_1.InjectModel)(lab_record_schema_1.LabRecord.name)),
    __param(4, (0, mongoose_1.InjectModel)(doctor_schema_1.Doctor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService])
], AccountingService);
//# sourceMappingURL=accounting.service.js.map