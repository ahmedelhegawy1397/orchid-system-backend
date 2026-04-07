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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objectid_1 = require("../../common/utils/objectid");
const date_range_util_1 = require("../../common/utils/date-range.util");
const shift_date_util_1 = require("../../common/utils/shift-date.util");
const invoice_schema_1 = require("./schemas/invoice.schema");
const invoice_payment_schema_1 = require("./schemas/invoice-payment.schema");
const expense_schema_1 = require("../expenses/schemas/expense.schema");
const enums_1 = require("../../enums");
const invoice_helpers_1 = require("./invoice-helpers");
const accounting_gateway_1 = require("../accounting/accounting.gateway");
const dashboard_gateway_1 = require("../dashboard/dashboard.gateway");
const daily_closeouts_gateway_1 = require("../daily-closeouts/daily-closeouts.gateway");
let InvoicesService = class InvoicesService {
    constructor(invoiceModel, paymentModel, expenseModel, configService, accountingGateway, dashboardGateway, dailyCloseoutsGateway) {
        this.invoiceModel = invoiceModel;
        this.paymentModel = paymentModel;
        this.expenseModel = expenseModel;
        this.configService = configService;
        this.accountingGateway = accountingGateway;
        this.dashboardGateway = dashboardGateway;
        this.dailyCloseoutsGateway = dailyCloseoutsGateway;
    }
    async findAll(query, doctorIdFilter) {
        const filter = {};
        const patientId = (0, objectid_1.toObjectIdOrUndefined)(query.patientId);
        if (patientId)
            filter.patientId = patientId;
        const doctorId = (0, objectid_1.toObjectIdOrUndefined)(query.doctorId);
        if (doctorId)
            filter.doctorId = doctorId;
        if (query.status)
            filter.status = query.status;
        if (doctorIdFilter)
            filter.doctorId = (0, objectid_1.toObjectIdOrThrow)(doctorIdFilter, 'doctorId');
        if (query.startDate || query.endDate) {
            const startStr = query.startDate ?? query.endDate;
            const endStr = query.endDate ?? query.startDate;
            const tz = this.configService.get('clinicTimezone') ?? 'Africa/Cairo';
            const startHour = this.configService.get('workdayStartHour') ?? 6;
            const { start, end } = (0, date_range_util_1.getWorkdayRangeFromDateRange)(startStr, endStr, tz, startHour);
            filter.createdAt = { $gte: start, $lt: end };
        }
        const page = Math.max(1, query.page ?? 1);
        const limit = Math.min(100, Math.max(1, query.limit ?? 20));
        const skip = (page - 1) * limit;
        const aggFilter = { ...filter };
        const [invoices, total, aggResult, totalExpenses, breakdown] = await Promise.all([
            this.invoiceModel
                .find(filter)
                .populate('patientId', 'name nameAr phone')
                .populate('doctorId', 'name nameAr color')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.invoiceModel.countDocuments(filter),
            this.invoiceModel
                .aggregate([
                { $match: aggFilter },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$total' },
                        totalCollected: { $sum: '$paid' },
                        pendingBalance: { $sum: '$remaining' },
                        totalDiscounts: { $sum: { $subtract: ['$subtotal', '$total'] } },
                        completedInvoicesCount: { $sum: { $cond: [{ $eq: ['$status', enums_1.InvoiceStatus.Paid] }, 1, 0] } },
                        pendingInvoicesCount: {
                            $sum: { $cond: [{ $in: ['$status', [enums_1.InvoiceStatus.Partial, enums_1.InvoiceStatus.Unpaid]] }, 1, 0] },
                        },
                    },
                },
            ])
                .then((r) => r[0]),
            query.startDate && query.endDate
                ? this.expenseModel
                    .find({
                    $expr: {
                        $and: [
                            { $gte: [{ $substr: [{ $ifNull: ['$date', ''] }, 0, 10] }, query.startDate] },
                            { $lte: [{ $substr: [{ $ifNull: ['$date', ''] }, 0, 10] }, query.endDate] },
                        ],
                    },
                })
                    .lean()
                    .then((expenses) => expenses.reduce((sum, e) => sum + e.amount, 0))
                : Promise.resolve(0),
            this.invoiceModel
                .find(filter)
                .select('_id')
                .lean()
                .then(async (matchingInvoices) => {
                const ids = matchingInvoices.map((inv) => inv._id);
                if (!ids.length)
                    return { cash: 0, vodafoneCash: 0, instapay: 0 };
                const payments = await this.paymentModel.find({ invoiceId: { $in: ids } }).select('amount method').lean();
                let cash = 0;
                let vodafoneCash = 0;
                let instapay = 0;
                for (const p of payments) {
                    if (p.method === enums_1.PaymentMethod.Cash)
                        cash += p.amount;
                    else if (p.method === enums_1.PaymentMethod.VodafoneCash)
                        vodafoneCash += p.amount;
                    else if (p.method === enums_1.PaymentMethod.Instapay)
                        instapay += p.amount;
                }
                return { cash, vodafoneCash, instapay };
            }),
        ]);
        const agg = aggResult ?? {
            totalRevenue: 0,
            totalCollected: 0,
            pendingBalance: 0,
            totalDiscounts: 0,
            completedInvoicesCount: 0,
            pendingInvoicesCount: 0,
        };
        let items = invoices;
        if (query.includePayments && invoices.length > 0) {
            const ids = invoices.map((inv) => inv._id);
            const payments = await this.paymentModel.find({ invoiceId: { $in: ids } }).sort({ paidAt: 1 }).lean();
            const byInvoice = payments.reduce((acc, p) => {
                const key = p.invoiceId.toString();
                if (!acc[key])
                    acc[key] = [];
                acc[key].push(p);
                return acc;
            }, {});
            items = invoices.map((inv) => ({
                ...inv,
                payments: byInvoice[inv._id.toString()] ?? [],
            }));
        }
        const result = {
            items,
            total,
            page,
            limit,
            totalRevenue: agg.totalRevenue,
            totalCollected: agg.totalCollected,
            pendingBalance: agg.pendingBalance,
            pendingInvoicesCount: agg.pendingInvoicesCount,
            totalDiscounts: agg.totalDiscounts,
            completedInvoicesCount: agg.completedInvoicesCount,
            collectedByPaymentMethod: breakdown,
        };
        if (query.startDate && query.endDate) {
            result.afterExpenses = agg.totalCollected - totalExpenses;
        }
        return result;
    }
    async findOne(id, doctorIdFilter) {
        const invoiceId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const filter = { _id: invoiceId };
        if (doctorIdFilter)
            filter.doctorId = (0, objectid_1.toObjectIdOrThrow)(doctorIdFilter, 'doctorId');
        const invoice = await this.invoiceModel
            .findOne(filter)
            .populate('patientId', 'name nameAr phone')
            .populate('doctorId', 'name nameAr color')
            .lean();
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        const payments = await this.paymentModel.find({ invoiceId }).sort({ paidAt: 1 }).lean();
        return { ...invoice, payments };
    }
    async create(body) {
        const qty = (i) => (i.quantity != null && i.quantity >= 1 ? i.quantity : 1);
        const items = body.items.map((i) => {
            const quantity = qty(i);
            const total = quantity * i.unitPrice;
            return {
                description: i.description ?? i.procedure,
                descriptionAr: i.descriptionAr ?? i.procedureAr,
                procedure: i.procedure,
                procedureAr: i.procedureAr,
                quantity,
                unitPrice: i.unitPrice,
                total,
                toothNumber: i.toothNumber,
            };
        });
        const subtotal = items.reduce((s, i) => s + i.total, 0);
        const discount = body.discount ?? 0;
        const discountType = body.discountType ?? enums_1.DiscountType.Fixed;
        const total = (0, invoice_helpers_1.applyDiscount)(subtotal, discount, discountType);
        const paid = body.paid ?? 0;
        const remaining = Math.max(0, total - paid);
        const invoice = await this.invoiceModel.create({
            patientId: (0, objectid_1.toObjectIdOrThrow)(body.patientId, 'patientId'),
            doctorId: (0, objectid_1.toObjectIdOrThrow)(body.doctorId, 'doctorId'),
            items,
            subtotal,
            discount,
            discountType,
            total,
            paid,
            remaining,
            status: (0, invoice_helpers_1.computeStatus)(paid, total),
            currency: body.currency ?? 'EGP',
            dueDate: body.dueDate,
        });
        if (paid > 0) {
            const tz = this.configService.get('clinicTimezone') ?? 'Africa/Cairo';
            const shiftStartHour = this.configService.get('workdayStartHour') ?? 6;
            await this.paymentModel.create({
                invoiceId: invoice._id,
                patientId: invoice.patientId,
                doctorId: invoice.doctorId,
                amount: paid,
                method: (0, invoice_helpers_1.normalizeMethod)(body.paymentMethod ?? 'cash'),
                paidAt: (0, shift_date_util_1.getCurrentClinicTime)(tz),
                paidDate: (0, shift_date_util_1.getCurrentShiftDate)(tz, shiftStartHour),
                beforeRemaining: total,
                afterRemaining: remaining,
                currency: invoice.currency,
            });
        }
        const populatedInvoice = await this.invoiceModel.findById(invoice._id).populate('patientId', 'name nameAr phone').populate('doctorId', 'name nameAr color').lean();
        this.accountingGateway.emitInvoiceCreated(populatedInvoice);
        this.accountingGateway.emitAccountingUpdated();
        this.dashboardGateway.emitRevenueChanged(populatedInvoice);
        this.dashboardGateway.emitDashboardUpdated();
        this.dailyCloseoutsGateway.emitCloseoutsListUpdated();
        return populatedInvoice;
    }
    async update(id, body, doctorIdFilter) {
        const invoiceId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const invoice = await this.invoiceModel.findById(invoiceId);
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        if (doctorIdFilter && !invoice.doctorId.equals((0, objectid_1.toObjectIdOrThrow)(doctorIdFilter, 'doctorId')))
            throw new common_1.ForbiddenException('Forbidden');
        let needsRecalculation = false;
        if (body.items && Array.isArray(body.items)) {
            const quantity = (i) => (i.quantity != null && i.quantity >= 1 ? i.quantity : 1);
            const items = body.items.map((i) => {
                const q = quantity(i);
                const up = i.unitPrice ?? 0;
                const total = q * up;
                return {
                    description: i.description ?? i.procedure,
                    descriptionAr: i.descriptionAr ?? i.procedureAr,
                    procedure: i.procedure,
                    procedureAr: i.procedureAr,
                    quantity: q,
                    unitPrice: up,
                    total,
                    toothNumber: i.toothNumber,
                };
            });
            invoice.items = items;
            invoice.subtotal = items.reduce((s, i) => s + i.total, 0);
            needsRecalculation = true;
        }
        if (body.discount !== undefined) {
            invoice.discount = body.discount;
            needsRecalculation = true;
        }
        if (body.discountType !== undefined) {
            invoice.discountType = body.discountType;
            needsRecalculation = true;
        }
        if (needsRecalculation) {
            invoice.total = (0, invoice_helpers_1.applyDiscount)(invoice.subtotal, invoice.discount, invoice.discountType);
            invoice.remaining = Math.max(0, invoice.total - invoice.paid);
            invoice.status = (0, invoice_helpers_1.computeStatus)(invoice.paid, invoice.total);
        }
        await invoice.save();
        return this.invoiceModel.findById(invoiceId).populate('patientId', 'name nameAr phone').populate('doctorId', 'name nameAr color').lean();
    }
    async remove(id, doctorIdFilter) {
        const invoiceId = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const invoice = await this.invoiceModel.findById(invoiceId);
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        if (doctorIdFilter && !invoice.doctorId.equals((0, objectid_1.toObjectIdOrThrow)(doctorIdFilter, 'doctorId')))
            throw new common_1.ForbiddenException('Forbidden');
        await this.paymentModel.deleteMany({ invoiceId });
        await this.invoiceModel.findByIdAndDelete(invoiceId);
    }
    async listPayments(invoiceId, doctorIdFilter) {
        const invId = (0, objectid_1.toObjectIdOrThrow)(invoiceId, 'invoiceId');
        const invoice = await this.invoiceModel.findById(invId);
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        if (doctorIdFilter && !invoice.doctorId.equals((0, objectid_1.toObjectIdOrThrow)(doctorIdFilter, 'doctorId')))
            throw new common_1.ForbiddenException('Forbidden');
        return this.paymentModel.find({ invoiceId: invId }).sort({ paidAt: -1 }).lean();
    }
    async addPayment(invoiceId, amount, method, doctorIdFilter) {
        const invId = (0, objectid_1.toObjectIdOrThrow)(invoiceId, 'invoiceId');
        const invoice = await this.invoiceModel.findById(invId);
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        if (doctorIdFilter && !invoice.doctorId.equals((0, objectid_1.toObjectIdOrThrow)(doctorIdFilter, 'doctorId')))
            throw new common_1.ForbiddenException('Forbidden');
        if (amount > invoice.remaining)
            throw new common_1.ForbiddenException('Amount exceeds remaining balance');
        const afterRemaining = invoice.remaining - amount;
        const tz = this.configService.get('clinicTimezone') ?? 'Africa/Cairo';
        const shiftStartHour = this.configService.get('workdayStartHour') ?? 6;
        const paidAt = (0, shift_date_util_1.getCurrentClinicTime)(tz);
        const paidDate = (0, shift_date_util_1.getCurrentShiftDate)(tz, shiftStartHour);
        await this.paymentModel.create({
            invoiceId: invoice._id,
            patientId: invoice.patientId,
            doctorId: invoice.doctorId,
            amount,
            method: (0, invoice_helpers_1.normalizeMethod)(method),
            paidAt,
            paidDate,
            beforeRemaining: invoice.remaining,
            afterRemaining,
            currency: invoice.currency,
        });
        invoice.paid += amount;
        invoice.remaining = afterRemaining;
        invoice.status = (0, invoice_helpers_1.computeStatus)(invoice.paid, invoice.total);
        await invoice.save();
        const payment = await this.paymentModel.findOne({ invoiceId: invId }).sort({ paidAt: -1 }).lean();
        const updatedInvoice = await this.invoiceModel.findById(invId).populate('patientId', 'name nameAr phone').populate('doctorId', 'name nameAr color').lean();
        this.accountingGateway.emitPaymentAdded(payment, updatedInvoice);
        this.accountingGateway.emitAccountingUpdated();
        this.dashboardGateway.emitRevenueChanged(payment);
        this.dashboardGateway.emitDashboardUpdated();
        this.dailyCloseoutsGateway.emitCloseoutsListUpdated();
        return payment;
    }
    async deletePayment(invoiceId, paymentId, doctorIdFilter) {
        const invId = (0, objectid_1.toObjectIdOrThrow)(invoiceId, 'invoiceId');
        const payId = (0, objectid_1.toObjectIdOrThrow)(paymentId, 'paymentId');
        const invoice = await this.invoiceModel.findById(invId);
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        if (doctorIdFilter && !invoice.doctorId.equals((0, objectid_1.toObjectIdOrThrow)(doctorIdFilter, 'doctorId')))
            throw new common_1.ForbiddenException('Forbidden');
        const payment = await this.paymentModel.findOne({ _id: payId, invoiceId: invId });
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        invoice.paid -= payment.amount;
        invoice.remaining = Math.max(0, invoice.total - invoice.paid);
        invoice.status = (0, invoice_helpers_1.computeStatus)(invoice.paid, invoice.total);
        await payment.deleteOne();
        await invoice.save();
        this.dailyCloseoutsGateway.emitCloseoutsListUpdated();
    }
    async updatePayment(invoiceId, paymentId, newAmount, newMethod, doctorIdFilter) {
        const invId = (0, objectid_1.toObjectIdOrThrow)(invoiceId, 'invoiceId');
        const payId = (0, objectid_1.toObjectIdOrThrow)(paymentId, 'paymentId');
        const invoice = await this.invoiceModel.findById(invId);
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        if (doctorIdFilter && !invoice.doctorId.equals((0, objectid_1.toObjectIdOrThrow)(doctorIdFilter, 'doctorId')))
            throw new common_1.ForbiddenException('Forbidden');
        const payment = await this.paymentModel.findOne({ _id: payId, invoiceId: invId });
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        const oldAmount = payment.amount;
        const amountDiff = newAmount - oldAmount;
        if (invoice.remaining < amountDiff) {
            throw new common_1.ForbiddenException('New amount exceeds remaining balance');
        }
        invoice.paid += amountDiff;
        invoice.remaining = Math.max(0, invoice.total - invoice.paid);
        invoice.status = (0, invoice_helpers_1.computeStatus)(invoice.paid, invoice.total);
        payment.amount = newAmount;
        payment.method = (0, invoice_helpers_1.normalizeMethod)(newMethod);
        payment.afterRemaining = invoice.remaining;
        await payment.save();
        await invoice.save();
        this.dailyCloseoutsGateway.emitCloseoutsListUpdated();
        return payment.toObject();
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invoice_schema_1.Invoice.name)),
    __param(1, (0, mongoose_1.InjectModel)(invoice_payment_schema_1.InvoicePayment.name)),
    __param(2, (0, mongoose_1.InjectModel)(expense_schema_1.Expense.name)),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => accounting_gateway_1.AccountingGateway))),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => dashboard_gateway_1.DashboardGateway))),
    __param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => daily_closeouts_gateway_1.DailyCloseoutsGateway))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService,
        accounting_gateway_1.AccountingGateway,
        dashboard_gateway_1.DashboardGateway,
        daily_closeouts_gateway_1.DailyCloseoutsGateway])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map