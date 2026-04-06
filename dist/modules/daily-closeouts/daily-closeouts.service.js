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
exports.DailyCloseoutsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objectid_1 = require("../../common/utils/objectid");
const date_range_util_1 = require("../../common/utils/date-range.util");
const shift_date_util_1 = require("../../common/utils/shift-date.util");
const daily_closeout_schema_1 = require("./schemas/daily-closeout.schema");
const invoice_schema_1 = require("../invoices/schemas/invoice.schema");
const invoice_payment_schema_1 = require("../invoices/schemas/invoice-payment.schema");
const expense_schema_1 = require("../expenses/schemas/expense.schema");
const doctor_schema_1 = require("../doctors/schemas/doctor.schema");
const enums_1 = require("../../enums");
const enums_2 = require("../../enums");
const daily_closeouts_gateway_1 = require("./daily-closeouts.gateway");
let DailyCloseoutsService = class DailyCloseoutsService {
    constructor(dailyCloseoutModel, invoiceModel, invoicePaymentModel, expenseModel, doctorModel, configService, gateway) {
        this.dailyCloseoutModel = dailyCloseoutModel;
        this.invoiceModel = invoiceModel;
        this.invoicePaymentModel = invoicePaymentModel;
        this.expenseModel = expenseModel;
        this.doctorModel = doctorModel;
        this.configService = configService;
        this.gateway = gateway;
    }
    getWorkdayBounds(date) {
        const tz = this.configService.get('clinicTimezone') ?? 'Africa/Cairo';
        const startHour = this.configService.get('workdayStartHour') ?? 6;
        return (0, date_range_util_1.getWorkdayRange)(date, tz, startHour);
    }
    paymentFilter(date, filter) {
        const base = { paidDate: date };
        if (filter?.role === enums_2.UserRole.Doctor && filter?.doctorId) {
            base.doctorId = (0, objectid_1.toObjectIdOrThrow)(filter.doctorId, 'doctorId');
        }
        return base;
    }
    expenseFilter(date, filter) {
        const base = { date };
        if (filter?.role === enums_2.UserRole.Owner || filter?.role === enums_2.UserRole.Admin) {
            return base;
        }
        if (filter?.userId) {
            base.createdBy = (0, objectid_1.toObjectIdOrThrow)(filter.userId, 'userId');
        }
        return base;
    }
    async findAll(date) {
        const filter = date ? { date } : {};
        return this.dailyCloseoutModel.find(filter).populate('closedBy', 'name email').sort({ date: -1 }).lean();
    }
    async getByDate(date, roleFilter) {
        const closeout = await this.dailyCloseoutModel.findOne({ date }).populate('closedBy', 'name email').lean();
        if (!closeout)
            throw new common_1.NotFoundException('Closeout not found for this date');
        return closeout;
    }
    async getPreview(date, roleFilter) {
        const paymentsFilter = this.paymentFilter(date, roleFilter);
        const payments = await this.invoicePaymentModel
            .find(paymentsFilter)
            .populate('patientId', 'name nameAr')
            .populate('doctorId', 'name nameAr')
            .populate('invoiceId')
            .lean();
        const { start: dayStart, end: dayEnd } = this.getWorkdayBounds(date);
        const invoiceFilter = { createdAt: { $gte: dayStart, $lt: dayEnd } };
        if (roleFilter?.role === enums_2.UserRole.Doctor && roleFilter?.doctorId) {
            invoiceFilter.doctorId = (0, objectid_1.toObjectIdOrThrow)(roleFilter.doctorId, 'doctorId');
        }
        const invoicesCreatedThatDay = await this.invoiceModel
            .find(invoiceFilter)
            .populate('patientId', 'name nameAr')
            .populate('doctorId', 'name nameAr')
            .lean();
        const enhancedPayments = payments
            .filter((p) => p.invoiceId)
            .map((p) => {
            const invoice = p.invoiceId;
            return {
                paymentId: p._id,
                invoiceId: invoice._id,
                patientName: p.patientId?.name || 'Unknown',
                patientNameAr: p.patientId?.nameAr || 'غير معروف',
                doctorName: p.doctorId?.name || 'Unknown',
                doctorNameAr: p.doctorId?.nameAr || 'غير معروف',
                invoiceSubtotal: invoice.subtotal,
                invoiceTotal: invoice.total,
                invoiceDiscount: invoice.discount,
                invoiceDiscountType: invoice.discountType,
                beforeRemaining: p.beforeRemaining,
                amount: p.amount,
                afterRemaining: p.afterRemaining,
                method: p.method,
                paidAt: p.paidAt,
                invoiceCreatedAt: invoice.createdAt,
            };
        });
        const paidInvoiceIds = new Set(payments
            .filter((p) => p.invoiceId)
            .map((p) => p.invoiceId._id.toString()));
        const unpaidInvoices = invoicesCreatedThatDay
            .filter((inv) => !paidInvoiceIds.has(inv._id.toString()))
            .map((inv) => {
            return {
                invoiceId: inv._id,
                patientName: inv.patientId?.name || 'Unknown',
                patientNameAr: inv.patientId?.nameAr || 'غير معروف',
                doctorName: inv.doctorId?.name || 'Unknown',
                doctorNameAr: inv.doctorId?.nameAr || 'غير معروف',
                invoiceSubtotal: inv.subtotal,
                invoiceTotal: inv.total,
                invoiceDiscount: inv.discount,
                invoiceDiscountType: inv.discountType,
                invoiceCreatedAt: inv.createdAt,
            };
        });
        const expenses = await this.expenseModel.find(this.expenseFilter(date, roleFilter)).lean();
        let cashCollected = 0, cardCollected = 0, transferCollected = 0, vodafoneCashCollected = 0;
        for (const p of payments) {
            if (p.method === enums_1.PaymentMethod.Cash)
                cashCollected += p.amount;
            else if (p.method === enums_1.PaymentMethod.Card)
                cardCollected += p.amount;
            else if (p.method === enums_1.PaymentMethod.VodafoneCash)
                vodafoneCashCollected += p.amount;
            else
                transferCollected += p.amount;
        }
        const totalCollected = cashCollected + cardCollected + transferCollected + vodafoneCashCollected;
        const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
        const revenue = invoicesCreatedThatDay.reduce((s, inv) => s + (inv.total || 0), 0);
        return {
            date,
            payments: enhancedPayments,
            unpaidInvoices,
            expenses,
            revenue,
            cashCollected,
            cardCollected,
            transferCollected,
            vodafoneCashCollected,
            totalCollected,
            totalExpenses,
            finalBalance: totalCollected - totalExpenses,
        };
    }
    async removeByDate(date) {
        const closeout = await this.dailyCloseoutModel.findOne({ date });
        if (!closeout)
            throw new common_1.NotFoundException('Closeout not found for this date');
        await this.dailyCloseoutModel.findByIdAndDelete(closeout._id);
        this.gateway.emitCloseoutDeleted(date);
        this.gateway.emitCloseoutsListUpdated();
    }
    async updateByDate(date, dto, roleFilter) {
        const closeout = await this.dailyCloseoutModel.findOne({ date });
        if (!closeout)
            throw new common_1.NotFoundException('Closeout not found for this date');
        if (dto.refreshPaymentSnapshot) {
            const payments = await this.invoicePaymentModel
                .find(this.paymentFilter(date, roleFilter))
                .populate('patientId', 'name nameAr')
                .populate('doctorId', 'name nameAr')
                .populate('invoiceId')
                .lean();
            closeout.paymentSnapshot = payments
                .filter((p) => p.invoiceId)
                .map((p) => {
                const invoice = p.invoiceId;
                return {
                    paymentId: p._id,
                    invoiceId: invoice._id,
                    patientName: p.patientId?.name || 'Unknown',
                    patientNameAr: p.patientId?.nameAr || 'غير معروف',
                    doctorName: p.doctorId?.name || 'Unknown',
                    doctorNameAr: p.doctorId?.nameAr || 'غير معروف',
                    invoiceSubtotal: invoice.subtotal,
                    invoiceTotal: invoice.total,
                    invoiceDiscount: invoice.discount,
                    invoiceDiscountType: invoice.discountType,
                    beforeRemaining: p.beforeRemaining,
                    amount: p.amount,
                    afterRemaining: p.afterRemaining,
                    method: p.method,
                    paidAt: p.paidAt,
                    paidDate: p.paidDate,
                    invoiceCreatedAt: invoice.createdAt,
                };
            });
            let cashCollected = 0, cardCollected = 0, transferCollected = 0, vodafoneCashCollected = 0;
            for (const p of closeout.paymentSnapshot) {
                if (p.method === enums_1.PaymentMethod.Cash)
                    cashCollected += p.amount;
                else if (p.method === enums_1.PaymentMethod.Card)
                    cardCollected += p.amount;
                else if (p.method === enums_1.PaymentMethod.VodafoneCash)
                    vodafoneCashCollected += p.amount;
                else
                    transferCollected += p.amount;
            }
            closeout.cashCollected = cashCollected;
            closeout.cardCollected = cardCollected;
            closeout.transferCollected = transferCollected;
            closeout.vodafoneCashCollected = vodafoneCashCollected;
            closeout.totalCollected = cashCollected + cardCollected + transferCollected + vodafoneCashCollected;
        }
        if (dto.refreshExpenseSnapshot) {
            const expenses = await this.expenseModel.find(this.expenseFilter(date, roleFilter));
            closeout.expenseSnapshot = expenses.map((e) => ({
                expenseId: e._id,
                category: e.category,
                categoryAr: e.categoryAr,
                description: e.description,
                amount: e.amount,
            }));
            closeout.totalExpenses = closeout.expenseSnapshot.reduce((s, e) => s + e.amount, 0);
        }
        if (dto.cashCollected !== undefined)
            closeout.cashCollected = dto.cashCollected;
        if (dto.cardCollected !== undefined)
            closeout.cardCollected = dto.cardCollected;
        if (dto.transferCollected !== undefined)
            closeout.transferCollected = dto.transferCollected;
        if (dto.vodafoneCashCollected !== undefined)
            closeout.vodafoneCashCollected = dto.vodafoneCashCollected;
        if (dto.totalCollected !== undefined)
            closeout.totalCollected = dto.totalCollected;
        else if (dto.cashCollected !== undefined ||
            dto.cardCollected !== undefined ||
            dto.transferCollected !== undefined ||
            dto.vodafoneCashCollected !== undefined) {
            closeout.totalCollected =
                closeout.cashCollected +
                    closeout.cardCollected +
                    closeout.transferCollected +
                    (closeout.vodafoneCashCollected ?? 0);
        }
        if (dto.revenue !== undefined)
            closeout.revenue = dto.revenue;
        if (dto.totalExpenses !== undefined)
            closeout.totalExpenses = dto.totalExpenses;
        if (dto.finalBalance !== undefined)
            closeout.finalBalance = dto.finalBalance;
        else
            closeout.finalBalance = closeout.totalCollected - closeout.totalExpenses;
        await closeout.save();
        const result = await this.dailyCloseoutModel.findById(closeout._id).populate('closedBy', 'name email').lean();
        this.gateway.emitCloseoutUpdated(result);
        this.gateway.emitCloseoutsListUpdated();
        return result;
    }
    async create(date, closedBy, roleFilter) {
        const existing = await this.dailyCloseoutModel.findOne({ date });
        if (existing)
            throw new common_1.ConflictException('A closeout already exists for this date');
        const payments = await this.invoicePaymentModel
            .find(this.paymentFilter(date, roleFilter))
            .populate('patientId', 'name nameAr')
            .populate('doctorId', 'name nameAr')
            .populate('invoiceId')
            .lean();
        let cashCollected = 0, cardCollected = 0, transferCollected = 0, vodafoneCashCollected = 0;
        for (const p of payments) {
            if (p.method === enums_1.PaymentMethod.Cash)
                cashCollected += p.amount;
            else if (p.method === enums_1.PaymentMethod.Card)
                cardCollected += p.amount;
            else if (p.method === enums_1.PaymentMethod.VodafoneCash)
                vodafoneCashCollected += p.amount;
            else
                transferCollected += p.amount;
        }
        const totalCollected = cashCollected + cardCollected + transferCollected + vodafoneCashCollected;
        const paymentSnapshot = payments
            .filter((p) => p.invoiceId)
            .map((p) => {
            const invoice = p.invoiceId;
            return {
                paymentId: p._id,
                invoiceId: invoice._id,
                patientName: p.patientId?.name || 'Unknown',
                patientNameAr: p.patientId?.nameAr || 'غير معروف',
                doctorName: p.doctorId?.name || 'Unknown',
                doctorNameAr: p.doctorId?.nameAr || 'غير معروف',
                invoiceSubtotal: invoice.subtotal,
                invoiceTotal: invoice.total,
                invoiceDiscount: invoice.discount,
                invoiceDiscountType: invoice.discountType,
                beforeRemaining: p.beforeRemaining,
                amount: p.amount,
                afterRemaining: p.afterRemaining,
                method: p.method,
                paidAt: p.paidAt,
                paidDate: p.paidDate,
                invoiceCreatedAt: invoice.createdAt,
            };
        });
        const { start: dayStart, end: dayEnd } = this.getWorkdayBounds(date);
        const invoiceFilter = { createdAt: { $gte: dayStart, $lt: dayEnd } };
        if (roleFilter?.role === enums_2.UserRole.Doctor && roleFilter?.doctorId) {
            invoiceFilter.doctorId = (0, objectid_1.toObjectIdOrThrow)(roleFilter.doctorId, 'doctorId');
        }
        const invoicesCreatedThatDay = await this.invoiceModel
            .find(invoiceFilter)
            .populate('patientId', 'name nameAr')
            .populate('doctorId', 'name nameAr')
            .lean();
        const revenue = invoicesCreatedThatDay.reduce((s, inv) => s + (inv.total || 0), 0);
        const paidInvoiceIds = new Set(payments
            .filter((p) => p.invoiceId)
            .map((p) => p.invoiceId._id.toString()));
        const unpaidInvoicesSnapshot = invoicesCreatedThatDay
            .filter((inv) => !paidInvoiceIds.has(inv._id.toString()))
            .map((inv) => ({
            invoiceId: inv._id,
            patientName: inv.patientId?.name || 'Unknown',
            patientNameAr: inv.patientId?.nameAr || 'غير معروف',
            doctorName: inv.doctorId?.name || 'Unknown',
            doctorNameAr: inv.doctorId?.nameAr || 'غير معروف',
            invoiceSubtotal: inv.subtotal,
            invoiceTotal: inv.total,
            invoiceDiscount: inv.discount,
            invoiceDiscountType: inv.discountType,
            invoiceCreatedAt: inv.createdAt,
        }));
        const expenses = await this.expenseModel.find(this.expenseFilter(date, roleFilter));
        const expenseSnapshot = expenses.map((e) => ({
            expenseId: e._id,
            category: e.category,
            categoryAr: e.categoryAr,
            description: e.description,
            amount: e.amount,
        }));
        const totalExpenses = expenseSnapshot.reduce((s, e) => s + e.amount, 0);
        const tz = this.configService.get('clinicTimezone') ?? 'Africa/Cairo';
        const closedAt = (0, shift_date_util_1.getCurrentClinicTime)(tz);
        const closeout = await this.dailyCloseoutModel.create({
            date,
            closedBy: (0, objectid_1.toObjectIdOrThrow)(closedBy, 'closedBy'),
            cashCollected,
            cardCollected,
            transferCollected,
            vodafoneCashCollected,
            totalCollected,
            revenue,
            paymentSnapshot,
            unpaidInvoicesSnapshot,
            expenseSnapshot,
            totalExpenses,
            finalBalance: totalCollected - totalExpenses,
            closedAt,
            currency: 'EGP',
        });
        const result = await this.dailyCloseoutModel.findById(closeout._id).populate('closedBy', 'name email').lean();
        this.gateway.emitCloseoutCreated(result);
        this.gateway.emitCloseoutsListUpdated();
        return result;
    }
};
exports.DailyCloseoutsService = DailyCloseoutsService;
exports.DailyCloseoutsService = DailyCloseoutsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(daily_closeout_schema_1.DailyCloseout.name)),
    __param(1, (0, mongoose_1.InjectModel)(invoice_schema_1.Invoice.name)),
    __param(2, (0, mongoose_1.InjectModel)(invoice_payment_schema_1.InvoicePayment.name)),
    __param(3, (0, mongoose_1.InjectModel)(expense_schema_1.Expense.name)),
    __param(4, (0, mongoose_1.InjectModel)(doctor_schema_1.Doctor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService,
        daily_closeouts_gateway_1.DailyCloseoutsGateway])
], DailyCloseoutsService);
//# sourceMappingURL=daily-closeouts.service.js.map